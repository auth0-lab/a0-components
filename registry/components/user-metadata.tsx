"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
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

export default function UserMetadataForm({
  schema,
  metadata,
  onSave,
  onFetch,
}: {
  schema: any;
  metadata?: KeyValueMap;
  onFetch: () => Promise<KeyValueMap>;
  onSave?: (values: KeyValueMap) => Promise<{
    metadata?: KeyValueMap;
    status: number;
  }>;
}) {
  const [fetching, setFetching] = useState(false);
  const [defaultValues, setDefaultValues] = useState<KeyValueMap | undefined>(
    metadata
  );
  const { toast } = useToast();
  const [working, setWorking] = useState<boolean>(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setWorking(true);

    if (typeof onSave === "function") {
      const response = await onSave(values);

      if (response.status !== 200) {
        toast({
          title: "Info",
          description:
            "There was a problem updating preferences. Try again later.",
        });
      }
    }

    setWorking(false);
  }

  const handleFetching = useCallback(
    async function handleFetching() {
      setFetching(true);
      const response = await onFetch();

      if (response.status !== 200) {
        return setFetching(false);
      }

      setDefaultValues(response.metadata);
      form.reset(response.metadata, { keepValues: false });

      setFetching(false);
    },
    [form, onFetch]
  );

  useEffect(() => {
    (async () => {
      if (!defaultValues) {
        await handleFetching();
      }
    })();
  }, [defaultValues, handleFetching]);

  return (
    <>
      <Toaster />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-normal">Preferences</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        {fetching && (
          <CardContent>
            <div className="flex w-full items-center justify-left">
              <Spinner />
              <span className="text-sm text-muted-foreground">
                Fetching Preferences...
              </span>
            </div>
          </CardContent>
        )}
        {!defaultValues && !fetching && (
          <CardContent>
            <div className="flex flex-col gap-6">
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label className="flex flex-col space-y-2">
                  <p className="font-normal leading-snug text-muted-foreground max-w-fit">
                    There was a problem retrieving preferences. Try again later.
                  </p>
                </Label>
              </div>
            </div>
          </CardContent>
        )}

        {defaultValues && !fetching && (
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
                  {working && <Spinner />}
                  Save Preferences
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </>
  );
}
