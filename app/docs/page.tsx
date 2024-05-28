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
      >
        <Alert variant="warning" className="mb-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            The UI Components are for experimentation and testing purposes only,
            not intended for production use. They are provided for evaluation in
            a non-commercial environment and may not remain available or be
            incorporated into the Auth0 platform. Use of these components is
            without support, and all questions should be directed to discussion
            groups.
          </AlertDescription>
        </Alert>
        Content
      </PageLayout>
    </DocsLayout>
  );
}
