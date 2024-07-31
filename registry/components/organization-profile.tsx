"use client";

import clsx, { ClassValue } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import useOrganizations from "../hooks/use-organizations";
/**
 * Make sure to install the OrganizationInfo component from:
 *   - https://components.lab.auth0.com/docs/components/organization-info
 */
import OrganizationInfo from "./organization-info";
/**
 * Make sure to install the OrganizationMetadata component from:
 *   - https://components.lab.auth0.com/docs/components/organization-metadata
 */
import OrganizationMetadata from "./organization-metadata";
import OrganizationSSO from "./organization-sso";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KeyValueMap {
  [key: string]: any;
}

export default function OrganizationProfile({
  orgId,
  organization,
  connections,
  metadataSchema,
}: {
  orgId: string;
  organization?: KeyValueMap;
  connections?: KeyValueMap[];
  metadataSchema: any;
}) {
  const [currentItem, setCurrentItem] = useState("basic-info");
  const metadataDefaultValues = organization?.metadata;
  const {
    fetchOrganization,
    updateOrganization,
    fetchOrganizationConnections,
    deleteOrganizationConnection,
    startSelfServiceConfiguration,
    startSelfServiceConnectionUpdate,
  } = useOrganizations();

  const handleItemClick = (id: string) => () => {
    setCurrentItem(id);
  };

  return (
    <div className="max-w-screen-lg mx-auto gap-5 md:gap-5 lg:gap-5 justify-center p-2 flex flex-col w-full">
      <div className="md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Organization Settings
          </h2>
          <p className="text-muted-foreground">
            All the information about your organization.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <nav
              className={
                "flex space-x-1 lg:flex-col lg:space-x-0 lg:space-y-1 justify-center"
              }
            >
              {[
                { title: "General", id: "basic-info" },
                { title: "Preferences", id: "preferences" },
                { title: "SSO", id: "sso" },
              ].map((item) => (
                <button
                  onClick={handleItemClick(item.id)}
                  type="button"
                  key={item.id}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    currentItem === item.id
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start",
                    "px-3 py-1.5"
                  )}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </aside>
          <div className="flex-1">
            {currentItem === "basic-info" && (
              <OrganizationInfo
                organization={organization}
                orgId={orgId}
                onFetch={fetchOrganization}
                onSave={updateOrganization}
              />
            )}

            {currentItem === "preferences" && (
              <OrganizationMetadata
                orgId={orgId}
                schema={metadataSchema}
                metadata={metadataDefaultValues}
                onFetch={fetchOrganization}
                onSave={updateOrganization}
              />
            )}

            {currentItem === "sso" && (
              <OrganizationSSO
                orgId={orgId}
                connections={connections}
                onFetch={fetchOrganizationConnections}
                onDelete={deleteOrganizationConnection}
                onConfigure={startSelfServiceConfiguration}
                onUpdateConfiguration={startSelfServiceConnectionUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
