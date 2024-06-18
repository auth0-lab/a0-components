"use client";

import { useCallback } from "react";

type OrganizationCreationResponse = {
  name: string;
  display_name?: string;
  branding?: {
    logo_url?: string;
    colors?: {
      primary: string;
      page_background: string;
    };
  };
  metadata?: {
    [key: string]: any;
  };
  enabled_connections?: Array<{
    connection_id: string;
    assign_membership_on_login?: boolean;
    show_as_button?: boolean;
  }>;
  id: string;
};

export default function useOrganizations() {
  const createOrganization = useCallback(
    async (
      values: any
    ): Promise<{
      organization?: OrganizationCreationResponse;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/orgs' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/organization-creator#nextjs-routers
         */
        const response = await fetch("/api/auth/orgs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: values.organization_name }),
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const organization: OrganizationCreationResponse =
          await response.json();

        return {
          organization,
          status: response.status,
        };
      } catch (error) {
        console.error(error);
        return { status: 500 };
      }
    },
    []
  );

  return { createOrganization };
}
