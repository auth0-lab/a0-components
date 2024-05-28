"use client";

import { z } from "zod";

import OrganizationCreate, {
  OnPostOrganizationCreationProps,
} from "@/registry/components/organization-create";

import { PlanPicker } from "./plan-picker";

export function CreateOrganizationPage() {
  async function handleOnPostOrganizationCreation(
    organization: OnPostOrganizationCreationProps
  ) {
    console.log(organization);
  }

  return (
    <OrganizationCreate
      onPostOrganizationCreation={handleOnPostOrganizationCreation}
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
          return <PlanPicker form={form} />;
        },
      ]}
    ></OrganizationCreate>
  );
}
