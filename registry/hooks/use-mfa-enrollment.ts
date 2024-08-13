"use client";

import { useCallback } from "react";

type CreateEnrollmentResponse = { ticket_url: string };

type MfaEnrollment = {
  name: string;
  enabled: boolean;
  enrollmentId?: string;
};

type DeleteEnrollmentResponse = { id: string };

export default function useMfaEnrollment() {
  const fetchFactors = useCallback(async (): Promise<{
    factors?: MfaEnrollment[];
    status: number;
  }> => {
    try {
      /**
       * '/api/auth/mfa' is a custom endpoint which will proxy
       * the request to the Auth0 Management API.
       *
       * Proxy sample at: https://components.lab.auth0.com/docs/components/mfa-enrollment#nextjs-routers
       */
      const response = await fetch("/api/auth/mfa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // TODO: Better handling rate limits
      if (response.status === 429) {
        return { status: 429 };
      }

      const data: MfaEnrollment[] = await response.json();

      return {
        factors: data.filter((factor: MfaEnrollment) => factor.enabled),
        status: response.status,
      };
    } catch (error) {
      console.error(error);
      return { status: 500 };
    }
  }, []);

  const createEnrollment = useCallback(
    async (
      factor: string
    ): Promise<{
      enrollment?: CreateEnrollmentResponse | undefined;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/mfa' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/mfa-enrollment#nextjs-routers
         */
        const response = await fetch("/api/auth/mfa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ factor }),
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const enrollment: CreateEnrollmentResponse = await response.json();
        return { enrollment, status: response.status };
      } catch (error) {
        console.error(error);
        return { status: 500 };
      }
    },
    []
  );

  const deleteEnrollment = useCallback(
    async (
      enrollmentId: string
    ): Promise<{
      enrollment?: DeleteEnrollmentResponse;
      status: number;
    }> => {
      try {
        /**
         * '/api/auth/mfa' is a custom endpoint which will proxy
         * the request to the Auth0 Management API.
         *
         * Proxy sample at: https://components.lab.auth0.com/docs/components/mfa-enrollment#nextjs-routers
         */
        const response = await fetch(`/api/auth/mfa/${enrollmentId}`, {
          method: "DELETE",
        });

        // TODO: Better handling rate limits
        if (response.status === 429) {
          return { status: 429 };
        }

        const data: DeleteEnrollmentResponse = await response.json();

        return { enrollment: data, status: response.status };
      } catch (error) {
        console.error(error);
        return { status: 500 };
      }
    },
    []
  );

  return { fetchFactors, createEnrollment, deleteEnrollment };
}
