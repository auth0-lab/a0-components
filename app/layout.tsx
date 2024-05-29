import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";

import { SiteHeader } from "@/components/www/header";
import { SiteFooter } from "@/components/www/site-footer";
import { ThemeProvider } from "@/components/www/theme-provider";
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
            {children}
            <SiteFooter />
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
