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
}: {
  onChange: (tone: string) => void;
  value: string;
}) {
  const toneList = useMemo(
    () => Object.values(Tones).map(makeStringTitleCase),
    []
  );
  return (
    <ToggleGroup
      type="single"
      className="flex justify-around transition-all ease-in-out duration-100"
      value={value}
      onValueChange={(value) => onChange(value)}
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
          <AnimatePresence>
            {value === tone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CheckIcon className="h-4 w-4 mr-2" />
              </motion.div>
            )}
          </AnimatePresence>
          {tone}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default ToneSelector;
