import { CLAIMS } from "@/lib/utils";
import { Auth0Provider } from "@auth0/nextjs-auth0";

import type { User } from "@auth0/nextjs-auth0/types";

export default function UserProvider({ children, user }: UserProviderProps) {
  const mockUser = {
    sub: "auth0|123456789101112",
    name: "John Doe",
    nickname: "johndoe",
    given_name: "John",
    family_name: "Doe",
    picture:
      "https://robohash.org/545e1a87b3e80d7555c3db8bab940364?set=set4&bgset=bg1&size=400x400",
    email: "john.doe@acme.com",
    email_verified: true,
    org_id: "org_1234",
    phone_number: "+15555551234",
    phone_verified: false,
    sid: "123123-123123-123123-123123",
    [CLAIMS.ORGANIZATIONS]: [
      {
        id: "org_xxxxxxxxxxx",
        name: "acme",
        display_name: "Acme",
        picture: "https://cdn.auth0.com/avatars/b.png",
      },
    ],
    ...user,
  };

  return <Auth0Provider user={mockUser}>{children}</Auth0Provider>;
}

export interface UserProviderProps extends React.PropsWithChildren {
  user?: User;
}
