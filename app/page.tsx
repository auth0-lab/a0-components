import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      <Button>
        <Link href="/api/auth/login?returnTo=/dashboard">Login</Link>
      </Button>
    </main>
  );
}
