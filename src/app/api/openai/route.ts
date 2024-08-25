import { getUserSession } from "@/lib/api-utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // fetch the prompt and tone from the query params
    const { searchParams } = req.nextUrl;
    const user = await getUserSession(req);

    if (!user) {
      return NextResponse.error();
    }

    const prompt = searchParams.get("prompt");
    const tone = searchParams.get("tone");

    if (!prompt || !tone) {
      return NextResponse.json(
        { error: "Prompt and tone are required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Rewrite the following text to match the specified tone. Maintain the original meaning and key information, but adjust the language, style, and word choice to reflect the desired tone:\n Text: ${prompt}\nDesired tone: ${tone} \n Rewritten text:`,
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const text = completion.choices[0]?.message?.content || "";
    // update the user's available trials count
    const res = await addToDatabase({
      userId: user.id,
      prompt,
      tone,
      response: text,
    });
    return NextResponse.json({ text, res });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

// SERVICES

const addToDatabase = async (params: {
  userId: string;
  prompt: string;
  tone: string;
  response: string;
}) => {
  const { userId, prompt, tone, response } = params;
  try {
    const res = await prisma.$transaction([
      prisma.rephrases.create({
        data: {
          user_id: userId,
          input_text: prompt,
          tone,
          response,
        },
      }),
      prisma.users.update({
        where: {
          user_id: userId,
        },
        data: {
          available_trials: {
            increment: -1,
          },
        },
      }),
    ]);
    return res[0];
  } catch (error) {
    console.error("Error:", error);
    console.log("metadata", JSON.stringify(params));
  }
};
