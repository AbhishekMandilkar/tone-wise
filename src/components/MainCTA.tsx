"use client";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";

function MainCTA() {
  return (
    <div className="h-full flex flex-col items-center space-y-5 pt-[20%]">
      <h2 className="text-6xl font-semibold" data-testid="home-h2">
        Compose. Adjust. Share.
      </h2>
      <LoginLink>
        <Button variant="default">Get started</Button>
      </LoginLink>
    </div>
  );
}

export default MainCTA;
