import { handleConnectionUpdate, handleSelfService } from "@/registry/routers/organizations";

export const POST = handleSelfService;

export const PUT = handleConnectionUpdate;
