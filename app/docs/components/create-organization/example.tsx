"use client";

import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrganizationCreate from "@/registry/components/organization-create";

export default function Example() {
  return (
    <OrganizationCreate
      onCreate={async () => {
        alert("Created!");
      }}
      schema={z.object({
        plan: z.enum(["basic", "starter", "business"], {
          required_error: "You need to select a plan.",
        }),
      })}
      defaultValues={{
        plan: "basic",
      }}
      customFields={[
        ({ form }: any) => {
          return (
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Plan</FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          );
        },
      ]}
    />
  );
}
