"use client";
import useFetch from "@/hooks/useFetch";
import { rephrases } from "@prisma/client";
import React from "react";
import RephraseCard from "./component/rephrase-card";
import {useUserRephrases} from "@/contexts/user-rephrases";

const RephrasesList = () => {
  const {loading, rephrases, error} = useUserRephrases();
  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {rephrases.map((rephrase) => (
        <RephraseCard key={rephrase.id} rephrase={rephrase} />
      ))}
    </div>
  );
};

export default RephrasesList;
