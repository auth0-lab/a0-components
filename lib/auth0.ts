import {
  Auth0Client,
  filterDefaultIdTokenClaims,
} from "@auth0/nextjs-auth0/server";

export const dynamic = "force-dynamic";

export const auth0 = new Auth0Client({
  beforeSessionSaved: async (session) => {
    const { user } = session;
    const { phone_number, phone_verified, sid } = user;

    return {
      ...session,
      user: {
        ...filterDefaultIdTokenClaims(user),
        phone_number,
        phone_verified,
        sid,
      },
    };
  },
});
