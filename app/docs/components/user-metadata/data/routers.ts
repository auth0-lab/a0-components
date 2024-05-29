export const componentRoutes = [
  {
    "name": "UserMetadata router",
    "description": "Handles user metadata update.",
    "code": "import { ManagementClient } from \"auth0\";\nimport { NextResponse } from \"next/server\";\n\nimport { getSession, withApiAuthRequired } from \"@auth0/nextjs-auth0\";\n\nconst client = new ManagementClient({\n  domain: new URL(process.env.AUTH0_ISSUER_BASE_URL!).host,\n  clientId: process.env.AUTH0_CLIENT_ID_MGMT!,\n  clientSecret: process.env.AUTH0_CLIENT_SECRET_MGMT!,\n});\n\n/**\n * @example export const PUT = handleUserMetadataUpdate();\n */\n// TODO: better error handling\nexport function handleUserMetadataUpdate() {\n  return withApiAuthRequired(\n    async (request: Request): Promise<NextResponse> => {\n      const session = await getSession();\n      const userId = session?.user.sub;\n      const user_metadata = await request.json();\n\n      await client.users.update({ id: userId }, { user_metadata });\n\n      return NextResponse.json(user_metadata);\n    }\n  );\n}\n"
  }
];