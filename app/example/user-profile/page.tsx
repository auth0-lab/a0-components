import { ChevronLeftIcon } from "lucide-react";

import { ExamplesLayout } from "@/components/www/layouts";
import { getSession } from "@auth0/nextjs-auth0";

import TopBar from "../dashboard/components/top-bar";
import { ProfilePage } from "./components/profile-page";

export default async function Profile() {
  const session = await getSession();
  const user = session!.user;

  return (
    <ExamplesLayout isLoggedIn={!!session}>
      <div className="flex-col md:flex">
        {session && <TopBar user={session!.user} />}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="max-w-screen-lg mx-auto justify-center">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <ChevronLeftIcon className="h-4 w-4" />
              <a
                href="/example/dashboard"
                className="font-medium text-foreground text-muted-foreground"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
          <ProfilePage user={user} />
        </div>
      </div>
    </ExamplesLayout>
  );
}
