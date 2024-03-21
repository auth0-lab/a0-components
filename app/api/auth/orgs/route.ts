import { handleOrganizationCreation } from "@/sdk/routes/organizations";

export const POST = handleOrganizationCreation({
  enabled_connections: [
    {
      connection_id: process.env.ORGANIZATIONS_ENABLED_CONNECTION!,
      assign_membership_on_login: false,
    },
  ],
});
