export const componentUsage = `<MFAEnrollment
  factors={factors}
  onFetch={async () => {
    return { factors, status: 200 };
  }}
  onCreate={async (factor: string) => {
    return { enrollment: { ticket_url: "https://auth0.com" }, status: 200 };
  }}
  onDelete={async (enrollmentId: string) => {
    return { status: 200 };
  }}
/>`;
