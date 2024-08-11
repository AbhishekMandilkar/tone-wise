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
import { AuroraBackground } from "@/components/AuraBackground";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

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
       <body className="h-screen mx-auto w-11/12 sm:w-3/6">
         <NextTopLoader color="#000" showSpinner />
         <Toaster position="bottom-center" />
         <div className={`flex flex-col flex-1 h-full`}>
           <Header />
           <main className="flex-1 h-full flex-col flex">{children}</main>
         </div>
       </body>
     </html>
   );
}
