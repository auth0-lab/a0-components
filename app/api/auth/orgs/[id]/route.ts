import { handleFetchOrganization, handleOrganizationUpdate } from "@/registry/routers/organizations";

export const GET = handleFetchOrganization();

export const PUT = handleOrganizationUpdate();
