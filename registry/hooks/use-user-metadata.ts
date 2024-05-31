import { useCallback } from "react";

interface KeyValueMap {
  [key: string]: any;
}

export default function useUserMedata() {
  const update = useCallback(
    async (
      values: KeyValueMap
    ): Promise<{
      metadata?: KeyValueMap;
      status: number;
    }> => {
      try {
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

        const metadata: KeyValueMap = await response.json();

        return { metadata, status: response.status };
      } catch (e) {
        console.error(e);
        return { status: 500 };
      }
    },
    []
  );

  return { update };
}
