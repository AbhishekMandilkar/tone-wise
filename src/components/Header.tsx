/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default async function Header({ right }: { right?: React.ReactNode }) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between z-50 w-11/12  sm:w-5/6 md:w-5/6 lg:w-4/5 xl:w-2/5">
      <Link href="#" className="mr-6 lg:flex" prefetch={false}>
        <h1 className="text-2xl font-bold">Tonewiser</h1>
        <span className="sr-only">Tonewiser</span>
      </Link>
      {right}
    </header>
  );
}
