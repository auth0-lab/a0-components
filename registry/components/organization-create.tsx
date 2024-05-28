"use client";

import { PostOrganizationsRequest } from "auth0";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export type OnPostOrganizationCreationProps = PostOrganizationsRequest & {
  id: string;
};

type OrganizationCreateProps = {
  triggerLabel?: string;
  customFields?: any[];
  schema?: any;
  defaultValues?: any;
  onPostOrganizationCreation?: (
    organization: OnPostOrganizationCreationProps
  ) => Promise<void>;
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

type DialogModeProps = OrganizationCreateProps &
  Omit<PageModeProps, "customFields">;

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

function DialogMode({
  triggerLabel,
  form,
  working,
  customFields,
  onSubmit,
}: DialogModeProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-between gap-3 w-full block text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          {triggerLabel}
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

        <OrganizationForm
          form={form}
          onSubmit={onSubmit}
          customFields={customFields}
        >
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
        </OrganizationForm>
      </DialogContent>
    </Dialog>
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
                {working && <Loader2 size={17} className="mr-2 animate-spin" />}
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
  triggerLabel,
  customFields,
  defaultValues,
  schema,
  onPostOrganizationCreation,
}: OrganizationCreateProps) {
  const router = useRouter();
  const pathname = usePathname();
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

    const res = await fetch("/api/auth/orgs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: values.organization_name }),
    });
    const organization = (await res.json()) as OnPostOrganizationCreationProps;

    // TODO: better handling errors.
    try {
      if (onPostOrganizationCreation) {
        await onPostOrganizationCreation(organization);
      }
    } catch (e) {
      console.error(e);
    }

    return router.push(
      `/api/auth/login?organization=${organization.id}&returnTo=${pathname}`
    );
  }

  return triggerLabel ? (
    <DialogMode
      triggerLabel={triggerLabel}
      working={working}
      form={form}
      onSubmit={onSubmit}
    />
  ) : (
    <PageMode
      working={working}
      form={form}
      onSubmit={onSubmit}
      customFields={customFields}
    />
  );
}
