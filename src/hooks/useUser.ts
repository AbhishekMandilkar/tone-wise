import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

interface User {
  id: string;
  email: string | null;
  avatar: string;
  firstName: string;
  lastName: string;
}

const useUser = (): User => {
  const { user } = useKindeBrowserClient();

  if (!user) {
    return {
      id: "",
      email: "",
      avatar: "",
      firstName: "",
      lastName: "",
    };
  }

  return {
    id: user?.id,
    email: user?.email,
    firstName: user?.given_name ?? "",
    lastName: user?.family_name ?? "",
    avatar: user?.picture ?? "",
  };
};

export default useUser;
