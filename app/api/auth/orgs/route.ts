import { handleOrganizationCreation } from "@/components/a0-routes/organizations";

export const POST = handleOrganizationCreation({
  enabled_connections: process.env
    .ORGANIZATIONS_ENABLED_CONNECTIONS!.split(",")
    .map((connId) => ({
      connection_id: connId.trim(),
      assign_membership_on_login: false,
    })),
});
