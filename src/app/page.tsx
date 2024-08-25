import LandingPage from "@/components/landing-page/landing-page";

export default async function Home() {
  return <LandingPage />;
  // return (
  // <Suspense
  //   fallback={
  //     <div className="h-full space-y-2">
  //       <Skeleton className="w-full h-20" />
  //       <div className="flex justify-around space-x-2">
  //         <Skeleton className="h-10 w-36" />
  //         <Skeleton className="h-10 w-36" />
  //         <Skeleton className="h-10 w-36" />
  //         <Skeleton className="h-10 w-36" />
  //       </div>
  //       <Skeleton className="h-10 w-full" />
  //     </div>
  //   }
  // >

  // </Suspense>
  // );
}
