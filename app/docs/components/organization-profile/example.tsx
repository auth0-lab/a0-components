"use client";

import { z } from "zod";

import OrganizationProfile from "@/registry/components/organization-profile";

export function Example() {
  return (
    <OrganizationProfile
      orgId={"xxx"}
      connections={[{ connection: { name: "OKTA SSO", strategy: "oidc" } }]}
      organization={{
        name: "acme",
        display_name: "Acme",
        branding: {
          logo_url: "https://cdn.auth0.com/avatars/c.png",
        },
        metadata: {
          admin_email: "john@acme.com",
        },
      }}
      metadataSchema={z.object({
        admin_email: z.string().email(),
        billing_email: z.string().email().optional(),
      })}
    />
  );
}
