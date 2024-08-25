import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useRequestHeaders from "./useRequestHeaders";
import {rephrases} from "@prisma/client";
import {useUserRephrases} from "@/contexts/user-rephrases";

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
  const {setRephrases} = useUserRephrases();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const { text, tone } = data;
    setLoading(true);
    const response = await axios.get<{
      text: string;
      res: rephrases;
    }>(`/api/openai?prompt=${text}&tone=${tone}`);
    setRephrases(prev => [response.data.res, ...prev, ]);
    setLoading(false);
  }
  return {
    form,
    onSubmit,
    loading,
  };
}

export default useTextInputWithTone;
