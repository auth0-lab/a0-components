import { ExamplesLayout } from "@/components/www/layouts";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import DashboardPage from "./components/dashboard";

export default withPageAuthRequired(
  async function Dashboard() {
    return (
      <ExamplesLayout>
        <DashboardPage />
      </ExamplesLayout>
    );
  },
  { returnTo: "/examples/dashboard" }
);
