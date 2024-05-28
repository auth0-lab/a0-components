export const componentHooks = [
  {
    "name": "useUserMedata",
    "description": "A hook to update the user metadata.",
    "code": "import { usePathname, useRouter } from \"next/navigation\";\nimport { useCallback } from \"react\";\n\ninterface KeyValueMap {\n  [key: string]: any;\n}\n\nexport default function useUserMedata(user: KeyValueMap) {\n  const router = useRouter();\n  const pathname = usePathname();\n\n  const update = useCallback(\n    async (values: KeyValueMap) => {\n      try {\n        await fetch(\"/api/auth/user/metadata\", {\n          method: \"PUT\",\n          headers: {\n            \"Content-Type\": \"application/json\",\n          },\n          body: JSON.stringify(values),\n        });\n\n        if (user.org_id) {\n          return router.push(\n            \\`/api/auth/login?organization=\\${user.org_id}&returnTo=\\${pathname}\\`\n          );\n        }\n\n        return router.push(\\`/api/auth/login?returnTo=\\${pathname}\\`);\n      } catch (e) {\n        console.error(e);\n      }\n    },\n    [user, router, pathname]\n  );\n\n  return { update };\n}\n"
  }
];