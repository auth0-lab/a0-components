"use client";

import OrganizationInfo from "@/registry/components/organization-info";

export function Example() {
  return (
    <OrganizationInfo
      onFetch={async () => {
        return {};
      }}
      orgId="xxx"
      organization={{
        name: "acme",
        display_name: "Acme",
        branding: {
          logo_url: "https://cdn.auth0.com/avatars/c.png",
        },
      }}
    />
  );
}
