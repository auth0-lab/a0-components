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
 * @example export const GET = handleUserMetadataFetch();
 */
export function handleUserMetadataFetch() {
  return withRateLimit(
    withApiAuthRequired(async (): Promise<NextResponse> => {
      try {
        const session = await getSession();
        const user_id = session?.user.sub;
        const response = await client.users.get({
          id: user_id,
        });
        const { data } = response;

        return NextResponse.json(data.user_metadata, {
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
 * @example export const PUT = handleUserMetadataUpdate();
 */
// TODO: better error handling
export function handleUserMetadataUpdate() {
  return withRateLimit(
    withApiAuthRequired(async (request: Request): Promise<NextResponse> => {
      try {
        const session = await getSession();
        const userId = session?.user.sub;
        const user_metadata = await request.json();

        await client.users.update({ id: userId }, { user_metadata });

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
    })
  );
}
