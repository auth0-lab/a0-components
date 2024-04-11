import { ProfilePage } from "@/components/profile-page";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    const user = session!.user;

    return <ProfilePage user={user} />;
  },
  { returnTo: "/profile" }
);
