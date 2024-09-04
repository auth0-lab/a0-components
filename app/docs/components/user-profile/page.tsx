import { AlertCircle } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Code from "@/components/www/code";
import { DocsLayout } from "@/components/www/layouts";
import PageLayout from "@/components/www/page-layout";
import { DocTabs } from "@/components/www/tabs";

import { componentHooks as mfaHooks } from "../mfa-enrollment/data/hooks";
import { componentRoutes as mfaRoutes } from "../mfa-enrollment/data/routers";
import { componentHooks as metadataHooks } from "../user-metadata/data/hooks";
import { componentRoutes as metadataRoutes } from "../user-metadata/data/routers";
import { componentHooks as sessionsHooks } from "../user-sessions/data/hooks";
import { componentRoutes as sessionsRoutes } from "../user-sessions/data/routers";
import { componentCode } from "./data/code";
import { componentDependencies } from "./data/dependencies";
import { componentUsage } from "./data/usage";
import { Example } from "./example";

const componentHooks = [...metadataHooks, ...mfaHooks, ...sessionsHooks];
const componentRoutes = [...metadataRoutes, ...mfaRoutes, ...sessionsRoutes];
export default function UserProfile() {
  return (
    <DocsLayout>
      <PageLayout
        title="User Profile"
        description="Provides a detailed user profile with essential information, supporting MFA enrollment."
      >
        <DocTabs align="start" code={componentUsage}>
          <Example />
        </DocTabs>

        <Alert variant="warning" className="mb-10">
          <AlertCircle className="h-4 w-4 mt-1" />
          <AlertTitle className="mb-3 mt-1">Important</AlertTitle>
          <AlertDescription className="text-md">
            To make the &quot;Sign out&quot; button work for{" "}
            <span className="font-bold">User Sessions</span> section, the
            implementation of{" "}
            <a
              href="https://auth0.com/docs/authenticate/login/logout/back-channel-logout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              OIDC Back-channel Logout
            </a>{" "}
            is required. Check the{" "}
            <Link
              href="/docs/components/user-sessions"
              className="text-blue-700 hover:underline"
            >
              User Sessions component
            </Link>{" "}
            documentation page for more information.
          </AlertDescription>
        </Alert>

        <h2
          className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
          id="installation"
        >
          <a
            className="font-medium underline underline-offset-4 subheading-anchor"
            aria-label="Link to section"
            href="#installation"
          >
            <span className="icon icon-link"></span>
          </a>
          Installation
        </h2>

        <div className="steps mb-12 ml-4 border-l pl-8 [counter-reset:step]">
          <h3 className="font-heading mt-8 scroll-m-20 text-md font-semibold tracking-tight">
            Install the following dependencies:
          </h3>

          <div className="flex flex-col gap-2 mt-8">
            {componentDependencies.map((dependency, index) => (
              <Code key={index} language="bash" text={dependency} />
            ))}
          </div>

          <h3 className="font-heading mt-8 scroll-m-20 text-md font-semibold tracking-tight">
            Copy and paste the following code into your project.
          </h3>

          <div className="flex flex-col gap-2 mt-8 h-[450px] overflow-y-auto max-w-[680px]">
            <Code text={componentCode.code} />
          </div>

          <h3 className="font-heading mt-8 scroll-m-20 text-md font-semibold tracking-tight">
            Component behavior
          </h3>

          <div className="flex flex-col gap-2 mt-8 overflow-y-auto max-w-[680px]">
            <p className="text-md text-muted-foreground text-gray-500">
              <Balancer>
                By design, our components provide basic behavior without making
                any requests to the Auth0 Management API. To help you implement
                the full feature, we&apos;ve also included{" "}
                <a
                  href="#react-hooks"
                  className="text-blue-700 hover:underline"
                >
                  React Hooks
                </a>{" "}
                and{" "}
                <a
                  href="#nextjs-routers"
                  className="text-blue-700 hover:underline"
                >
                  NextJS routers
                </a>{" "}
                for calling and proxying the{" "}
                <a
                  href="https://auth0.com/docs/api/management/v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Auth0 Management API
                </a>
                .
              </Balancer>
            </p>
          </div>

          <h3 className="font-heading mt-8 scroll-m-20 text-md font-semibold tracking-tight">
            Update the import paths to match your project setup.
          </h3>
        </div>

        <h2
          className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
          id="react-hooks"
        >
          <a
            className="font-medium underline underline-offset-4 subheading-anchor"
            aria-label="Link to section"
            href="#react-hooks"
          >
            <span className="icon icon-link"></span>
          </a>
          React Hooks
        </h2>

        <div className=" mb-12">
          {componentHooks.map((hook, index) => (
            <div key={index}>
              <h3 className="font-heading mt-8 scroll-m-20 text-md font-semibold tracking-tight">
                {hook.name}
              </h3>
              <p>{hook.description}</p>
              <div className="flex flex-col gap-2 mt-8 h-[450px] overflow-y-auto max-w-[680px]">
                <Code language="bash" text={hook.code} />
              </div>
            </div>
          ))}
        </div>

        <h2
          className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
          id="nextjs-routers"
        >
          <a
            className="font-medium underline underline-offset-4 subheading-anchor"
            aria-label="Link to section"
            href="#nextjs-routers"
          >
            <span className="icon icon-link"></span>
          </a>
          NextJS routers
        </h2>

        <div className=" mb-12">
          {componentRoutes.map((route, index) => (
            <div key={index}>
              <h3 className="font-heading mt-8 scroll-m-20 text-md font-semibold tracking-tight">
                {route.name}
              </h3>
              <p>{route.description}</p>
              <div className="flex flex-col gap-2 mt-8 h-[450px] overflow-y-auto max-w-[680px]">
                <Code language="bash" text={route.code} />
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
    </DocsLayout>
  );
}
