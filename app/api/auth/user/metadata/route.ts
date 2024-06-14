import {
  handleUserMetadataFetch,
  handleUserMetadataUpdate,
} from "@/registry/routers/user-metadata";

export const GET = handleUserMetadataFetch();

export const PUT = handleUserMetadataUpdate();
