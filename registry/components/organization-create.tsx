"use client";

import * as React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export type OrganizationCreationProps = {
  name: string;
  display_name?: string;
  branding?: {
    logo_url?: string;
    colors?: {
      primary: string;
      page_background: string;
    };
  };
  metadata?: {
    [key: string]: any;
  };
  enabled_connections?: Array<{
    connection_id: string;
    assign_membership_on_login?: boolean;
    show_as_button?: boolean;
  }>;
  id: string;
};

type OrganizationCreateProps = {
  customFields?: any[];
  schema?: any;
  defaultValues?: any;
  onCreate?: (organization: OrganizationCreationProps) => Promise<void>;
};

type BaseFormProps = {
  onSubmit: (values: z.infer<typeof formSchemaBase>) => void;
  form: UseFormReturn<z.infer<typeof formSchemaBase>>;
};

type OrganizationFormProps = BaseFormProps & {
  children: React.ReactNode;
  customFields?: any[];
};

type PageModeProps = BaseFormProps & {
  working: boolean;
  customFields?: any[];
};

const formSchemaBase = z.object({
  organization_name: z
    .string()
    .min(3, {
      message: "Organization name must be at least 2 characters.",
    })
    .max(50, {
      message: "Organization name must be at most 50 characters.",
    })
    .regex(/^(?:(?!org_))[a-z0-9]([a-z0-9\-_]*[a-z0-9])?$/, {
      message: "Invalid organization name.",
    }),
});

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

function OrganizationForm({
  form,
  children,
  customFields,
  onSubmit,
}: OrganizationFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="organization_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique name for your organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {customFields &&
          customFields.map((Field) => <Field key={typeof Field} form={form} />)}

        {children}
      </form>
    </Form>
  );
}

function PageMode({ form, working, customFields, onSubmit }: PageModeProps) {
  return (
    <div className="max-w-screen-lg mx-auto gap-5 md:gap-5 lg:gap-5 justify-center p-4 py-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
          <CardDescription>
            Creating a new organization will allow you to manage a separate
            group with unique settings and resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationForm
            form={form}
            onSubmit={onSubmit}
            customFields={customFields}
          >
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="button"
                variant="ghost"
                disabled={working}
                className="disabled:opacity-50"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={working}
                className="disabled:opacity-50"
              >
                {working && <Spinner />}
                Create
              </Button>
            </div>
          </OrganizationForm>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OrganizationCreate({
  customFields,
  defaultValues,
  schema,
  onCreate,
}: OrganizationCreateProps) {
  const [working, setWorking] = React.useState<boolean>(false);
  let formSchema: any = formSchemaBase;

  if (schema) {
    formSchema = formSchemaBase.and(schema);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization_name: "",
      ...defaultValues,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setWorking(true);

    // TODO: better handling errors.
    try {
      if (typeof onCreate === "function") {
        await onCreate(values);
      }
    } catch (e) {
      console.error(e);
    }

    setWorking(false);
  }

  return (
    <PageMode
      working={working}
      form={form}
      onSubmit={onSubmit}
      customFields={customFields}
    />
  );
}
