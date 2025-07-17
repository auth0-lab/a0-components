import { useCallback } from "react";

import type { GetOrganizations200ResponseOneOfInner as Organizations } from "auth0";

interface KeyValueMap {
  [key: string]: any;
}

interface UserMetadata extends KeyValueMap {
  organizations?: Organizations[];
}

export default function useUserMedata() {
  const fetchUserMetadata = useCallback(async (): Promise<UserMetadata> => {
    try {
      /**
       * '/api/auth/user/metadata' is a custom endpoint which will proxy
       * the request to the Auth0 Management API.
       *
       * In addition to fetching the user profile it also fetches a user's organizations membership.
       *
       * Proxy sample at: https://components.lab.auth0.com/docs/components/user-metadata#nextjs-routers
       */
      const response = await fetch("/api/auth/user/metadata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // TODO: Better handling rate limits
      if (response.status === 429) {
        return { status: 429 };
      }

      const userMetadata: UserMetadata = await response.json();

      return {
        metadata: userMetadata,
        status: response.status,
      };
    } catch (error) {
      console.error(error);
      return { status: 500 };
    }
  }, []);

  const updateUserMetadata = useCallback(
    async (
      values: KeyValueMap
    ): Promise<{
      metadata?: UserMetadata;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/user/metadata' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/user-metadata#nextjs-routers
         */
        const response = await fetch("/api/auth/user/metadata", {
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

        const metadata: UserMetadata = await response.json();

        return { metadata, status: response.status };
      } catch (e) {
        console.error(e);
        return { status: 500 };
      }
    },
    []
  );

  return { updateUserMetadata, fetchUserMetadata };
}
