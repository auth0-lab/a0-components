import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteHeader } from "@/components/www/header";
import { SiteFooter } from "@/components/www/site-footer";
import { ThemeProvider } from "@/components/www/theme-provider";
import { cn } from "@/lib/utils";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth0 Lab - UI Components",
  description:
    "UI components provide a solid foundation for developing robust and user-friendly identity-related features in applications.",
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
            inter.className
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
