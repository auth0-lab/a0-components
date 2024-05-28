"use client";

import MFAForm from "@/registry/components/mfa-form";

export function Example() {
  const factors = [
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
  ];

  return (
    <MFAForm
      factors={factors}
      onFetch={async () => {
        return factors;
      }}
      onCreate={async (factor: string) => {
        alert(`Create ${factor}`);

        return { ticket_url: "https://auth0.com" };
      }}
      onDelete={async (enrollmentId: string) => {
        alert(`Delete ${enrollmentId}`);
      }}
    />
  );
}
