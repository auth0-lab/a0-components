import { ChevronRightIcon } from "lucide-react";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

export default function PageLayout({
  title,
  description,
  children,
  experimental = true,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  experimental?: boolean;
}) {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{title}</div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col items-left gap-2">
            {experimental && (
              <div>
                <Badge className="bg-[#6666FF] rounded-sm hover:bg-[#6666FF]">
                  Experimental
                </Badge>
              </div>
            )}
            <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
              {title}
            </h1>
          </div>

          <p className="text-lg text-muted-foreground">
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <div className="pb-12 pt-8">{children}</div>
      </div>
    </main>
  );
}
