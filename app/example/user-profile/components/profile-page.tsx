"use client";

import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";

import { CLAIMS } from "@/lib/utils";
import UserProfile from "@/registry/components/user-profile";
import { Claims } from "@auth0/nextjs-auth0";

const languages = ["en-US", "es-AR"] as const;

export function ProfilePage({ user }: { user: Claims }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <UserProfile
      user={user}
      userMetadata={user[CLAIMS.USER_METADATA]}
      onPreferencesSaved={async () => {
        if (user.org_id) {
          router.push(
            `/api/auth/login?organization=${user.org_id}&returnTo=${pathname}`
          );
        } else {
          router.push(`/api/auth/login?returnTo=${pathname}`);
        }
      }}
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
