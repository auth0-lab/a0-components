import DashboardPage from "@/components/dashboard";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function CreateOrganization() {
    return <>hello</>;
  },
  { returnTo: "/create/organization" }
);
