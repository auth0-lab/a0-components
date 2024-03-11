"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { Check } from "react-feather";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";
import { Claims } from "@auth0/nextjs-auth0";

import Badge from "./badge";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type A0Organization = {
  id: string;
  name: string;
  display_name: string;
  picture: string;
};

// https://auth0.com/docs/manage-users/organizations/configure-organizations/define-organization-behavior
export enum OrganizationTypeOfUsers {
  Deny = "deny",
  Require = "require",
  Allow = "allow",
}

interface OrganizationSwitcherProps extends PopoverTriggerProps {
  user: Claims;
  organizationsClaim: string;
  loginUrl?: string;
  typeOfUsers?: OrganizationTypeOfUsers;
  subtitle?: string;

  showAvatar?: boolean;
  showBorder?: boolean;

  organizationsLabel?: string;
  personalAccountLabel?: string;
  addOrganizationLabel?: string;
  addOrganizationLink?: string;
}

export default function OrganizationSwitcher({
  className,
  user,
  organizationsClaim,
  loginUrl = "/api/auth/login",
  typeOfUsers = OrganizationTypeOfUsers.Allow,
  subtitle,
  showAvatar = true,
  showBorder = true,
  organizationsLabel = "Organizations",
  personalAccountLabel = "Personal Account",
  addOrganizationLabel = "Add Organization",
  addOrganizationLink,
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
      organizations: user[organizationsClaim].map((org: A0Organization) => ({
        label: org.display_name,
        value: org.id,
        picture: org.picture,
      })) as [],
    },
  ];

  if (typeOfUsers === "require") {
    groups.shift();
  }

  const pathname = usePathname();
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
            className={cn(
              `w-full justify-between pr-1 pl-2 ${!showBorder && "border-0"}`,
              className
            )}
          >
            {showAvatar && (
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={selectedOrg.picture}
                  alt={selectedOrg.label}
                />
              </Avatar>
            )}
            <div className="flex flex-col items-start">
              <span className="text-sm">{selectedOrg.label}</span>
              {subtitle && (
                <span className="text-gray-500 font-light text-xs">
                  {subtitle}
                </span>
              )}
            </div>
            <svg
              className="ml-auto h-4 w-4 shrink-0 opacity-50"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder={`Search ...`} />
              <CommandEmpty>
                No {organizationsLabel.toLowerCase()} found.
              </CommandEmpty>
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
                              ? `${loginUrl}?returnTo=${pathname}`
                              : `${loginUrl}?organization=${org.value}&returnTo=${pathname}`
                          }
                          className="flex w-full flex items-center"
                        >
                          {showAvatar && (
                            <Avatar className="mr-2 h-5 w-5">
                              <AvatarImage src={org.picture} alt={org.label} />
                            </Avatar>
                          )}
                          {org.label}
                          {selectedOrg.value === org.value && (
                            <Check className={cn("ml-auto h-4 w-4")} />
                          )}
                        </a>
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              ))}
            </CommandList>

            {addOrganizationLink && (
              <>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <CommandItem>
                      <a
                        href={addOrganizationLink}
                        className="flex items-center justify-between gap-3 w-full block text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {addOrganizationLabel}
                      </a>
                      <div className="RightSlot">+</div>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </>
            )}

            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <Badge />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  );
}
