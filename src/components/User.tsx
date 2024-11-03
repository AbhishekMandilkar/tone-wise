"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserSubscription } from "@/contexts/user-subscription";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function UserNav(props: { user: KindeUser | null }) {
  const { user } = props;
  const userSubscription = useUserSubscription();
  const availableTrials = userSubscription.availableTrials;
  const isSubscribed = userSubscription.isSubscribed;
  const avatar =
    user?.picture ||
    `${user?.given_name?.[0]}
              ${user?.family_name?.[0]}`;
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const Icon = isDark ? MoonIcon : SunIcon;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="relative flex justify-start items-center cursor-pointer">
          <Avatar className="h-10 w-10 border-2 border-border">
            <AvatarImage src={user?.picture as string} alt={avatar} />
            <AvatarFallback>
              {user?.given_name?.[0]}
              {user?.family_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 ml-2">
            <p className="text-sm font-medium leading-none">
              {user?.given_name + " " + user?.family_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-popper-anchor-width]"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Available trials:
            <DropdownMenuShortcut>{availableTrials} / 10</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            Dark mode
            <DropdownMenuShortcut>
              <Icon className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutLink>
          <DropdownMenuItem className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
