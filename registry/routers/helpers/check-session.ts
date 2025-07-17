import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";

export const checkSession = async () => {
  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 }) as never;
  }

  return user;
};
