"use client";

import { useCallback } from "react";

export default function useMfaEnrollment() {
  const fetchFactors = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/mfa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      return data.filter((factor: any) => factor.enabled);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const createEnrollment = useCallback(async (factor: string) => {
    try {
      const response = await fetch("/api/auth/mfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ factor }),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      const response = await fetch(`/api/auth/mfa/${enrollmentId}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { fetchFactors, createEnrollment, deleteEnrollment };
}
