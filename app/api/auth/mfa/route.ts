import {
  handleMFADeleteEnrollment,
  handleMFAFactorEnrollment,
  handleMFAFactorsList,
} from "@/registry/routes/mfa";

export const GET = handleMFAFactorsList();

export const POST = handleMFAFactorEnrollment();
