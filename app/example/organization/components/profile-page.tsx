"use client";

import { z } from "zod";

import OrganizationProfile from "@/registry/components/organization-profile";

export function ProfilePage() {
  return (
    <OrganizationProfile
      metadataSchema={z.object({
        admin_email: z.string().email(),
        billing_email: z.string().email().optional(),
      })}
    />
  );
}
