/* eslint-disable @next/next/no-img-element */

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import {UserNav} from "./User";

export default async function Header() {
  const { isAuthenticated, getUser, } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="flex h-20 w-full shrink-0 items-center justify-between z-50">
      <Link href="#" className="mr-6 lg:flex" prefetch={false}>
        <h1 className="text-2xl font-bold">Tonewiser</h1>
        <span className="sr-only">Tonewiser</span>
      </Link>
      {(await isAuthenticated()) && (
        <UserNav user={user} />
      )}
    </header>
  );
}
