import Code from "@/components/www/code";
import { DocsLayout } from "@/components/www/layouts";
import PageLayout from "@/components/www/page-layout";
import { DocTabs } from "@/components/www/tabs";

import { componentCode } from "./data/code";
import { componentDependencies } from "./data/dependencies";
import { componentHooks } from "./data/hooks";
import { componentRoutes } from "./data/routers";
import { componentUsage } from "./data/usage";
import { Example } from "./example";

export default function OrganizationInfo() {
  return (
    <DocsLayout>
      <PageLayout
        title="Organization Info"
        description="Displays essential organization details, including name and display name, providing a quick glance at organization information."
      >
        <DocTabs align="start" code={componentUsage}>
          <Example />
        </DocTabs>

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
          {componentRoutes.map((hook, index) => (
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
      </PageLayout>
    </DocsLayout>
  );
}
