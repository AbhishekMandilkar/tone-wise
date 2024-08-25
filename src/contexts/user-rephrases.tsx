
'use client';
import useFetch from "@/hooks/useFetch";
import { rephrases } from "@prisma/client";
import React from "react";

const UserRephrasesContext = React.createContext<UserRephrasesContextValue>({
  rephrases: [],
  setRephrases: () => {},
  loading: false,
  error: null,
});

interface UserRephrasesContextValue {
  rephrases: rephrases[];
  setRephrases: React.Dispatch<React.SetStateAction<rephrases[]>>;
  loading: boolean;
  error: any;
}

export default UserRephrasesContext;

export const UserRephrasesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rephrases, setRephrases] = React.useState<rephrases[]>([]);

  const { loading, error } = useFetch<{ data: rephrases[] }>({
    url: "/api/rephrases",
    onComplete: (rephrases) => {
      setRephrases(rephrases?.data);
    },
  });

  return (
    <UserRephrasesContext.Provider
      value={{ rephrases, setRephrases, loading, error }}
    >
      {children}
    </UserRephrasesContext.Provider>
  );
};

export const useUserRephrases = () => {
  const context = React.useContext(UserRephrasesContext);
  if (context === undefined) {
    throw new Error("useUserRephrases must be used within a UserRephrasesProvider");
  }
  return context;
};
