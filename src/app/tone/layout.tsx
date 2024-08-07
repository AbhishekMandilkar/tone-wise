import React, { Suspense } from "react";

function layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

export default layout;
