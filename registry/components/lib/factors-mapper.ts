export const factorsMapper: any = {
  sms: {
    title: "Phone Message",
    description: "Users will receive a phone message with a verification code",
  },
  "push-notification": {
    title: "Push Notification using Auth0 Guardian",
    description: "Provide a push notification using Auth0 Guardian.",
  },
  otp: {
    title: "One-time Password",
    description:
      "Provide a one-time password using Google Authenticator or similar.",
  },
  email: {
    title: "Email",
    description:
      "Users will receive an email message containing a verification code.",
  },
  duo: {
    title: "Duo Security",
    description: "Use your DUO account for Multi-factor Authentication.",
  },
  "webauthn-roaming": {
    title: "WebAuthn with FIDO Security Keys",
    description:
      "Depending on your browser, you can use WebAuthn-compliant security keys (like FIDO2) as a second factor of authentication.",
  },
  "webauthn-platform": {
    title: "WebAuthn with FIDO Device Biometrics",
    description:
      "Depending on your browser, you can use WebAuthn-compliant device biometrics as a second factor of authentication",
  },
  "recovery-code": {
    title: "Recovery Code",
    description:
      "Provide a unique code that allows users to regain access to their account.",
  },
};
