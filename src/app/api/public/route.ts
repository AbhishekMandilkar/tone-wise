import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = { message: "Hello world", headers: req.cookies };

  return NextResponse.json({ data });
}
