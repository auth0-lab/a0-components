import { LogOut } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Claims } from "@auth0/nextjs-auth0";

import { getAvatarFallback } from "../helpers";

export default function UserButton({
  user,
  children,
  logoutUrl = "/api/auth/logout",
}: {
  user: Claims;
  children?: React.ReactNode;
  logoutUrl?: string;
}) {
  const picture = user.picture;
  const name = user.name;
  const email = user.email;
  const resolvedLogoutUrl = logoutUrl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={picture} alt={picture} />
            <AvatarFallback>{getAvatarFallback(user)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={picture} alt={picture} />
              <AvatarFallback>{getAvatarFallback(user)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        {children && (
          <>
            <DropdownMenuSeparator />
            {children}
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem>
          <Link href={resolvedLogoutUrl} className="flex gap-2 items-center">
            <LogOut size={15} />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
