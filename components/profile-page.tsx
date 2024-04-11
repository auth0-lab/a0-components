"use client";

import { z } from "zod";

import UserProfile from "@/sdk/components/user-profile";
import { Claims } from "@auth0/nextjs-auth0";

const languages = ["en-US", "es-AR"] as const;

export function ProfilePage({ user }: { user: Claims }) {
  return (
    <UserProfile
      user={user}
      metadataSchema={z.object({
        address: z
          .string()
          .min(3, {
            message: "Address must be at least 3 characters.",
          })
          .max(50, {
            message: "Address must be at most 50 characters.",
          }),
        job_title: z
          .string()
          .min(3, {
            message: "Job title must be at least 3 characters.",
          })
          .max(50, {
            message: "Job title must be at most 50 characters.",
          }),
        language: z.enum(languages),
      })}
    />
  );
}
