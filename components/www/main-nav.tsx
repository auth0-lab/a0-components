"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { config } from "@/components/www/config";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden md:flex w-full">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            {config.common.name}
          </span>
        </Link>
      </div>
      <nav className="flex items-center gap-4 text-sm lg:gap-6 w-full">
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Docs
        </Link>
        <Link
          href="/docs/components/user-profile"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link>
        <Link
          href="/examples/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Examples
        </Link>
      </nav>
    </>
  );
}
