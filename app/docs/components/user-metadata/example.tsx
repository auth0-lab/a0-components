"use client";

import { z } from "zod";

import UserMetadataForm from "@/registry/components/user-metadata-form";

const languages = ["en-US", "es-AR"] as const;

export function Example() {
  return (
    <UserMetadataForm
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
