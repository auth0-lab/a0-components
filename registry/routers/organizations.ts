import {
  AuthenticationClient,
  ManagementClient,
  PostOrganizationsRequest,
} from "auth0";
import { NextRequest, NextResponse } from "next/server";

import { checkSession } from "./helpers/check-session";
/**
 * Make sure to install the withRateLimit from:
 *   - https://components.lab.auth0.com/docs/rate-limit#helpers
 */
import { withRateLimit } from "./helpers/rate-limit";

/**
 * This forces NextJS to build this route as a dynamic route.
 * This is required for the purpose of documentation but is likely not necessary in your own app.
 */
export const dynamic = "force-dynamic";

const client = new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_DOMAIN ?? process.env.AUTH0_DOMAIN,
  clientId:
    process.env.AUTH0_MANAGEMENT_CLIENT_ID ?? process.env.AUTH0_CLIENT_ID,
  clientSecret:
    process.env.AUTH0_MANAGEMENT_CLIENT_SECRET ??
    process.env.AUTH0_CLIENT_SECRET,
});
const authClient = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId:
    process.env.AUTH0_MANAGEMENT_CLIENT_ID ?? process.env.AUTH0_CLIENT_ID,
  clientSecret:
    process.env.AUTH0_MANAGEMENT_CLIENT_SECRET ??
    process.env.AUTH0_CLIENT_SECRET,
});

interface SelfServiceRequest {
  clients_to_enable?: string[];
  organizations_to_enable?: string[];
}

interface UpdateConnectionRequest extends SelfServiceRequest {
  connection_id: string;
}

/**
 * @example
 *
 * export const POST = handleOrganizationCreation;
 */
// TODO: better error handling
export const handleOrganizationCreation = withRateLimit(
  async (request: NextRequest): Promise<NextResponse> => {
    try {
      const { sub: user_id } = await checkSession();

      const body: PostOrganizationsRequest = await request.json();

      // Create organization
      const { data: organization } = await client.organizations.create(body);

      // Add current user to new organization
      await client.organizations.addMembers(
        { id: organization.id },
        { members: [user_id] }
      );

      return NextResponse.json(
        {
          id: organization.id,
          name: organization.name,
          display_name: organization.display_name,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error creating organization" },
        { status: 500 }
      );
    }
  }
);

/**
 * @example export const GET = handleFetchOrganization;
 */
export const handleFetchOrganization = withRateLimit(
  async (
    _: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> => {
    try {
      const { id: org_id } = params;

      const { data, status } = await client.organizations.get({ id: org_id });

      const org = {
        id: data.id,
        name: data.name,
        display_name: data.display_name,
        branding: data.branding || {
          logo_url: `https://cdn.auth0.com/avatars/c.png`,
          colors: {},
        },
        metadata: data.metadata || {},
      };

      return NextResponse.json(org, {
        status,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error fetching user metadata" },
        { status: 500 }
      );
    }
  }
);

/**
 * @example export const PUT = handleOrganizationUpdate;
 */
// TODO: better error handling
export const handleOrganizationUpdate = withRateLimit(
  async (
    request: Request,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> => {
    try {
      const { id: org_id } = params;

      const org = await request.json();

      await client.organizations.update({ id: org_id }, org);

      return NextResponse.json(org, {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error updating organization" },
        { status: 500 }
      );
    }
  }
);

/**
 * @example export const POST = handleSelfService;
 */
export const handleSelfService = withRateLimit(
  async (request: NextRequest): Promise<NextResponse> => {
    try {
      const body: SelfServiceRequest = await request.json();

      const {
        clients_to_enable: enabled_clients = [],
        organizations_to_enable = [],
      } = body || {};

      const { data: tokens } = await authClient.oauth.clientCredentialsGrant({
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      });

      const $selfServiceProfile = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/self-service-profiles`,
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      const profile = (await $selfServiceProfile.json()).pop();
      const randomId = crypto.getRandomValues(new Uint32Array(4)).join("-");

      const $ticket = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/self-service-profiles/${profile.id}/sso-ticket`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            connection_config: {
              name: `${randomId}`,
            },
            enabled_clients,
            enabled_organizations: organizations_to_enable.map(
              (organization_id: string) => ({ organization_id })
            ),
          }),
        }
      );

      const data = await $ticket.json();

      return NextResponse.json(data, {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error fetching user metadata" },
        { status: 500 }
      );
    }
  }
);

const ORGANIZATIONS_CLIENT_TO_ENABLE =
  process.env.ORGANIZATIONS_CLIENT_TO_ENABLE;
/**
 * @example export const PUT = handleSelfService;
 */
export const handleConnectionUpdate = withRateLimit(
  async (request: NextRequest): Promise<NextResponse> => {
    try {
      const {
        connection_id,
        clients_to_enable: enabled_clients = ORGANIZATIONS_CLIENT_TO_ENABLE
          ? [ORGANIZATIONS_CLIENT_TO_ENABLE]
          : [],
        organizations_to_enable: enabled_organizations = [],
      }: UpdateConnectionRequest = await request.json();

      const { data: tokens } = await authClient.oauth.clientCredentialsGrant({
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      });

      const $selfServiceProfile = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/self-service-profiles`,
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      const profile = (await $selfServiceProfile.json()).pop();

      const $ticket = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/self-service-profiles/${profile.id}/sso-ticket`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            connection_id,
            enabled_clients,
            enabled_organizations,
          }),
        }
      );

      const data = await $ticket.json();

      return NextResponse.json(data, {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error fetching user metadata" },
        { status: 500 }
      );
    }
  }
);

/**
 * @example export const GET = handleFetchEnabledConnections();
 */
export const handleFetchEnabledConnections = withRateLimit(
  async (
    _: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> => {
    try {
      const { id: org_id } = params;

      const { data, status } = await client.organizations.getEnabledConnections(
        {
          id: org_id,
        }
      );

      return NextResponse.json(
        data.filter((d) =>
          // Note: Only strategies support on self-service.
          ["oidc", "okta", "samlp", "waad", "google-apps", "adfs"].includes(
            d.connection.strategy
          )
        ),
        {
          status,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error fetching user metadata" },
        { status: 500 }
      );
    }
  }
);

/**
 * @example export const DELETE = handleDeleteConnection();
 */
export const handleDeleteConnection = withRateLimit(
  async (
    _: NextRequest,
    { params }: { params: { id: string; connection_id: string } }
  ): Promise<NextResponse> => {
    try {
      const { id: org_id, connection_id } = params;

      await client.organizations.deleteEnabledConnection({
        id: org_id,
        connectionId: connection_id,
      });

      await client.connections.delete({ id: connection_id });

      return NextResponse.json(
        {},
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error deleting connection" },
        { status: 500 }
      );
    }
  }
);
