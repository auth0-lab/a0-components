export const componentUsage = `<OrganizationProfile
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
/>`;
