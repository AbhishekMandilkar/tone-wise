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
      <div className="flex flex-col h-full items-center space-y-4 w-full">
        <div className="w-11/12  sm:w-5/6 md:w-5/6 lg:w-4/5 xl:w-2/5 space-y-6">
          {isExhausted && <TrailExhaustedBanner />}
          <TextInputWithTones isDisabled={isExhausted} />
        </div>
        <div className="w-11/12 sm:w-5/6 md:w-5/6 lg:w-4/5 space-y-4 overflow-y-auto max-h-[70vh]">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight sticky top-0 bg-white p-2 shadow-sm">
            Recent Rephrases
          </h4>
          <RephrasesList />
        </div>
      </div>
    </>
  );
}
