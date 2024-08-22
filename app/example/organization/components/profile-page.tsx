"use client";

import { z } from "zod";

import OrganizationProfile from "@/registry/components/organization-profile";
import { Claims } from "@auth0/nextjs-auth0";

export function ProfilePage({ user }: { user: Claims }) {
  return (
    <OrganizationProfile
      orgId={user.org_id}
      metadataSchema={z.object({
        admin_email: z.string().email(),
        billing_email: z.string().email().optional(),
      })}
    />
  );
}
