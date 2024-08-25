import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export const getUserSession = async (req: NextRequest) => {
  const session = await getKindeServerSession(req);
  const user = await session.getUser();
  return user;
};
