import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DocsLayout } from "@/components/www/layouts";
import PageLayout from "@/components/www/page-layout";

export default function Docs() {
  return (
    <DocsLayout>
      <PageLayout
        title="Introduction"
        description="UI components provide a solid foundation for developing robust and user-friendly identity-related features in applications."
        experimental={false}
      >
        <Alert variant="warning" className="mb-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            The UI components are an experimental Auth0Lab library. They might
            not remain available or be incorporated into the Auth0 platform. Use
            of these components is without support and all questions should be
            directed to the open source{" "}
            <a
              href="https://github.com/auth0-lab/a0-components"
              target="_blank"
              className="text-blue-700 underline"
            >
              repository
            </a>{" "}
            or the{" "}
            <a
              href="https://discord.gg/QGHxwDsbQQ"
              target="_blank"
              className="text-blue-700 underline"
            >
              Auth0Lab discord
            </a>
            .
          </AlertDescription>
        </Alert>
        <div>
          <p className="mb-6 leading-7">
            Our goal is to deliver reusable UI components that help customers
            build high-quality interfaces efficiently. These self-contained
            pieces of code can be easily integrated into existing projects,
            allowing for customization and extension as needed.
          </p>
          <div>
            <ul className="list-disc ml-4">
              <li className="leading-7">
                <strong>Code ownership</strong>: Take ownership of the UI
                components code, just like you would with any other code in
                their project.
              </li>
              <li className="leading-7">
                <strong>Customization</strong>: Modify the pre-built components
                to fit your specific needs and branding. This might involve
                changing colors, fonts, or layouts, or adding custom
                functionality.
              </li>
              <li className="leading-7">
                <strong>Integration</strong>: Integrage the UI components into
                your existing codebase.
              </li>
              <li className="leading-7">
                <strong>Version control</strong>: Manage the UI components code
                alongside your codebase.
              </li>
            </ul>
          </div>
        </div>
      </PageLayout>
    </DocsLayout>
  );
}
