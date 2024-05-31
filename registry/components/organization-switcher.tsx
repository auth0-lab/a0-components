"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface KeyValueMap {
  [key: string]: any;
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type Organization = {
  id: string;
  name: string;
  display_name: string;
  picture: string;
};

// Ref: https://auth0.com/docs/manage-users/organizations/configure-organizations/define-organization-behavior
enum OrganizationTypeOfUsers {
  Deny = "deny",
  Require = "require",
  Allow = "allow",
}

type SubtitleHandler = string | ((organization: any) => string);

interface OrganizationSwitcherProps extends PopoverTriggerProps {
  user: KeyValueMap;
  availableOrganizations: Organization[];
  loginUrl?: string;
  typeOfUsers?: OrganizationTypeOfUsers;
  subtitle?: SubtitleHandler;
  showBorder?: boolean;
  organizationsLabel?: string;
  personalAccountLabel?: string;
  addOrganizationLabel?: string;
  createOrganizationUrl?: string;
  returnTo?: string;
}

export default function OrganizationSwitcher({
  user,
  loginUrl = "/api/auth/login",
  typeOfUsers = OrganizationTypeOfUsers.Allow,
  subtitle,
  showBorder = true,
  availableOrganizations,
  organizationsLabel = "Organizations",
  personalAccountLabel = "Personal Account",
  addOrganizationLabel = "Add Organization",
  createOrganizationUrl,
  returnTo = "/",
}: OrganizationSwitcherProps) {
  const groups = [
    {
      label: personalAccountLabel,
      organizations: [
        {
          type: "personal",
          label: user.name,
          value: user.sub,
          picture: user.picture,
        },
      ],
    },
    {
      label: organizationsLabel,
      organizations: availableOrganizations.map((org: Organization) => ({
        type: "organization",
        label: org.display_name,
        value: org.id,
        picture: org.picture,
      })) as [],
    },
  ];

  if (typeOfUsers === "require") {
    groups.shift();
  }

  const [open, setOpen] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState<
    (typeof groups)[number]["organizations"][number]
  >(
    user.org_id
      ? groups[groups.length - 1].organizations.filter(
          (org) => org.value === user.org_id
        )[0]
      : groups[0].organizations[0]
  );

  return (
    typeOfUsers !== OrganizationTypeOfUsers.Deny && (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={`w-full justify-between pr-1 pl-2 ${
              !showBorder && "border-0"
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="text-sm">{selectedOrg.label}</span>
              {subtitle && (
                <span className="text-gray-500 font-light text-xs">
                  {typeof subtitle === "string"
                    ? subtitle
                    : subtitle(selectedOrg)}
                </span>
              )}
            </div>
            <ChevronsUpDown size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search ..." />
              <CommandEmpty>
                No {organizationsLabel.toLowerCase()} found.
              </CommandEmpty>
            </CommandList>

            <CommandList>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.organizations.map(
                    (org: {
                      value: string;
                      label: string;
                      picture: string;
                      type: string;
                    }) => (
                      <CommandItem
                        key={org.value}
                        onSelect={() => {
                          setSelectedOrg(org);
                          setOpen(false);
                        }}
                        className="text-sm"
                      >
                        <a
                          href={
                            org.type === "personal"
                              ? `${loginUrl}?returnTo=${returnTo}`
                              : `${loginUrl}?organization=${org.value}&returnTo=${returnTo}`
                          }
                          className="flex w-full flex items-center"
                        >
                          {org.label}
                          {selectedOrg.value === org.value && (
                            <Check className={"ml-auto h-4 w-4"} />
                          )}
                        </a>
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              ))}
            </CommandList>

            {createOrganizationUrl && (
              <>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <CommandItem>
                      <a
                        href={createOrganizationUrl}
                        className="flex items-center justify-between gap-3 w-full block text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {addOrganizationLabel}
                        <div className="RightSlot">+</div>
                      </a>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    )
  );
}
