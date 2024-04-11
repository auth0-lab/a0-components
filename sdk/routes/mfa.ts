import { ManagementClient } from "auth0";
import { NextResponse } from "next/server";

import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const client = new ManagementClient({
  domain: new URL(process.env.AUTH0_ISSUER_BASE_URL!).host,
  clientId: process.env.AUTH0_CLIENT_ID_MGMT!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
});

export function handleMFAFactorsList() {
  return withApiAuthRequired(
    async (request: Request): Promise<NextResponse> => {
      return NextResponse.json(await client.guardian.getFactors());
    }
  );
}
