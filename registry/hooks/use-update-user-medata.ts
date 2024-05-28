import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

interface KeyValueMap {
  [key: string]: any;
}

export default function useUpdateUserMedata(user: KeyValueMap) {
  const router = useRouter();
  const pathname = usePathname();

  const update = useCallback(
    async (values: KeyValueMap) => {
      try {
        await fetch("/api/auth/user/metadata", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (user.org_id) {
          return router.push(
            `/api/auth/login?organization=${user.org_id}&returnTo=${pathname}`
          );
        }

        return router.push(`/api/auth/login?returnTo=${pathname}`);
      } catch (e) {
        console.error(e);
      }
    },
    [user, router, pathname]
  );

  return { update };
}
