import { AuroraBackground } from "@/components/AuraBackground";
import MainApp from "@/components/MainApp";
import MainCTA from "@/components/MainCTA";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (isAuth) {
    return <MainApp />;
  }

  return  <MainCTA />;
}
