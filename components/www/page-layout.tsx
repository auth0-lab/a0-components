import { ChevronRightIcon } from "lucide-react";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";

export default function PageLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {title}
          </h1>

          <p className="text-lg text-muted-foreground">
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <div className="pb-12 pt-8">{children}</div>
      </div>
    </main>
  );
}
