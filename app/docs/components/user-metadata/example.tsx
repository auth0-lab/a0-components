"use client";

import { z } from "zod";

import UserMetadata from "@/registry/components/user-metadata";

const languages = ["en-US", "es-AR"] as const;

export function Example() {
  return (
    <UserMetadata
      onSave={async () => {
        alert("Saved!");
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
