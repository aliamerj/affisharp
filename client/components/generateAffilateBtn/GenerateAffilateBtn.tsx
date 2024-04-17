"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CopyButton } from "../CopyButton/CopyButton";
import { SERVERURL } from "@/lib/constants";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export const GenerateAffilateBtn = ({
  affilink,
  company,
  deal,
}: {
  affilink?: string;
  company: string;
  deal: string;
}) => {
  const [link, setLink] = useState(affilink);
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();
  const { session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      try {
        const token = await session?.getToken();
        if (!token) {
          toast({
            title: "Log In Required",
            description:
              "Please log in or create an account to generate your affiliate link.",
            action: (
              <ToastAction
                altText="Login"
                onClick={() => router.push("/sign-in")}
              >
                Login
              </ToastAction>
            ),
          });
          return;
        }

        const res = await fetch(
          `${SERVERURL}/api/affi/create/${company}/${deal}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const body = await res.json();
        if (!res.ok) {
          toast({
            title: "Error!!",
            description: body.message,
            action: (
              <ToastAction altText="Reload" onClick={() => router.refresh()}>
                Relaod
              </ToastAction>
            ),
          });

          return;
        }
        setLink(body.body);
      } catch (error: any) {
        toast({
          title: "Error!!",
          description: error.message,
          action: (
            <ToastAction altText="Reload" onClick={() => router.refresh()}>
              Relaod Page
            </ToastAction>
          ),
        });
        return;
      }
    });
  };
  if (link) {
    return (
      <div className="text-center text-gray-600 space-y-2">
        <p className="text-gray-50 font-bold text-lg">Affiliate Link:</p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="bg-gray-100 w-full rounded text-gray-800 text-lg px-3 py-2 shadow-inner flex-1">
            {link}
          </div>
          <CopyButton text={link} />
        </div>
      </div>
    );
  }

  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      size="lg"
      className="bg-white text-[#135d66] hover:bg-gray-100 font-bold py-2 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
    >
      {isLoading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Generating Your Affiliate Link
        </>
      ) : (
        "Generate Affiliate Link"
      )}
    </Button>
  );
};
