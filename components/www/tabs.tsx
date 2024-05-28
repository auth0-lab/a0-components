"use client";

import * as React from "react";
import { CodeBlock } from "react-code-blocks";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { theme } from "./theme";

interface DocTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  code: string;
}

export function DocTabs({ children, align = "center", code }: DocTabsProps) {
  return (
    <div className={cn("group relative my-4 flex flex-col space-y-2")}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="rounded-md border">
          <div
            className={cn("flex min-h-[350px] justify-center p-10", {
              "items-center": align === "center",
              "items-start": align === "start",
              "items-end": align === "end",
            })}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto font-mono text-sm">
              <CodeBlock
                customStyle={{
                  fontWeight: "100",
                  padding: "8px 16px",
                }}
                text={code}
                language={"jsx"}
                showLineNumbers={false}
                theme={theme}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
