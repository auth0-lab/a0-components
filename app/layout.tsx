import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "@/components/top-bar";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A0 Compoennts",
  description: "A0 Components sample",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex-col md:flex">
              {session && <TopBar user={session!.user} />}
              <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
