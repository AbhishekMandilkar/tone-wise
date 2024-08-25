"use client";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";

function MainCTA() {
  return (
    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      <LoginLink>
        <Button variant="default">Get started</Button>
      </LoginLink>
    </div>
  );
}

export default MainCTA;
