export const componentUsage = `<OrganizationSSO
  orgId={"xxx"}
  connections={[{ connection: { name: "TEST", strategy: "oidc" } }]}
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
/>`;
