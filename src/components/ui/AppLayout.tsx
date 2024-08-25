import React from "react";
import Header from "../Header";
import { UserNav } from "../User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CustomProviders from "../custom-providers/custom-providers";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <CustomProviders user={user}>
      <Header right={<UserNav user={user} />} />
      {children}
    </CustomProviders>
  );
};

export default AppLayout;
