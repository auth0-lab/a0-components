"use client";

import MFAEnrollment from "@/registry/components/mfa-enrollment";

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
    <MFAEnrollment
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
