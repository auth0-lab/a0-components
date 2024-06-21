import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";
import { config } from "./config";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex items-center justify-between gap-4 md:h-20 md:flex-row">
        <div className="hidden md:block">
          <Icons.logo />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              href={config.common.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={config.common.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
          </nav>
        </div>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 Okta, Inc. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
