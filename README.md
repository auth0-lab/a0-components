# Auth0 Lab / UI Components

## Disclaimer

The UI components are an experimental [Auth0Lab](https://lab.auth0.com) library. They might not remain available or be incorporated into the Auth0 platform. Use of these components is without support and all questions should be directed to the open source [repository](https://github.com/auth0-lab/a0-components) or the [Auth0Lab discord](https://discord.gg/QGHxwDsbQQ).

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
AUTH0_SECRET='xxxxxxxxx'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://{TENANT_DOMAIN}'

# Web application client
AUTH0_CLIENT_ID='xxxxxxxxx'
AUTH0_CLIENT_SECRET='xxxxxxxxx'

# Auth0 Management API Client
AUTH0_CLIENT_ID_MGMT="xxxxxxxxx"
AUTH0_CLIENT_SECRET_MGMT="xxxxxxxxx"

# Default connection when creating organizations
ORGANIZATIONS_ENABLED_CONNECTION="con_xxxxxxxxx"
```

## License

Apache-2.0
