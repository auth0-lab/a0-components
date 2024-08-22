const fs = require("fs");

const data = {
  components: [
    {
      src: "./registry/components/basic-info-form.tsx",
      destination: "./app/docs/components/basic-info/data/code.ts",
    },
    {
      src: "./registry/components/mfa-enrollment.tsx",
      destination: "./app/docs/components/mfa-enrollment/data/code.ts",
    },
    {
      src: "./registry/components/organization-create.tsx",
      destination: "./app/docs/components/organization-creator/data/code.ts",
    },
    {
      src: "./registry/components/organization-switcher.tsx",
      destination: "./app/docs/components/organization-switcher/data/code.ts",
    },
    {
      src: "./registry/components/user-button.tsx",
      destination: "./app/docs/components/user-button/data/code.ts",
    },
    {
      src: "./registry/components/user-metadata.tsx",
      destination: "./app/docs/components/user-metadata/data/code.ts",
    },
    {
      src: "./registry/components/user-profile.tsx",
      destination: "./app/docs/components/user-profile/data/code.ts",
    },
    {
      src: "./registry/components/organization-metadata.tsx",
      destination: "./app/docs/components/organization-metadata/data/code.ts",
    },
    {
      src: "./registry/components/organization-info.tsx",
      destination: "./app/docs/components/organization-info/data/code.ts",
    },
    {
      src: "./registry/components/organization-profile.tsx",
      destination: "./app/docs/components/organization-profile/data/code.ts",
    },
    {
      src: "./registry/components/organization-sso.tsx",
      destination: "./app/docs/components/organization-sso/data/code.ts",
    },
  ],
  hooks: [
    {
      destination: "./app/docs/components/mfa-enrollment/data/hooks.ts",
      collection: [
        {
          name: "useMfaEnrollment",
          description: "A hook to manage MFA enrollments.",
          src: "./registry/hooks/use-mfa-enrollment.tsx",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-creator/data/hooks.ts",
      collection: [
        {
          name: "useOrganizations",
          description:
            "The hook can be used to create or update an organization.",
          src: "./registry/hooks/use-organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/user-metadata/data/hooks.ts",
      collection: [
        {
          name: "useUserMetadata",
          description: "A hook to update the user metadata.",
          src: "./registry/hooks/use-user-metadata.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-metadata/data/hooks.ts",
      collection: [
        {
          name: "useOrganizations",
          description:
            "The hook can be used to create or update an organization.",
          src: "./registry/hooks/use-organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-info/data/hooks.ts",
      collection: [
        {
          name: "useOrganizations",
          description:
            "The hook can be used to create or update an organization.",
          src: "./registry/hooks/use-organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-profile/data/hooks.ts",
      collection: [
        {
          name: "useOrganizations",
          description:
            "The hook can be used to create or update an organization.",
          src: "./registry/hooks/use-organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-sso/data/hooks.ts",
      collection: [
        {
          name: "useOrganizations",
          description:
            "The hook can be used to create or update an organization.",
          src: "./registry/hooks/use-organizations.ts",
        },
      ],
    },
  ],
  routers: [
    {
      destination: "./app/docs/components/mfa-enrollment/data/routers.ts",
      collection: [
        {
          name: "MFA router",
          description: "Handles list, update and create enrollments.",
          src: "./registry/routers/mfa.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-creator/data/routers.ts",
      collection: [
        {
          name: "Organizations router",
          description:
            "The route can be used to create or update an organization.",
          src: "./registry/routers/organizations.ts",
        },
      ],
    },
    {
      destination:
        "./app/docs/components/organization-metadata/data/routers.ts",
      collection: [
        {
          name: "Organizations router",
          description:
            "The route can be used to create or update an organization.",
          src: "./registry/routers/organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-info/data/routers.ts",
      collection: [
        {
          name: "Organizations router",
          description:
            "The route can be used to create or update an organization.",
          src: "./registry/routers/organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-profile/data/routers.ts",
      collection: [
        {
          name: "Organizations router",
          description:
            "The route can be used to create or update an organization.",
          src: "./registry/routers/organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/organization-sso/data/routers.ts",
      collection: [
        {
          name: "Organizations router",
          description:
            "The route can be used to create or update an organization.",
          src: "./registry/routers/organizations.ts",
        },
      ],
    },
    {
      destination: "./app/docs/components/user-metadata/data/routers.ts",
      collection: [
        {
          name: "UserMetadata router",
          description: "Handles user metadata update.",
          src: "./registry/routers/user-metadata.ts",
        },
      ],
    },
  ],
  helpers: [
    {
      destination: "./app/docs/rate-limit/data/helpers.ts",
      collection: [
        {
          name: "Rate Limiter",
          description: "Simple rate limiting based which uses lru-cache.",
          src: "./registry/routers/helpers/rate-limit.ts",
        },
      ],
    },
  ],
};

function main() {
  data.components.forEach((meta) => {
    const code = fs.readFileSync(meta.src, "utf8");

    const componentCode = {
      code,
    };

    fs.writeFileSync(
      meta.destination,
      `export const componentCode = ${JSON.stringify(componentCode, null, 2)};`
    );

    console.log(meta.src);
  });

  data.hooks.map((hookMeta) => {
    const hooks = [];
    hookMeta.collection.forEach((meta) => {
      const code = fs.readFileSync(meta.src, "utf8");

      hooks.push({
        name: meta.name,
        description: meta.description,
        code,
      });

      console.log(meta.src);
    });

    fs.writeFileSync(
      hookMeta.destination,
      `export const componentHooks = ${JSON.stringify(hooks, null, 2)};`
    );
  });

  data.routers.map((routerMeta) => {
    const routers = [];
    routerMeta.collection.forEach((meta) => {
      const code = fs.readFileSync(meta.src, "utf8");

      routers.push({
        name: meta.name,
        description: meta.description,
        code,
      });

      console.log(meta.src);
    });

    fs.writeFileSync(
      routerMeta.destination,
      `export const componentRoutes = ${JSON.stringify(routers, null, 2)};`
    );
  });

  data.helpers.map((helperMeta) => {
    const helpers = [];
    helperMeta.collection.forEach((meta) => {
      const code = fs.readFileSync(meta.src, "utf8");

      helpers.push({
        name: meta.name,
        description: meta.description,
        code,
      });

      console.log(meta.src);
    });

    fs.writeFileSync(
      helperMeta.destination,
      `export const helpers = ${JSON.stringify(helpers, null, 2)};`
    );
  });
}

main();
