import { ManagementClient } from "auth0";
import { NextResponse } from "next/server";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const client = new ManagementClient({
  domain: new URL(process.env.AUTH0_ISSUER_BASE_URL!).host,
  clientId: process.env.AUTH0_CLIENT_ID_MGMT!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
});

// TODO: better error handling
export function handleUserMetadataUpdate() {
  return withApiAuthRequired(
    async (request: Request): Promise<NextResponse> => {
      const session = await getSession();
      const userId = session?.user.sub;
      const user_metadata = await request.json();

      await client.users.update({ id: userId }, { user_metadata });

      return NextResponse.json(user_metadata);
    }
  );
}
