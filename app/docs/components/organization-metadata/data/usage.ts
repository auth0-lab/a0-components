export const componentUsage = `<OrganizationMetadata
  orgId="xxx"
  onFetch={async () => {
    return {};
  }}
  onSave={async () => {
    alert("Saved!");
    return { status: 200 };
  }}
  schema={z.object({
    admin_email: z.string().email(),
    billing_email: z.string().email(),
  })}
  metadata={{
    admin_email: "admin@acme.com",
    billing_email: "billing@acme.com",
  }}
/>`;
