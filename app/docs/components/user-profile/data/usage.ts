export const componentUsage = `<UserProfile
  user={user}
  userMetadata={{
    address: "123 Fake st",
    job_title: "Designer",
    language: "es-AR",
  }}
  metadataSchema={z.object({
    address: z.string(),
    job_title: z.string(),
    language: z.enum(languages),
  })}
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
/>`;
