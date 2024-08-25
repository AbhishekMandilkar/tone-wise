"use client";
import RephrasesList from "./RephrasesList/RephrasesList";
import TextInputWithTones from "./TextInputWithTones";
import { UserRephrasesProvider } from "@/contexts/user-rephrases";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import {useAvaiableTrials} from "@/contexts/user-subscription";
import TrailExhaustedBanner from "./trial-exhausted-banner";

export default function App() {
  const { isExhausted } = useAvaiableTrials();
  return (
    <>
      <div className="flex flex-col h-screen items-center space-y-4 w-full">
        <div className="w-11/12  sm:w-5/6 md:w-5/6 lg:w-4/5 xl:w-2/5 space-y-6">
          {isExhausted && <TrailExhaustedBanner />}
          <TextInputWithTones isDisabled={isExhausted} />
        </div>
        <div className="w-11/12  sm:w-5/6 md:w-5/6 lg:w-4/5 xl:w-3/5 space-y-4 mt-48 overflow-y-scroll">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Recent Rephrases
          </h4>
          <RephrasesList />
        </div>
      </div>
    </>
  );
}
