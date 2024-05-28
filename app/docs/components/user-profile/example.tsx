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
        "https://sample.com/claims/user_metadata": {
          address: "123 Fake st",
          job_title: "Designer",
          language: "es-AR",
        },
      }}
      metadataSchema={z.object({
        address: z.string(),
        job_title: z.string(),
        language: z.enum(languages),
      })}
    />
  );
}
