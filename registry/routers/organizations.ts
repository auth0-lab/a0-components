import { ManagementClient, PostOrganizationsRequest } from "auth0";
import { NextRequest, NextResponse } from "next/server";
import { ClientCredentials } from "simple-oauth2";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

/**
 * Make sure to install the withRateLimit from:
 *   - https://components.lab.auth0.com/docs/rate-limit#helpers
 */
import { withRateLimit } from "./helpers/rate-limit";

const client = new ManagementClient({
  domain: new URL(process.env.AUTH0_ISSUER_BASE_URL!).host,
  clientId: process.env.AUTH0_CLIENT_ID_MGMT!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
});

type HandleOrganizationCreationParams = Pick<
  PostOrganizationsRequest,
  "enabled_connections"
>;

type SelfServiceParams = {
  clients_to_enable: string[];
};

/**
 * @example
 *
 * export const POST = handleOrganizationCreation({
 *   enabled_connections: [{
 *     connection_id: process.env.ORGANIZATIONS_ENABLED_CONNECTION!,
 *     assign_membership_on_login: false,
 *    }]
 *  });
 */
// TODO: better error handling
export function handleOrganizationCreation(
  params?: HandleOrganizationCreationParams
) {
  return withRateLimit(
    withApiAuthRequired(async (request: Request): Promise<NextResponse> => {
      try {
        const session = await getSession();
        const userId = session?.user.sub;
        const body: PostOrganizationsRequest = await request.json();
        const postOrganization: PostOrganizationsRequest = {
          name: body.name,
        };

        if (params && params.enabled_connections) {
          postOrganization.enabled_connections = params.enabled_connections;
        }

        // Create organization
        const { data: organization } = await client.organizations.create(
          postOrganization
        );

        // Add current user to new organization
        await client.organizations.addMembers(
          { id: organization.id },
          { members: [userId] }
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
    })
  );
}

/**
 * @example export const GET = handleFetchOrganization();
 */
export function handleFetchOrganization() {
  return withRateLimit(
    withApiAuthRequired(
      async (request: NextRequest, { params }): Promise<NextResponse> => {
        try {
          const org_id = params?.id as string;
          const response = await client.organizations.get({ id: org_id });
          const { data } = response;

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
            status: response.status,
          });
        } catch (error) {
          console.error(error);
          return NextResponse.json(
            { error: "Error fetching user metadata" },
            { status: 500 }
          );
        }
      }
    )
  );
}

/**
 * @example export const PUT = handleOrganizationUpdate();
 */
// TODO: better error handling
export function handleOrganizationUpdate() {
  return withRateLimit(
    withApiAuthRequired(
      async (request: Request, { params }): Promise<NextResponse> => {
        try {
          const org_id = params?.id as string;
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
    )
  );
}

/**
 * @example export const POST = handleSelfService();
 */
export function handleSelfService(params: SelfServiceParams) {
  return withRateLimit(
    withApiAuthRequired(async (request: NextRequest): Promise<NextResponse> => {
      try {
        const body = await request.json();
        const config = {
          client: {
            id: process.env.AUTH0_CLIENT_ID_MGMT!,
            secret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
          },
          auth: {
            tokenHost: process.env.AUTH0_ISSUER_BASE_URL!,
          },
        };
        // NOTE: Requires `default_audience` set at tenant level
        const simpleOauth = new ClientCredentials(config);
        const credentials = await simpleOauth.getToken({});

        const $selfServiceProfile = await fetch(
          `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/self-service-profiles`,
          {
            headers: {
              Authorization: `Bearer ${credentials.token.access_token}`,
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
              Authorization: `Bearer ${credentials.token.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              connection_config: {
                name: `${randomId}`,
              },
              enabled_clients: params.clients_to_enable,
              enabled_organizations: body.organizations_to_enable.map(
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
    })
  );
}

/**
 * @example export const PUT = handleSelfService();
 */
export function handleConnectionUpdate(params: SelfServiceParams) {
  return withRateLimit(
    withApiAuthRequired(async (request: NextRequest): Promise<NextResponse> => {
      try {
        const body = await request.json();
        const config = {
          client: {
            id: process.env.AUTH0_CLIENT_ID_MGMT!,
            secret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
          },
          auth: {
            tokenHost: process.env.AUTH0_ISSUER_BASE_URL!,
          },
        };
        // NOTE: Requires `default_audience` set at tenant level
        const simpleOauth = new ClientCredentials(config);
        const credentials = await simpleOauth.getToken({});

        const $selfServiceProfile = await fetch(
          `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/self-service-profiles`,
          {
            headers: {
              Authorization: `Bearer ${credentials.token.access_token}`,
            },
          }
        );

        const profile = (await $selfServiceProfile.json()).pop();

        const $ticket = await fetch(
          `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/tickets/sso-access`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${credentials.token.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sso_profile_id: profile.id,
              connection_id: body.connection_id,
              clients_to_enable: params.clients_to_enable,
              organizations_to_enable: body.organizations_to_enable,
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
    })
  );
}

/**
 * @example export const GET = handleFetchEnabledConnections();
 */
export function handleFetchEnabledConnections() {
  return withRateLimit(
    withApiAuthRequired(
      async (request: NextRequest, { params }): Promise<NextResponse> => {
        try {
          const org_id = params?.id as string;

          const response = await client.organizations.getEnabledConnections({
            id: org_id,
          });
          const { data } = response;

          return NextResponse.json(
            data.filter((d) =>
              // Note: Only strategies support on self-service.
              ["oidc", "okta", "samlp", "waad", "google-apps", "adfs"].includes(
                d.connection.strategy
              )
            ),
            {
              status: response.status,
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
    )
  );
}

/**
 * @example export const DELETE = handleDeleteConnection();
 */
export function handleDeleteConnection() {
  return withRateLimit(
    withApiAuthRequired(
      async (request: NextRequest, { params }): Promise<NextResponse> => {
        try {
          const org_id = params?.id as string;
          const connection_id = params?.connection_id as string;

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
    )
  );
}
