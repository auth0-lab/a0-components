import { ManagementClient } from "auth0";
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

/**
 * @example export const GET = handleUserMetadataFetch
 */
export const handleUserMetadataFetch = withRateLimit(
  async (_: NextRequest): Promise<NextResponse> => {
    try {
      const { sub: user_id } = await checkSession();

      // Fetch user profile
      const { data: user, status: userStatus } = await client.users.get({
        id: user_id,
      });

      // Fetch user organization membership
      const { data: organizations, status: orgStatus } =
        await client.users.getUserOrganizations({ id: user_id });

      return NextResponse.json(
        { ...user?.user_metadata, organizations },
        {
          status: userStatus !== 200 ? userStatus : orgStatus,
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
 * @example export const PUT = handleUserMetadataUpdate
 */
// TODO: better error handling
export const handleUserMetadataUpdate = withRateLimit(
  async (request: Request): Promise<NextResponse> => {
    try {
      const { sub: user_id } = await checkSession();

      const user_metadata = await request.json();

      await client.users.update({ id: user_id }, { user_metadata });

      return NextResponse.json(user_metadata, {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error updating user metadata" },
        { status: 500 }
      );
    }
  }
);
