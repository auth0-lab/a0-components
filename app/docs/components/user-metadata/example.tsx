"use client";

import { z } from "zod";

import UserMetadataForm from "@/registry/components/user-metadata-form";

const languages = ["en-US", "es-AR"] as const;

export function Example() {
  return (
    <UserMetadataForm
      user={{
        given_name: "John",
        family_name: "Doe",
        nickname: "johndoe",
        name: "John Doe",
        email: "john.doe@acme.com",
      }}
      schema={z.object({
        address: z.string(),
        job_title: z.string(),
        language: z.enum(languages),
      })}
      defaultValues={{
        address: "123 Fake st",
        job_title: "Designer",
        language: "es-AR",
      }}
    />
  );
}
