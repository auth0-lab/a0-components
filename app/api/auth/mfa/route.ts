import { handleMFAFactorEnrollment, handleMFAFactorsList } from "@/registry/routers/mfa";

export const GET = handleMFAFactorsList();

export const POST = handleMFAFactorEnrollment();
