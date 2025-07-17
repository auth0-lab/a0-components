import { ChevronLeftIcon } from "lucide-react";

import { ExamplesLayout } from "@/components/www/layouts";

import TopBar from "../components/top-bar";
import { CreateOrganizationPage } from "./components/create-organizations";

export default function CreateOrganization() {
  return (
    <ExamplesLayout>
      <div className="flex-col md:flex">
        {<TopBar />}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="max-w-(--breakpoint-lg) mx-auto justify-center">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <ChevronLeftIcon className="h-4 w-4" />
              <a
                href="/example/dashboard"
                className="font-medium text-muted-foreground"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
          <CreateOrganizationPage />
        </div>
      </div>
    </ExamplesLayout>
  );
}
