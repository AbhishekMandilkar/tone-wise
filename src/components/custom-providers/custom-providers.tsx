"use client";
import { UserRephrasesProvider } from "@/contexts/user-rephrases";
import UserSubscriptionContext, {
  UserSubscriptionProvider,
} from "@/contexts/user-subscription";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import React from "react";

const CustomProviders = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: KindeUser;
}) => {
  return (
    <UserSubscriptionProvider user={user}>
      <UserRephrasesProvider>{children}</UserRephrasesProvider>
    </UserSubscriptionProvider>
  );
};

export default CustomProviders;
