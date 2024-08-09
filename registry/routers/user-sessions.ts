import { ManagementClient } from "auth0";
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

/**
 * @example export const GET = handleUserSessionsFetch();
 */
export function handleUserSessionsFetch() {
  return withRateLimit(
    withApiAuthRequired(async (): Promise<NextResponse> => {
      try {
        const session = await getSession();
        const user_id = session?.user.sub;
        const response = await client.users.getSessions({
          user_id,
        });
        const { data } = response;

        return NextResponse.json(data.sessions || [], {
          status: response.status,
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
 * @example export const DELETE = handleMFADeleteEnrollment();
 */
export function handleDeleteUserSession() {
  return withRateLimit(
    withApiAuthRequired(
      async (request: Request, { params }: any): Promise<NextResponse> => {
        try {
          const { id }: { id: string } = params;

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
    )
  );
}
