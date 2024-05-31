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
        return { factors, status: 200 };
      }}
      onCreate={async (factor: string) => {
        alert(`Create ${factor}`);
        return { enrollment: { ticket_url: "https://auth0.com" }, status: 200 };
      }}
      onDelete={async (enrollmentId: string) => {
        alert(`Delete ${enrollmentId}`);
        return { status: 200 };
      }}
    />
  );
}
