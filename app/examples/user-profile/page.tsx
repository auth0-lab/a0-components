import { ExamplesLayout } from "@/components/www/layouts";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { ProfilePage } from "./components/profile-page";

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    const user = session!.user;

    return (
      <ExamplesLayout className="p-16">
        <ProfilePage user={user} />
      </ExamplesLayout>
    );
  },
  { returnTo: "/examples/user-profile" }
);
