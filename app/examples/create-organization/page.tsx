import { ExamplesLayout } from "@/components/www/layouts";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { CreateOrganizationPage } from "./components/create-organizations";

export default withPageAuthRequired(
  async function CreateOrganization() {
    return (
      <ExamplesLayout className="p-16">
        <CreateOrganizationPage />
      </ExamplesLayout>
    );
  },
  { returnTo: "/examples/create-organization" }
);
