import { useCallback } from "react";

interface KeyValueMap {
  [key: string]: any;
}

export default function useUserSessions() {
  const fetchUserSessions = useCallback(async (): Promise<{
    sessions?: KeyValueMap[];
    status: number;
  }> => {
    try {
      /**
       * '/api/auth/user/metadata' is a custom endpoint which will proxy
       * the request to the Auth0 Management API.
       *
       * Proxy sample at: https://components.lab.auth0.com/docs/components/user-metadata#nextjs-routers
       */
      const response = await fetch("/api/auth/user/sessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // TODO: Better handling rate limits
      if (response.status === 429) {
        return { status: 429 };
      }

      const sessions: KeyValueMap[] = await response.json();

      return {
        sessions: sessions,
        status: response.status,
      };
    } catch (error) {
      console.error(error);
      return { status: 500 };
    }
  }, []);

  const deleteUserSession = useCallback(
    async (
      sessionId: string
    ): Promise<{
      id?: string;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/mfa' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/mfa-enrollment#nextjs-routers
         */
        const response = await fetch(`/api/auth/user/sessions/${sessionId}`, {
          method: "DELETE",
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        return { id: sessionId, status: response.status };
      } catch (error) {
        console.error(error);
        return { status: 500 };
      }
    },
    []
  );

  return { fetchUserSessions, deleteUserSession };
}
