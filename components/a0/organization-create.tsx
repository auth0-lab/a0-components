"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  organization_name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^(?:(?!org_))[a-z0-9]([a-z0-9\-_]*[a-z0-9])?$/),
});

export default function OrganizationCreate({ label }: { label: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [working, setWorking] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setWorking(true);

    const res = await fetch("/api/auth/orgs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: values.organization_name }),
    });

    const { id } = await res.json();

    return router.push(
      `/api/auth/login?organization=${id}&returnTo=${pathname}`
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-between gap-3 w-full block text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          {label}
          <div className="RightSlot">+</div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Creating a new organization will allow you to manage a separate
            group with unique settings and resources.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="organization_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a unique name for your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={working}
                  className="disabled:opacity-50"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={working}
                className="disabled:opacity-50"
              >
                {working && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
