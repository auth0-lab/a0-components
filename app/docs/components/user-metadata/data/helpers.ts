export const componentHelpers = [
  {
    name: "useUpdateUserMedata",
    description: "A hook to update the user metadata.",
    code: `import { usePathname, useRouter } from "next/navigation";

interface KeyValueMap {
  [key: string]: any;
}

export default function useUpdateUserMedata(user: KeyValueMap) {
  const router = useRouter();
  const pathname = usePathname();

  return async (values: KeyValueMap) => {
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
        \`/api/auth/login?organization=\${user.org_id}&returnTo=\${pathname}\`
        );
      }

      return router.push(\`/api/auth/login?returnTo=\${pathname}\`);
    } catch (e) {
      console.error(e);
    }
  };
}`,
  },
];
