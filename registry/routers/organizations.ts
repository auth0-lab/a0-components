import { ManagementClient, PostOrganizationsRequest } from "auth0";
import { NextResponse } from "next/server";

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
