import { ManagementClient } from "auth0";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

import auth0 from "@/lib/auth0";
import { Session } from "@auth0/nextjs-auth0";

const client = new ManagementClient({
  domain: new URL(process.env.AUTH0_ISSUER_BASE_URL!).host,
  clientId: process.env.AUTH0_CLIENT_ID_MGMT!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
});

async function getMemberOrganizations(userId: string) {
  // TODO: consider paging
  const { data: orgs } = await client.users.getUserOrganizations({
    id: userId,
  });
  return orgs.map((org) => ({
    id: org.id,
    name: org.name,
    display_name: org.display_name,
    picture: org.branding
      ? org.branding.logo_url
      : `https://cdn.auth0.com/avatars/${org.name
          .substring(0, 1)
          .toLowerCase()}.png`,
  }));
}

export type A0Claims = { ORGANIZATIONS: string };

export type A0Organization = {
  id: string;
  name: string;
  display_name: string;
  picture: string;
};

export function handleOrganizationsParams(req: NextRequest | NextApiRequest) {
  const { searchParams } = new URL(req.url!);
  const { prompt, organization } = Object.fromEntries(searchParams);

  return {
    authorizationParams: { prompt, organization },
  };
}

// TODO: Maybe this can be an action
export async function enhanceClaimsWithOrganizations(
  session: Session,
  organizationsClaim: string
) {
  const user = session.user;

  // fetch organizations where user is a member
  const orgs = await getMemberOrganizations(user.sub);
  user[organizationsClaim] = orgs;

  return session;
}

export function handleOrganizations(organizationsClaim: string) {
  return {
    login: auth0.handleLogin((req) => {
      const { searchParams } = new URL(req.url!);
      const { prompt, organization } = Object.fromEntries(searchParams);

      return {
        authorizationParams: { prompt, organization },
      };
    }),
    callback: auth0.handleCallback({
      afterCallback: async (_req: NextRequest, session: Session) => {
        return await enhanceClaimsWithOrganizations(
          session,
          organizationsClaim
        );
      },
    }),
  };
}
