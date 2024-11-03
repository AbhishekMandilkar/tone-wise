"use client";
import {useState} from "react";
import {useUserRephrases} from "@/contexts/user-rephrases";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "../ui/sidebar";
import NavProjectsSkeleton from "../NavSkeletonLoader";
import {Input} from "../ui/input";
import {useDebouncedCallback} from "use-debounce";

const RephrasesList = () => {
  const { loading, rephrases, error, fetchData } = useUserRephrases();

  const [value, setValue] = useState("");
  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setValue(value);
      fetchData(value ? {query: value} : undefined);
    },
    // delay in ms
    600
  );



  return (
    <SidebarMenu className="space-y-2">
      <Input
        placeholder="Search..."
        onChange={(e) => debounced(e.target.value)}
        defaultValue={value}
      />
      {(() => {
        if (loading) {
          return <NavProjectsSkeleton />;
        }

        if (error) {
          return <div>Error: {error}</div>;
        }

        if (!rephrases.length) {
          return <div>No rephrases found</div>;
        }

        return rephrases.map((rephrase) => (
          <SidebarMenuItem key={rephrase.response}>
            <SidebarMenuButton asChild>
              <a href={rephrase.id}>
                <span>{rephrase.response}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ));
      })()}
    </SidebarMenu>
  );
};

export default RephrasesList;
