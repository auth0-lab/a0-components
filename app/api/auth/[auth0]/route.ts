import { NextRequest } from "next/server";

import auth0 from "@/lib/auth0";
import { CLAIMS } from "@/lib/utils";
import {
  enhanceClaimsWithOrganizations,
  handleOrganizationsParams,
} from "@/registry/lib";

import type { Session } from "@auth0/nextjs-auth0";

export const GET = auth0.handleAuth({
  login: auth0.handleLogin(handleOrganizationsParams),
  callback: auth0.handleCallback({
    afterCallback: async (_req: NextRequest, session: Session) => {
      return await enhanceClaimsWithOrganizations(
        session,
        CLAIMS.ORGANIZATIONS
      );
    },
  }),
});
