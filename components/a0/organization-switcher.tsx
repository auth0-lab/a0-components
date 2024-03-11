"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

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
import { A0Organization } from "@/lib/a0/lib";
import { cn } from "@/lib/utils";
import { Claims } from "@auth0/nextjs-auth0";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import Badge from "./badge";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

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
            className={cn("w-[200px] justify-between pr-1 pl-2", className)}
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
                <span className="text-neutral-400 font-light text-xs">
                  {subtitle}
                </span>
              )}
            </div>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                          className="flex w-full"
                        >
                          <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage src={org.picture} alt={org.label} />
                          </Avatar>
                          {org.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedOrg.value === org.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
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
