"use client";
import RephrasesList from "./RephrasesList/RephrasesList";
import TextInputWithTones from "./TextInputWithTones";
import { UserRephrasesProvider } from "@/contexts/user-rephrases";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import { useAvaiableTrials } from "@/contexts/user-subscription";
import TrailExhaustedBanner from "./trial-exhausted-banner";

export default function App() {
  const { isExhausted } = useAvaiableTrials();
  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        Perfect Your Message Tone in Seconds
      </h1>
      <div className="w-11/12  sm:w-5/6 md:w-5/6 lg:w-4/5 xl:w-2/5 space-y-6">
        {isExhausted && <TrailExhaustedBanner />}
        <TextInputWithTones isDisabled={isExhausted} />
      </div>
    </div>
  );
}
