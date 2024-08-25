import React from "react";
import { Skeleton } from "./ui/skeleton";

function MainSkeletonLoader() {
  return (
    <div className="h-full space-y-2">
      <Skeleton className="w-full h-20" />
      <div className="flex justify-around space-x-2">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default MainSkeletonLoader;
