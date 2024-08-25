import {Badge} from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import { makeFirstLetterUpperCase, makeStringTitleCase } from "@/lib/utils";
import { rephrases } from "@prisma/client";
import { formatRelative } from "date-fns";
import { ArrowRightLeft, Clipboard, DeleteIcon, Trash2Icon } from "lucide-react";
import React, { useMemo } from "react";
import { toast } from "sonner";

const RephraseCard = (props: { rephrase: rephrases }) => {
  const { rephrase } = props;
  const { id, input_text, response, created_date, tone } = rephrase;
  const relativeDate = useMemo(
    () => makeFirstLetterUpperCase(formatRelative(created_date, new Date())),
    [created_date]
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast.success("Copied to clipboard");
  };

  return (
    <Card className=" max-w-[100%]  transition-all ease-in-out duration-100 space-y-0.5 border">
      <div className="bg-slate-50 p-2 rounded-t-lg border-b">
        <p className="max-w-[90%] text-gray-400 text-sm truncate">
          {input_text}
        </p>
      </div>
      <div className="p-2 rounded-b-lg text-base text-slate-900">
        {response}
      </div>
      <div className="p-2 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">{relativeDate}</p>
        <span className="flex items-center space-x-2">
          <Badge variant="outline" className="">
            {tone}
            <Separator orientation="vertical" />
            {/* <ArrowRightLeft className="h-4 w-4" /> */}
          </Badge>
          <div className="border rounded p-1 hover:bg-slate-100 hover:text-slate-900 cursor-pointer">
            <Clipboard className="h-4 w-4" />
          </div>
        </span>
      </div>
    </Card>
  );
};

export default RephraseCard;
