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
 * @example export const GET = handleUserSessionsFetch
 */
export const handleUserSessionsFetch = withRateLimit(
  async (_: NextRequest): Promise<NextResponse> => {
    try {
      const { sub: user_id } = await checkSession();

      const { data, status } = await client.users.getSessions({
        user_id,
      });

      return NextResponse.json(data.sessions || [], {
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
 * @example export const DELETE = handleDeleteUserSession
 */
export const handleDeleteUserSession = withRateLimit(
  async (
    _: Request,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> => {
    try {
      const { id } = params;

      await checkSession();

      await client.sessions.delete({
        id,
      });

      return NextResponse.json(
        { id },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error deleting MFA Enrollment" },
        { status: 500 }
      );
    }
  }
);
