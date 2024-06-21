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
    <div className="hidden md:flex w-full items-center justify-between">
      <div className="w-[148px]">
        <Link href="/" className="flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">
            {config.common.name}
          </span>
        </Link>
      </div>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
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
          href="/example/dashboard"
          className={cn(
            "flex items-center gap-1 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/example")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Live Example
        </Link>
      </nav>
      <div className="flex items-center justify-between space-x-2 md:justify-end">
        <nav className="flex items-center">
          <Link
            href={config.common.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.logo className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
