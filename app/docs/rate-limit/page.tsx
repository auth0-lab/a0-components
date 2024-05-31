import { DocsLayout } from "@/components/www/layouts";
import PageLayout from "@/components/www/page-layout";

export default function Docs() {
  return (
    <DocsLayout>
      <PageLayout
        title="Rate Limit"
        description="UI components provide a solid foundation for developing robust and user-friendly identity-related features in applications."
        experimental={false}
      >
        Content
      </PageLayout>
    </DocsLayout>
  );
}
