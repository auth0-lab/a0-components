import { NextRequest } from "next/server";

import { CLAIMS } from "@/lib/utils";
import {
  enhanceClaimsWithOrganizations,
  enhanceClaimsWithUserMetadata,
  handleOrganizationsParams,
} from "@/registry/lib";
import {
  handleAuth,
  handleCallback,
  handleLogin,
  Session,
} from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin(handleOrganizationsParams),
  callback: handleCallback({
    afterCallback: async (_req: NextRequest, session: Session) => {
      return await enhanceClaimsWithUserMetadata(
        await enhanceClaimsWithOrganizations(session, CLAIMS.ORGANIZATIONS),
        CLAIMS.USER_METADATA
      );
    },
  }),
});
