import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

function useRequestHeaders() {
  const { user } = useKindeBrowserClient();

  return {
    "user-id": user?.id,
    "user-email": user?.email,
  };
}

export default useRequestHeaders;
