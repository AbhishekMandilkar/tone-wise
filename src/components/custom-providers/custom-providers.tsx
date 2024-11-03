"use client";
import { UserRephrasesProvider } from "@/contexts/user-rephrases";
import UserSubscriptionContext, {
  UserSubscriptionProvider,
} from "@/contexts/user-subscription";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { ThemeProvider } from "./theme-provider";

const CustomProviders = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: KindeUser;
}) => {
  return (
    <ThemeProvider
      attribute="class"
            defaultTheme="system"
    >
      <UserSubscriptionProvider user={user}>
        <UserRephrasesProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </UserRephrasesProvider>
      </UserSubscriptionProvider>
    </ThemeProvider>
  );
};

export default CustomProviders;
