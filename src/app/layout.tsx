import Header from "@/components/Header";
import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import CurrentBreakPoint from "@/components/CurrentBreakPoint";
import { isDev } from "@/lib/utils";

export const metadata = {
  title: "Tonewise",
};

const poppins = Poppins({
  style: "normal",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen mx-auto">
        <NextTopLoader color="#000" showSpinner />
        <Toaster position="bottom-center" />
        <div className={`flex flex-col flex-1 h-full`}>
          <main className="flex-1 h-full flex-col flex items-center">
            {children}
          </main>
          {isDev && <CurrentBreakPoint />}
        </div>
      </body>
    </html>
  );
}
