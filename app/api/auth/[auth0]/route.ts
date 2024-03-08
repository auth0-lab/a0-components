import { NextRequest } from "next/server";

import { enhanceClaimsWithOrganizations, handleOrganizationsParams } from "@/lib/a0/lib";
import { CLAIMS } from "@/lib/utils";
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
