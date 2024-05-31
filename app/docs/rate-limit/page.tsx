import Code from "@/components/www/code";
import { DocsLayout } from "@/components/www/layouts";
import PageLayout from "@/components/www/page-layout";

import { helpers } from "./data/helpers";

export default function Docs() {
  return (
    <DocsLayout>
      <PageLayout
        title="Rate Limit"
        description="A mechanism that limits request frequency/volume, preventing excessive use."
        experimental={false}
      >
        <p className="mb-3 leading-7">
          UI Components functionality are built on top of{" "}
          <a
            href="https://auth0.com/docs/api/management/v2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            Auth0 Management API
          </a>
          , which has rate limits based on subscription plans. Please refer to{" "}
          <a
            href="https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            Auth0 Rate Limits
          </a>{" "}
          for details and learn how to utilize them in your application.
        </p>
        <p className="mb-3 leading-7">
          The Reack Hooks and the NextJS Routers we provide have a basic
          built-in rate limit handling mechanism. You can use the helpers we
          provide to implement more advanced rate limit handling.
        </p>
        <h2
          className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          id="helpers"
        >
          <a
            className="font-medium underline underline-offset-4 subheading-anchor"
            aria-label="Link to section"
            href="#helpers"
          >
            <span className="icon icon-link"></span>
          </a>
          Helpers
        </h2>
        <div className=" mb-12">
          {helpers.map((helper, index) => (
            <div key={index}>
              <h3 className="font-heading mt-8 scroll-m-20 text-md font-semibold tracking-tight">
                {helper.name}
              </h3>
              <p>{helper.description}</p>
              <div className="flex flex-col gap-2 mt-8 h-[450px] overflow-y-auto max-w-[680px]">
                <Code language="bash" text={helper.code} />
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
    </DocsLayout>
  );
}
