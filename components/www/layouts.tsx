"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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

const examples = [
  {
    name: "Dashboard",
    href: "/examples/dashboard",
  },
  {
    name: "User Profile",
    href: "/examples/user-profile",
  },
  {
    name: "Create Organization",
    href: "/examples/create-organization",
  },
];

export const ExamplesLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <div className="container flex-1 items-start mb-10">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">
          Check out examples
        </h1>
        <span
          className="max-w-[750px] text-center text-lg font-light text-foreground"
          data-br=":r8i:"
          data-brr="1"
          style={{
            display: "inline-block",
            verticalAlign: "top",
            textDecoration: "inherit",
            maxWidth: "494px",
          }}
        >
          Dashboard, User Profile, and Create Organization examples, requiring
          login to showcase their functionality.
        </span>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <a
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-[6px]"
            href="/docs"
          >
            Get Started
          </a>
          <a
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-[6px]"
            href="/docs/components/user-profile"
          >
            Components
          </a>
        </div>
      </section>
      <div className="relative">
        <ScrollArea className="max-w-[600px] lg:max-w-none">
          <div className={cn("mb-4 flex items-center")}>
            {examples.map((example, index) => (
              <Link
                href={example.href}
                key={example.href}
                className={cn(
                  "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                  pathname?.startsWith(example.href) ||
                    (index === 0 && pathname === "/")
                    ? "bg-muted font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {example.name}
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
      <Card className={className}>{children}</Card>
    </div>
  );
};
