# Auth0 Lab / UI Components

Auth0Lab UI components provide a solid foundation for developing robust and user-friendly identity-related features in applications.

## Important

The UI components provided from the experimental [Auth0Lab](https://lab.auth0.com) library may not remain available or be incorporated into the Auth0 platform. The Auth0Lab UI components are community supported and are not directly supported by Auth0 by Okta. All questions should be directed to the open source [repository](https://github.com/auth0-lab/a0-components) or the [Auth0Lab discord](https://discord.gg/QGHxwDsbQQ).

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Components

The code for the UI components, React hooks and NextJS routers can be found at [registry](https://github.com/auth0-lab/a0-components/tree/main/registry). Following the list of the components:

- [User Profile](https://github.com/auth0-lab/a0-components/blob/main/registry/components/user-profile.tsx)
- [User Button](https://github.com/auth0-lab/a0-components/blob/main/registry/components/user-button.tsx)
- [User Metadata](https://github.com/auth0-lab/a0-components/blob/main/registry/components/user-metadata.tsx)
- [Basic Info](https://github.com/auth0-lab/a0-components/blob/main/registry/components/basic-info-form.tsx)
- [MFA Enrollment](https://github.com/auth0-lab/a0-components/blob/main/registry/components/mfa-enrollment.tsx)
- [Organization Switcher](https://github.com/auth0-lab/a0-components/blob/main/registry/components/organization-switcher.tsx)
- [Organization Creator](https://github.com/auth0-lab/a0-components/blob/main/registry/components/organization-create.tsx)

## Live Example

For running the live example, you'll need to have the following values in your `.env.local`.

```bash
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
# Auth0 Management API Client ID
AUTH0_CLIENT_ID_MGMT="YOUR_AUTH0_MGMT_CLIENT_ID"
# Auth0 Management API Client SECRET
AUTH0_CLIENT_SECRET_MGMT="YOUR_AUTH0_MGMT_CLIENT_SECRET"
# Default connection when creating organizations
ORGANIZATIONS_ENABLED_CONNECTION="con_xxxxxxxxx"
# Token for LRU cache
LRU_CACHE_TOKEN="CACHE_TOKEN"
```

You can execute the following command to generate a suitable string for the `AUTH0_SECRET` value:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

## License

Apache-2.0
