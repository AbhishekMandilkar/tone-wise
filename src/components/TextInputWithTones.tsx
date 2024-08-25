"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ToneSelector from "./ToneSelector";
import useTextInputWithTone from "@/hooks/useTextInputWithTone";
import { BrushIcon, Loader2Icon, LoaderIcon } from "lucide-react";

export default function TextInputWithTones(props: {
  isDisabled?: boolean;
}) {
  const {isDisabled} = props;
  const { form, onSubmit, loading } = useTextInputWithTone();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={isDisabled}
                  placeholder="Write your message here…"
                  className="resize-none ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ToneSelector
                    disabled={isDisabled}
                    onChange={(tone) => {
                      field.onChange(tone);
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading || isDisabled}>
            {loading ? (
              <>
                <Loader2Icon className="w-5 h-5 mr-1 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <BrushIcon className="w-5 h-5 mr-1" />
                Generate
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
