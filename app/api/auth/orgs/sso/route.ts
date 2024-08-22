import { handleConnectionUpdate, handleSelfService } from "@/registry/routers/organizations";

export const POST = handleSelfService({
  clients_to_enable: [process.env.ORGANIZATIONS_CLIENT_TO_ENABLE!],
});

export const PUT = handleConnectionUpdate({
  clients_to_enable: [process.env.ORGANIZATIONS_CLIENT_TO_ENABLE!],
});
