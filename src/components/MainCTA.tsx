"use client";
import React from "react";
import TextInput from "./TextInput";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";
import { AuroraBackground } from "./AuraBackground";

function MainCTA() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center mx-auto p-24 md:p-72 space-y-14">
        <h2
          className="text-4xl font-semibold tracking-tighter sm:text-5xl [@media(max-width:280px)]:text-[2rem] text-center"
          data-testid="home-h2"
        >
          Compose. Adjust. Share.
        </h2>
        {isAuthenticated ? (
          <TextInput />
        ) : (
          <div className="flex flex-col">
            <LoginLink>
              <Button variant="default">Get started</Button>
            </LoginLink>
          </div>
        )}
      </div>
    </>
  );
}

export default MainCTA;
