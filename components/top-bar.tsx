"use client";
import { MainNav } from "@/components/main-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { CLAIMS } from "@/lib/utils";
import OrganizationSwitcher, { CreateOrganizationMode } from "@/sdk/components/organization-switcher";
import UserButton from "@/sdk/components/user-button";
import { Claims } from "@auth0/nextjs-auth0";

export default function TopBar({ user }: { user: Claims }) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="w-[200px]">
          <OrganizationSwitcher
            showBorder={false}
            user={user}
            organizationsClaim={CLAIMS.ORGANIZATIONS}
            subtitle="Basic (individual)"
            showAvatar={false}
            personalAccountLabel="Individual Account"
            createOrganizationMode={CreateOrganizationMode.Modal}
          />
        </div>

        <MainNav className="mx-6" />

        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />

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
        </div>
      </div>
    </div>
  );
}
