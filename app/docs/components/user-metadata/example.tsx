"use client";

import { z } from "zod";

import UserMetadata from "@/registry/components/user-metadata";

const languages = ["en-US", "es-AR"] as const;

export function Example() {
  return (
    <UserMetadata
      onFetch={async () => {
        return {};
      }}
      onSave={async () => {
        alert("Saved!");
        return { status: 200 };
      }}
      schema={z.object({
        address: z.string(),
        job_title: z.string(),
        language: z.enum(languages),
      })}
      metadata={{
        address: "123 Fake st",
        job_title: "Designer",
        language: "es-AR",
      }}
    />
  );
}
