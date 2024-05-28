export const componentHooks = [
  {
    "name": "useOrganizations",
    "description": "The hook can be used to create an organization.",
    "code": "\"use client\";\n\nimport { PostOrganizationsRequest } from \"auth0\";\nimport { useCallback } from \"react\";\n\nexport type OnPostOrganizationCreationProps = PostOrganizationsRequest & {\n  id: string;\n};\n\nexport default function useOrganizations() {\n  const createOrganization = useCallback(async (values: any) => {\n    const res = await fetch(\"/api/auth/orgs\", {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n      },\n      body: JSON.stringify({ name: values.organization_name }),\n    });\n    return (await res.json()) as OnPostOrganizationCreationProps;\n  }, []);\n\n  return { createOrganization };\n}\n"
  }
];