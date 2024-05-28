export const componentCode = `"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Claims } from "@auth0/nextjs-auth0";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserMetadataForm({
  user,
  schema,
  defaultValues,
}: {
  user: Claims;
  schema: any;
  defaultValues: any;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [working, setWorking] = useState<boolean>(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setWorking(true);

    try {
      await fetch("/api/auth/user/metadata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (user.org_id) {
        return router.push(
          \`/api/auth/login?organization=\${user.org_id}&returnTo=\${pathname}\`
        );
      }

      return router.push(\`/api/auth/login?returnTo=\${pathname}\`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-normal">Preferences</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(schema.shape).map((key: any) => {
                // @ts-ignore
                const type = schema.shape[key]._def;
                const formLabel = (
                  <FormLabel className="capitalize">
                    {key.replace("_", " ")}
                  </FormLabel>
                );

                if (type.typeName === "ZodEnum") {
                  return (
                    <FormField
                      key={key}
                      control={form.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem>
                          {formLabel}
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {type.values.map((value: any) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                return (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key}
                    render={({ field }) => (
                      <FormItem>
                        {formLabel}
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={working}
              className="disabled:opacity-50 ml-auto"
            >
              {working && <Loader2 size={17} className="mr-2 animate-spin" />}
              Save Preferences
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}`;
