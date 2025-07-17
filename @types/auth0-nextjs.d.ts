import "@auth0/nextjs-auth0/types";

declare module "@auth0/nextjs-auth0/types" {
  interface User {
    phone_number?: string;
    phone_verified?: boolean;
    sid?: string;
  }
}
