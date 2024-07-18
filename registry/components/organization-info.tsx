"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface KeyValueMap {
  [key: string]: any;
}

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  );
}

export default function OrganizationInfo({
  orgId,
  organization,
  onFetch,
  onSave,
}: {
  orgId: string;
  organization?: KeyValueMap;
  onFetch: (id: string) => Promise<KeyValueMap>;
  onSave?: (
    id: string,
    values: KeyValueMap
  ) => Promise<{
    organization?: KeyValueMap;
    status: number;
  }>;
}) {
  const [fetching, setFetching] = useState(false);
  const [info, setInfo] = useState<KeyValueMap | undefined>(organization);
  const { toast } = useToast();
  const [working, setWorking] = useState<boolean>(false);
  const schema = z.object({
    name: z.string(),
    display_name: z.string(),
    branding: z
      .object({
        logo_url: z.string().url(),
      })
      .optional(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: organization,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setWorking(true);

    if (typeof onSave === "function") {
      const response = await onSave(orgId, values);

      if (response.status !== 200) {
        toast({
          title: "Info",
          description:
            "There was a problem updating the info. Try again later.",
        });
      }
    }

    setWorking(false);
  }

  const handleFetching = useCallback(
    async function handleFetching() {
      setFetching(true);
      const response = await onFetch(orgId);

      if (response.status !== 200) {
        return setFetching(false);
      }

      setInfo(response.organization);
      form.reset(response.organization, { keepValues: false });
      setFetching(false);
    },
    [form, onFetch, orgId]
  );

  useEffect(() => {
    (async () => {
      if (!info) {
        await handleFetching();
      }
    })();
  }, [handleFetching, info]);

  return (
    <Card className="w-full">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg font-normal">General</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      {fetching && (
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <div className="flex w-full items-center justify-left">
            <Spinner />
            <span className="text-sm text-muted-foreground">
              Fetching info...
            </span>
          </div>
        </CardContent>
      )}

      {!info && !fetching && (
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <div className="flex flex-col gap-6">
            <Separator />
            <div className="flex items-center justify-between space-x-2">
              <Label className="flex flex-col space-y-2">
                <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                  There was a problem retrieving info. Try again later.
                </p>
              </Label>
            </div>
          </div>
        </CardContent>
      )}

      {info && !fetching && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name={"name"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name={"display_name"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name={"branding.logo_url"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>

                        <div className="border rounded-md flex justify-center items-center">
                          <Avatar className="h-8 w-8 flex items-center ml-[3px] mt-[2px] mb-[2px] rounded-md">
                            <AvatarImage
                              src={info.branding.logo_url}
                              alt={info.name}
                            />
                          </Avatar>
                          <FormControl>
                            <Input {...field} className="border-0" />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 md:p-6 md:pt-0">
              <Button
                type="submit"
                disabled={working}
                className="disabled:opacity-50 ml-auto"
              >
                {working && <Spinner />}
                Save
              </Button>
            </CardFooter>
          </form>
        </Form>
      )}
    </Card>
  );
}
