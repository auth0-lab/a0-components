export const componentHooks = [
  {
    name: "useOrganizations",
    description: "The hook can be used to create an organization.",
    code: `"use client";

import { PostOrganizationsRequest } from "auth0";
import { useCallback } from "react";

export type OnPostOrganizationCreationProps = PostOrganizationsRequest & {
  id: string;
};

export default function useOrganizations() {
  const createOrganization = useCallback(async (values: any) => {
    const res = await fetch("/api/auth/orgs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: values.organization_name }),
    });
    return (await res.json()) as OnPostOrganizationCreationProps;
  }, []);

  return { createOrganization };
}`,
  },
];
