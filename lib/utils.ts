import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CLAIMS = {
  ORGANIZATIONS: "https://sample.com/claims/organizations", // organizations that user belongs to
  USER_METADATA: "https://sample.com/claims/user_metadata", // user metadata
};
