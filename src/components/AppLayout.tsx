import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CustomProviders from "./custom-providers/custom-providers";
import AppSidebar from "./AppSideBar";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <CustomProviders user={user}>
      <AppSidebar />
      {children}
    </CustomProviders>
  );
};

export default AppLayout;
