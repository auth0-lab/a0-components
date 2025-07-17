import { NextRequest, NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0"; // Adjust path if your auth0 client is elsewhere

const secureRoutes = [
  "/example/user-profile",
  "/example/create-organization",
  "/example/organization",
];

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    return authRes;
  }

  const session = await auth0.getSession(request);

  if (!session && secureRoutes.some((s) => s === pathname)) {
    // User not authenticated
    // Redirect to dashboard

    const { origin } = new URL(request.url);

    return NextResponse.redirect(`${origin}/example/dashboard`);
  }

  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
