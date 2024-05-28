export const componentUsage = `<MFAForm
  factors={factors}
  onFetch={async () => {
    return factors;
  }}
  onCreate={async (factor: string) => {
    return { ticket_url: "https://auth0.com" };
  }}
  onDelete={async (enrollmentId: string) => {
    // no-op
  }}
/>`;
