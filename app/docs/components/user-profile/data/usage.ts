export const componentUsage = `<UserProfile
  userMetadata={{
    address: "123 Fake st",
    job_title: "Designer",
    language: "es-AR",
  }}
  factors={[
    {
      name: "sms",
      enabled: true,
      enrollmentId: "phone|xxxxxxxxxx",
    },
    { name: "push-notification", enabled: true },
    {
      name: "otp",
      enabled: true,
      enrollmentId: "totp|xxxxxxxxxx",
    },
    { name: "webauthn-roaming", enabled: true },
    { name: "webauthn-platform", enabled: true },
  ]}
  sessions={sessions}
/>`;
