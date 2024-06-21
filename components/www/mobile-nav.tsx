"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { config } from "@/components/www/config";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="flex justify-between w-full md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileLink
            href="/"
            className="flex items-center"
            onOpenChange={setOpen}
          >
            <span className="font-bold">{config.common.name}</span>
          </MobileLink>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 ">
            <div className="flex flex-col space-y-2">
              {config.sidebarNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-3 pt-6">
                  <h4 className="font-medium text-md">{item.title}</h4>
                  {item?.items?.length &&
                    item.items.map((item) => (
                      <React.Fragment key={item.href}>
                        {
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className={cn(
                              "text-muted-foreground text-base",
                              pathname === item.href
                                ? "font-medium text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.title}
                          </MobileLink>
                        }
                      </React.Fragment>
                    ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
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

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
