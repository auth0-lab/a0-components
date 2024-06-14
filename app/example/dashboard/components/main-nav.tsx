import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <div className="text-sm font-medium transition-colors hover:text-primary">
        Overview
      </div>
      <div className="pointer-events-none opacity-50 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Customers
      </div>
      <div className="pointer-events-none opacity-50 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Products
      </div>
      <div className="pointer-events-none opacity-50 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Settings
      </div>
    </nav>
  );
}
