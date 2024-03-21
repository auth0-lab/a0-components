import { NextRequest } from "next/server";

import { CLAIMS } from "@/lib/utils";
import { enhanceClaimsWithOrganizations, handleOrganizationsParams } from "@/sdk/lib";
import { handleAuth, handleCallback, handleLogin, Session } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin(handleOrganizationsParams),
  callback: handleCallback({
    afterCallback: async (_req: NextRequest, session: Session) => {
      return await enhanceClaimsWithOrganizations(
        session,
        CLAIMS.ORGANIZATIONS
      );
    },
  }),
});

// export const GET = handleAuth(handleOrganizations(CLAIMS.ORGANIZATIONS));
