import useFetch from "@/hooks/useFetch";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import React, { useState } from "react";

interface UserSubscriptionContextType {
  subscriptionCode: string | undefined;
  isSubscribed: boolean;
  availableTrials: number;
  isLimitExceeded: boolean;
}

const UserSubscriptionContext = React.createContext<{
  subscriptionCode: string | undefined;
  isSubscribed: boolean;
  availableTrials: number;
  decrementTrial: () => void;
} | null>(null);

export default UserSubscriptionContext;

export const UserSubscriptionProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: KindeUser;
}) => {
  const [data, setData] = useState<UserSubscriptionContextType>({
    subscriptionCode: undefined,
    isSubscribed: false,
    availableTrials: 0,
    isLimitExceeded: false,
  });
  const { loading } = useFetch<
    Omit<UserSubscriptionContextType, "decrementTrial">
  >({
    url: `/api/user-subscription?userId=${user.id}`,
    onComplete: (data) => {
      setData(data);
    },
  });

  if (loading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader2Icon className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <UserSubscriptionContext.Provider
      value={{
        subscriptionCode: data?.subscriptionCode,
        isSubscribed: !!data?.isSubscribed,
        availableTrials: data?.availableTrials || 0,
        decrementTrial: () => {
          setData((prev) => {
            return {
              ...prev,
              availableTrials: prev.availableTrials - 1,
            };
          });
        },
      }}
    >
      {children}
    </UserSubscriptionContext.Provider>
  );
};

export const useUserSubscription = () => {
  const context = React.useContext(UserSubscriptionContext);
  if (!context) {
    throw new Error(
      "useUserSubscription must be used within a UserSubscriptionProvider"
    );
  }
  return context;
};

export const useAvaiableTrials = () => {
  const context = React.useContext(UserSubscriptionContext);
  if (!context) {
    throw new Error(
      "useAvaiableTrials must be used within a UserSubscriptionProvider"
    );
  }
  return {
    availableTrials: context.availableTrials,
    isExhausted: !(context.availableTrials > 0),
  };
};

