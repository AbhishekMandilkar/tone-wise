"use client";
import React, { useMemo } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tones } from "@/constants/tones";
import { makeStringTitleCase } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function ToneSelector({
  onChange,
  value,
  disabled,
}: {
  onChange: (tone: string) => void;
  value: string;
  disabled?: boolean;
}) {
  const toneList = useMemo(
    () => Object.values(Tones).map(makeStringTitleCase),
    []
  );
  return (
    <ToggleGroup
      type="single"
      className="flex justify-around transition-all ease-in-out duration-100 flex-wrap"
      value={value}
      onValueChange={(value) => onChange(value)}
      disabled={disabled}
    >
      {toneList.map((tone) => (
        <ToggleGroupItem
          key={tone}
          variant="outline"
          value={tone}
          aria-label={`Toggle ${tone}`}
          onSelect={(value) => console.log(value)}
          className="flex-1 transition-[width] ease-in-out duration-100"
        >
          <>{value === tone && <CheckIcon className="h-4 w-4 mr-2" />}</>
          {tone}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default ToneSelector;
