import { CreateOrganizationPage } from "@/components/create-organizations";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function CreateOrganization() {
    return <CreateOrganizationPage />;
  },
  { returnTo: "/create/organization" }
);
