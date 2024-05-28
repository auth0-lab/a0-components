export const componentUsage = `<MFAForm
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
