"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { config } from "@/components/www/config";
import { DocsSidebarNav } from "@/components/www/sidebar-nav";
import { cn } from "@/lib/utils";

export const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <DocsSidebarNav items={config.sidebarNav} />
          </ScrollArea>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export const ExamplesLayout = ({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}) => {
  return (
    <div className="container flex-1 items-start border-b">
      <section
        className={cn(
          "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 lg:py-24",
          isLoggedIn ? "md:pb-8 lg:pb-25" : "md:pb-4 lg:pb-10"
        )}
      >
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">
          Live example
        </h1>
        <span
          className="max-w-[750px] text-center text-lg font-light text-foreground"
          data-br=":r8i:"
          data-brr="1"
          style={{
            display: "inline-block",
            verticalAlign: "top",
            textDecoration: "inherit",
            maxWidth: "650px",
          }}
        >
          {isLoggedIn ? (
            <>
              You&apos;re already logged in! Go ahead and explore the components
              on the dashboard below, click on the{" "}
              <span className="bg-[#6666FF] text-white px-2 py-[2px] rounded-sm">
                purple
              </span>{" "}
              dots to try the interactions.
            </>
          ) : (
            <>
              After logging in, explore the components in action: experience how
              User Profile, Organization Switcher, and more seamlessly integrate
              with each other.
            </>
          )}
        </span>
        {!isLoggedIn && (
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <a
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-[6px]"
              href="/api/auth/login?returnTo=/example/dashboard"
            >
              Login to Start
            </a>
          </div>
        )}
      </section>
      {!isLoggedIn && (
        <div className="flex w-full items-center flex-col py-4 md:pb-10 gap-5 relative mb-10">
          <Image
            className="grayscale drop-shadow-2xl rounded-xl"
            src="/dashboard.png"
            alt="dashboard"
            width={1000}
            height={614}
          />
        </div>
      )}

      {isLoggedIn && <Card className="mb-10">{children}</Card>}
    </div>
  );
};
