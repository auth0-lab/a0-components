import { ExamplesLayout } from "@/components/www/layouts";
import { getSession } from "@auth0/nextjs-auth0";

import DashboardPage from "./components/dashboard-page";

export default async function Dashboard() {
  const session = await getSession();

  return (
    <ExamplesLayout isLoggedIn={!!session}>
      <DashboardPage />
    </ExamplesLayout>
  );
}
