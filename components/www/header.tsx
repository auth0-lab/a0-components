import Link from "next/link";

import { config } from "@/components/www/config";
import { MainNav } from "@/components/www/main-nav";

import { Icons } from "./icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <MainNav />
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link href={config.common.url} target="_blank" rel="noreferrer">
              <Icons.logo className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
