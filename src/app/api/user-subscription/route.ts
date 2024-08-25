import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "No userId provided" }, { status: 400 });
  }

  const data: {
    subscriptionCode: string | undefined;
    isSubscribed: boolean;
    availableTrials: number;
  } = {
    subscriptionCode: undefined,
    isSubscribed: false,
    availableTrials: 0,
  };

  const user = await prisma.users.findFirst({
    where: {
      user_id: userId,
      is_deleted: false,
    },
    select: {
      user_id: true,
      is_subscribed: true,
      available_trials: true,
      subscriptions: {
        select: {
          code: true,
        },
      },
    },
  });

  data.subscriptionCode = user?.subscriptions?.code;
  data.isSubscribed = !!user?.is_subscribed;
  data.availableTrials = user?.available_trials || 0;

  if (!user?.user_id) {
    const userResponse = await prisma.users.create({
      data: {
        user_id: userId,
        is_subscribed: false,
        is_deleted: false,
        available_trials: 10,
      },
      select: {
        user_id: true,
        is_subscribed: true,
        available_trials: true,
        subscriptions: {
          select: {
            code: true,
          },
        },
      },
    });
    data.subscriptionCode = userResponse.subscriptions?.code;
    data.isSubscribed = !!userResponse.is_subscribed;
    data.availableTrials = userResponse.available_trials || 0;
  }

  return NextResponse.json(data);
}
