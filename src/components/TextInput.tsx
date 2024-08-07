"use client";

import { CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TextInput() {
  const [value, setValue] = useState("");
  const navigation = useRouter();

  const onSubmit = (text: string) => {
    console.log(text);
    navigation.push("/tone?prompt=" + text + "&tone=friendly");
  };
  const isTextEmpty = value.length === 0;
  return (
    <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring self-stretch">
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Compose your content here…"
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center p-3 pt-0">
        <Button
          type="submit"
          size="sm"
          className="ml-auto gap-1.5"
          onClick={() => onSubmit(value)}
          asChild
          disabled={isTextEmpty}
          variant={isTextEmpty ? 'secondary' : 'default'}
        >
          <Link href={`/tone?prompt=${value}&tone=friendly`} prefetch={false}
             className={isTextEmpty ? 'pointer-events-none' : ''} 
             aria-disabled={isTextEmpty} 
             tabIndex={isTextEmpty ? -1 : undefined}
          
          >
            Rephrase
            <CornerDownLeft className="size-3.5" />
          </Link>
        </Button>
      </div>
    </form>
  );
}
