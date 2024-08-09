"use client";

import { z } from "zod";

import UserProfile from "@/registry/components/user-profile";

const languages = ["en-US", "es-AR"] as const;

export function Example() {
  return (
    <UserProfile
      user={{
        given_name: "John",
        family_name: "Doe",
        nickname: "johndoe",
        name: "John Doe",
        email: "john.doe@acme.com",
        sid: "123123-123123-123123-123123",
      }}
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
      sessions={[
        {
          id: "123123-123123-123123-123123",
          created_at: "2024-08-07T19:06:28.561Z",
          updated_at: "2024-08-07T19:06:28.971Z",
          authenticated_at: "2024-08-07T19:06:28.561Z",
          device: {
            initial_user_agent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            initial_ip: "130.41.100.250",
            last_user_agent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            last_ip: "130.41.100.250",
          },
        },
        {
          id: "321321-321321-321321-321321",
          created_at: "2024-08-09T17:41:55.199Z",
          updated_at: "2024-08-09T17:41:55.585Z",
          authenticated_at: "2024-08-09T17:41:55.199Z",
          device: {
            initial_user_agent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:129.0) Gecko/20100101 Firefox/129.0",
            initial_ip: "130.41.100.250",
            last_user_agent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:129.0) Gecko/20100101 Firefox/129.0",
            last_ip: "130.41.100.250",
          },
        },
      ]}
    />
  );
}
