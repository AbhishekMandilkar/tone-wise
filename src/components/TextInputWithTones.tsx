"use client";


import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useRouter} from "next/navigation";


import {
  Form,
  FormControl, FormField,
  FormItem, FormMessage
} from "@/components/ui/form";
import ToneSelector from "./ToneSelector";
import useTextInputWithTone from "@/hooks/useTextInputWithTone";



export default function TextInputWithTones() {
  const {form, onSubmit} = useTextInputWithTone();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-stretch"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Compose your content here…"
                  className="resize-none ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToneSelector
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
