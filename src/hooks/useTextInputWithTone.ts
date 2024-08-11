import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  text: z
    .string()
    .min(10, {
      message: "Text must be at least 10 characters.",
    })
    .max(200, {
      message: "Text must not be longer than 200 characters.",
    }),
  tone: z.string({
    required_error: "Tone is required",
  }),
});

function useTextInputWithTone() {
  const navigation = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    navigation.push("/tone?prompt=" + data.text + `&tone=${data.tone}`);
  }
  return {
    form,
    onSubmit,
  };
}

export default useTextInputWithTone;
