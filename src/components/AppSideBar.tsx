import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "./ui/sidebar";
import NavProjectsSkeleton from "./NavSkeletonLoader";
import RephrasesList from "./RephrasesList/RephrasesList";
import { UserNav } from "./User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function AppSidebar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return null;
  }

  return (
    <>
      <div
        // show only for mobile devices
        className="md:hidden p-2"
      >
        <SidebarTrigger/>
      </div>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Rephrases</SidebarGroupLabel>
            <SidebarGroupContent>
              <React.Suspense fallback={<NavProjectsSkeleton />}>
                <RephrasesList />
              </React.Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <UserNav user={user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default AppSidebar;
