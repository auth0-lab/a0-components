"use client";

import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";

import OrganizationCreate, {
  OrganizationCreationResponse,
} from "@/registry/components/organization-create";
import useOrganizations from "@/registry/hooks/use-organizations";

import { PlanPicker } from "./plan-picker";

export function CreateOrganizationPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { createOrganization } = useOrganizations();

  async function handleOnCreate(organization: OrganizationCreationResponse) {
    const response = await createOrganization(organization);

    if (response.organization) {
      router.push(
        `/api/auth/login?organization=${response.organization.id}&returnTo=${pathname}`
      );
    }

    return response;
  }

  return (
    <OrganizationCreate
      onCreate={handleOnCreate}
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
