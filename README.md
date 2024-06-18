# Auth0 Lab / UI Components

Auth0Lab UI components provide a solid foundation for developing robust and user-friendly identity-related features in applications. For more details, check out our [docs](https://components.lab.auth0.com/docs) site.

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

The code for the UI components, React hooks and NextJS routers can be found at [registry](https://github.com/auth0-lab/a0-components/tree/main/registry).

- [User Profile](#user-profile)
- [Basic Info](#basic-info)
- [User Metadata](#user-metadata)
- [MFA Enrollment](#mfa-enrollment)
- [User Button](#user-button)
- [Organization Switcher](#organization-switcher)
- [Organization Creator](#organization-creator)

### User Profile

Provides a detailed user profile with essential information, supporting MFA enrollment. For more info, visit the component [docs](https://components.lab.auth0.com/docs/components/user-profile).

<img src="https://cdn.auth0.com/website/labs/components/user-profile.png" width="700px">

#### Code Sample

```tsx
<UserProfile
  user={user}
  userMetadata={{
    address: "123 Fake st",
    job_title: "Designer",
    language: "es-AR",
  }}
  metadataSchema={z.object({
    address: z.string(),
    job_title: z.string(),
    language: z.enum(languages),
  })}
  factors={[
    {
      name: "sms",
      enabled: true,
      enrollmentId: "phone|xxxxxxxxxx",
    },
    { name: "push-notification", enabled: true },
    {
      name: "otp",
      enabled: true,
      enrollmentId: "totp|xxxxxxxxxx",
    },
    { name: "webauthn-roaming", enabled: true },
    { name: "webauthn-platform", enabled: true },
  ]}
/>
```

### Basic Info

Displays essential user details, including name and nickname, providing a quick glance at user information. For more info, visit the component [docs](https://components.lab.auth0.com/docs/components/basic-info).

<img src="https://cdn.auth0.com/website/labs/components/basic-info.png" width="700px">

#### Code Sample

```tsx
<BasicInfoForm user={user} />
```

### User Metadata

Displays and edits user metadata with schema validation. For more info, visit the component [docs](https://components.lab.auth0.com/docs/components/user-metadata).

<img src="https://cdn.auth0.com/website/labs/components/user-metadata.png" width="700px">

#### Code Sample

```tsx
<UserMetadataForm
  onSave={async () => {
    alert("Saved!");
  }}
  schema={z.object({
    address: z.string(),
    job_title: z.string(),
    language: z.enum(languages),
  })}
  defaultValues={{
    address: "123 Fake st",
    job_title: "Designer",
    language: "es-AR",
  }}
/>
```

### MFA Enrollment

Allows users to view, enroll, and manage multi-factor authentication (MFA) enrollments with ease. For more info, visit the component [docs](https://components.lab.auth0.com/docs/components/mfa-enrollment).

<img src="https://cdn.auth0.com/website/labs/components/mfa-enrollment.png" width="700px">

#### Code Sample

```tsx
<MFAEnrollment
  factors={factors}
  onFetch={async () => {
    return { factors, status: 200 };
  }}
  onCreate={async (factor: string) => {
    return { enrollment: { ticket_url: "https://auth0.com" }, status: 200 };
  }}
  onDelete={async (enrollmentId: string) => {
    return { status: 200 };
  }}
/>
```

### User Button

Offers a user menu for logged-in users, showing their info and allowing them to logout. For more info, visit the component [docs](https://components.lab.auth0.com/docs/components/user-button).

<img src="https://cdn.auth0.com/website/labs/components/user-button.png" width="700px">

#### Code Sample

```tsx
<UserButton user={user}>
  <DropdownMenu>
    <DropdownMenuGroup>
      <DropdownMenuItem>Theme</DropdownMenuItem>
      <DropdownMenuItem>
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenu>
</UserButton>
```

### Organization Switcher

Enables users to easily switch between different organizations or create new ones. For more info, visit the component [docs](https://components.lab.auth0.com/docs/components/organization-switcher).

<img src="https://cdn.auth0.com/website/labs/components/organization-switcher.png" width="700px">

#### Code Sample

```tsx
<OrganizationSwitcher
  createOrganizationUrl="/docs/components/organization-switcher"
  user={{
    given_name: "John",
    family_name: "Doe",
    nickname: "johndoe",
    name: "John Doe",
    email: "john.doe@acme.com",
  }}
  availableOrganizations={[
    {
      id: "org_xxxxxxxxxxx",
      name: "acme",
      display_name: "Acme",
      picture: "https://cdn.auth0.com/avatars/b.png",
    },
  ]}
  subtitle="Basic (individual)"
/>
```

### Organization Creator

Creates organizations quickly and easily, streamlining the process for admins and users. For more info, visit the component [docs](https://components.lab.auth0.com/docs/components/organization-creator).

<img src="https://cdn.auth0.com/website/labs/components/organization-creator.png" width="700px">

#### Code Sample

```tsx
<OrganizationCreate
  onCreate={async () => {
    alert("Created!");
    return { status: 200 };
  }}
  schema={z.object({
    plan: z.enum(["basic", "starter", "business"], {
      required_error: "You need to select a plan.",
    }),
  })}
  defaultValues={{
    plan: "basic",
  }}
  customFields={[
    ({ form }: any) => {
      return (
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Plan</FormLabel>
              <FormControl>
                <Select defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      );
    },
  ]}
/>
```

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
