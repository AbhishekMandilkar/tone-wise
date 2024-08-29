"use client";
import useFetch from "@/hooks/useFetch";
import { rephrases } from "@prisma/client";
import React from "react";
import RephraseCard from "./component/rephrase-card";
import {useUserRephrases} from "@/contexts/user-rephrases";
import {Skeleton} from "../ui/skeleton";

const RephrasesList = () => {
  const { loading, rephrases, error } = useUserRephrases();
  if (loading)
    return (
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl animate-pulse" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    );

  return (
    <div className="grid  grid-cols-1 sm:grid-cols-3 gap-4">
      {rephrases.map((rephrase) => (
        <RephraseCard key={rephrase.id} rephrase={rephrase} />
      ))}
    </div>
  );
};

export default RephrasesList;
