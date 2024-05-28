import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/www/header";
import { cn } from "@/lib/utils";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Auth0 Lab - UI Components",
  description: "UI Components",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            GeistSans.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            {/* <div className="border-b">
              <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                  <ScrollArea className="h-full py-6 pr-6 lg:py-8">
                    <DocsSidebarNav items={config.sidebarNav} />
                  </ScrollArea>
                </aside>
                <main className="flex-1">{children}</main>
              </div>
            </div> */}
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
