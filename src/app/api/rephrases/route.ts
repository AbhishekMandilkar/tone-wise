import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {PrismaClient, rephrases} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const { getUser, isAuthenticated } = getKindeServerSession();
  
    if (!(await isAuthenticated())) {
      return new Response("Unauthorized", { status: 401 });
    }
  
    const user = await getUser();
    const userId = user?.id;

    const data = await prisma.rephrases.findMany({
      where: {
        user_id: userId,
        is_deleted: false,
      },
      orderBy: {
        created_date: "desc",
      },
    });
  
    return NextResponse.json({ data });
  }

  export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { id, input_text, tone, response, is_deleted } = body;
  
    if (!id) {
      return NextResponse.json({ message: 'Missing id in request body' }, { status: 400 });
    }
  
    try {
      const updateData: any = {};
  
      if (input_text !== undefined) updateData.input_text = input_text;
      if (tone !== undefined) updateData.tone = tone;
      if (response !== undefined) updateData.response = response;
      if (is_deleted !== undefined) updateData.is_deleted = is_deleted;
  
      if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'No update data provided' }, { status: 400 });
      }
  
      const updatedRephrase = await prisma.rephrases.update({
        where: { id },
        data: updateData,
      });
  
      return NextResponse.json(updatedRephrase);
    } catch (error) {
      console.error('Error updating model rephrase:', error);
      return NextResponse.json({ message: 'Error updating model rephrase', error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }