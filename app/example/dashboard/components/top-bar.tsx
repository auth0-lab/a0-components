"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { CLAIMS } from "@/lib/utils";
import OrganizationSwitcher from "@/registry/components/organization-switcher";
import UserButton from "@/registry/components/user-button";
import { Claims } from "@auth0/nextjs-auth0";

import { MainNav } from "./main-nav";

export default function TopBar({ user }: { user: Claims }) {
  const [orgsDot, setOrgsDot] = useState(true);
  const [userDot, setUserDot] = useState(true);

  function handleOrgsDot() {
    setOrgsDot(false);
  }

  function handleUserDot() {
    setUserDot(false);
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="w-[200px] relative" onPointerDown={handleOrgsDot}>
          {orgsDot && (
            <span className="absolute flex h-3 w-3 left-0 mr-5 mt-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          )}

          <OrganizationSwitcher
            returnTo="/example/dashboard"
            showBorder={false}
            user={user}
            availableOrganizations={user[CLAIMS.ORGANIZATIONS] || []}
            subtitle="Basic (individual)"
            personalAccountLabel="Individual Account"
            createOrganizationUrl="/example/create-organization"
            addOrganizationLabel="Create Organization"
          />
        </div>

        <MainNav className="mx-6" />

        <div
          className="ml-auto flex items-center relative"
          onPointerDown={handleUserDot}
        >
          {userDot && (
            <span className="absolute flex h-3 w-3 right-0 -mt-6 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          )}

          <UserButton user={user}>
            <DropdownMenu>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <a href="/example/user-profile">
                  <DropdownMenuItem>
                    <span>Profile</span>
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </a>
              </DropdownMenuGroup>
            </DropdownMenu>
          </UserButton>
        </div>
      </div>
    </div>
  );
}
