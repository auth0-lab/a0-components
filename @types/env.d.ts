namespace NodeJS {
  interface ProcessEnv {
    /**
     * If configured use your custom domain.
     *
     * @example `mydomain.com` or `mydomain.us.auth0.com`
     * @readonly
     */
    readonly AUTH0_DOMAIN: string;
    /**
     * If using a custom domain, this is a required variable.
     *
     * @example `mytenant.us.auth0.com`
     * @readonly
     */
    readonly AUTH0_MANAGEMENT_DOMAIN?: string;
    /**
     * Your Auth0 application's Client ID.
     *
     * @example `I9f3bhfrp276gU5SEsU6itjkBvDKtQCa`
     * @readonly
     */
    readonly AUTH0_CLIENT_ID: string;
    /**
     * Set if a different CLIENT_ID should be used for management API calls.
     *
     * @default `AUTH0_CLIENT_ID`
     * @example `I9f3bhfrp276gU5SEsU6itjkBvDKtQCa`
     * @readonly
     */
    readonly AUTH0_MANAGEMENT_CLIENT_ID?: string;
    readonly AUTH0_CLIENT_SECRET: string;
    /**
     * Set if a different CLIENT_SECRET should be used for management API calls.
     *
     * @default `AUTH0_CLIENT_SECRET`
     * @readonly
     */
    readonly AUTH0_MANAGEMENT_CLIENT_SECRET?: string;
    /**
     * Create a key to encrypt session and transaction cookies.
     *
     * Use the following command (or any you desire):
     * `openssl rand -hex 32`
     *
     * @example `bdbf9d6f995a6c2bdf50c5f769f7e3a125c6b6f08eac07097f007adbb6dd140b`
     * @readonly
     */
    readonly AUTH0_SECRET: string;
    /**
     * If set, this connection will be used by default when creating organizations (if none is provided).
     *
     * @example `con_xxxxxxxxx`
     * @readonly
     */
    readonly AUTH0_ORGANIZATIONS_ENABLED_CONNECTION?: string;
    /**
     * Your application's base URL.
     *
     * @example `http://localhost:3000`
     * @readonly
     */
    readonly APP_BASE_URL: string;
  }
}
