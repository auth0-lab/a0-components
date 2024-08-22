"use client";

import OrganizationSSO from "@/registry/components/organization-sso";

export function Example() {
  return (
    <OrganizationSSO
      orgId={"xxx"}
      connections={[{ connection: { name: "OKTA SSO", strategy: "oidc" } }]}
      onFetch={() => {
        return Promise.resolve({});
      }}
      onDelete={() => {
        return Promise.resolve({});
      }}
      onConfigure={() => {
        return Promise.resolve({ selfService: undefined, status: 200 });
      }}
      onUpdateConfiguration={() => {
        return Promise.resolve({ selfService: undefined, status: 200 });
      }}
    />
  );
}
