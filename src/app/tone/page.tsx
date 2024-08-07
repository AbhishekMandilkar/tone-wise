"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import usePostFetch from "@/hooks/usePost";
import fetcher from "@/lib/fetcher";
import {
  ChevronLeft,
  Clipboard,
  ClipboardCopyIcon,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

function Page() {
  const queryParams = useSearchParams();
  const prompt = queryParams.get("prompt");
  const tone = queryParams.get("tone");
  const { data, error, loading } = useFetch<{ text: string }>(
    `/api/openai?prompt=${prompt}&tone=${tone}`
  );
  console.log(loading);
  const responseString = data?.text as string;

  if (loading) {
    return (
      <div className="flex flex-col border-2  h-full w-screen flex-1  justify-center items-center"></div>
    );
  }

  return (
    <div className="flex flex-col md:px-6 h-full items-center justify-center mt-[-100px]">
      <div className=" bg-white shadow-md p-6 rounded-lg flex flex-col w-96">
        <>
          {loading || !responseString ? (
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex justify-end space-x-2">
                <Skeleton className="h-[20px] w-[50px] rounded-sm" />
                <Skeleton className="h-[20px] w-[50px] rounded-sm" />
              </div>
            </div>
          ) : (
            <>
              {responseString}
              <div className="flex space-x-2 justify-end">
                <Button variant="secondary" className="mt-4">
                  <Link href="/app" className="flex">
                    Back
                  </Link>
                </Button>
                <Button
                  variant="default"
                  className="mt-4"
                  onClick={() => navigator.clipboard.writeText(responseString)}
                >
                  <Clipboard className="h-4 w-4 mr-2" />
                  Copy to clipboard
                </Button>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Page;
