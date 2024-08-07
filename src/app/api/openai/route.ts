import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const config = {
  runtime: "edge",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: NextRequest) {
  try {
    // fetch the prompt and tone from the query params
    const { searchParams } = req.nextUrl;
    const prompt = searchParams.get("prompt");
    const tone = searchParams.get("tone");

    if (!prompt || !tone) {
      return NextResponse.json({ error: "Prompt and tone are required" }, { status: 400 });
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

    const text = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 });
  }
}