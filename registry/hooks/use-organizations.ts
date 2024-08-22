"use client";

import { useCallback } from "react";

interface KeyValueMap {
  [key: string]: any;
}

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

  const fetchOrganization = useCallback(
    async (id: string): Promise<KeyValueMap> => {
      try {
        /**
         * '/api/auth/orgs/{id}' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/organization-metadata#nextjs-routers
         */
        const response = await fetch(`/api/auth/orgs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const organization: KeyValueMap = await response.json();

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

  const updateOrganization = useCallback(
    async (
      id: string,
      values: KeyValueMap
    ): Promise<{
      organization?: KeyValueMap;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/orgs/{id}' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/organization-metadata#nextjs-routers
         */
        const response = await fetch(`/api/auth/orgs/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const organization: KeyValueMap = await response.json();

        return { organization, status: response.status };
      } catch (e) {
        console.error(e);
        return { status: 500 };
      }
    },
    []
  );

  const startSelfServiceConfiguration = useCallback(
    async (
      values: KeyValueMap
    ): Promise<{
      selfService?: KeyValueMap;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/orgs/sso' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/organization-sso#nextjs-routers
         */
        const response = await fetch("/api/auth/orgs/sso", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organizations_to_enable: values.organizations_to_enable,
          }),
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const selfService = await response.json();

        return {
          selfService,
          status: response.status,
        };
      } catch (error) {
        console.error(error);
        return { status: 500 };
      }
    },
    []
  );

  const fetchOrganizationConnections = useCallback(
    async (id: string): Promise<KeyValueMap> => {
      try {
        /**
         * '/api/auth/orgs/{id}/connections' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/organization-sso#nextjs-routers
         */
        const response = await fetch(`/api/auth/orgs/${id}/connections`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const connections: KeyValueMap[] = await response.json();

        return {
          connections,
          status: response.status,
        };
      } catch (error) {
        console.error(error);
        return { status: 500 };
      }
    },
    []
  );

  const startSelfServiceConnectionUpdate = useCallback(
    async (
      values: KeyValueMap
    ): Promise<{
      selfService?: KeyValueMap;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/orgs/sso' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/organization-metadata#nextjs-routers
         */
        const response = await fetch(`/api/auth/orgs/sso`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const selfService: KeyValueMap = await response.json();

        return { selfService, status: response.status };
      } catch (e) {
        console.error(e);
        return { status: 500 };
      }
    },
    []
  );

  const deleteOrganizationConnection = useCallback(
    async (id: string, connection_id: string): Promise<KeyValueMap> => {
      try {
        /**
         * '/api/auth/orgs/{id}/connections/{connection_id}' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/organization-sso#nextjs-routers
         */
        const response = await fetch(
          `/api/auth/orgs/${id}/connections/${connection_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const connection: KeyValueMap[] = await response.json();

        return {
          connection,
          status: response.status,
        };
      } catch (error) {
        console.error(error);
        return { status: 500 };
      }
    },
    []
  );

  return {
    createOrganization,
    fetchOrganization,
    updateOrganization,
    fetchOrganizationConnections,
    deleteOrganizationConnection,
    startSelfServiceConfiguration,
    startSelfServiceConnectionUpdate,
  };
}
