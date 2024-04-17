"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { DealForm } from "../dealForm/DealForm";
import { z } from "zod";
import { DealsQuerySchema } from "@/schemas/deal_schema";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const NewDealBtn = ({
  currentDeals,
  company,
}: {
  currentDeals: z.infer<typeof DealsQuerySchema>[];
  company: string | null;
}) => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const route = useRouter();
  if (company)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="lg" ref={modalRef}>
            New Deal
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Deal</DialogTitle>
            <DialogDescription>
              Quickly set up lucrative affiliate deals to boost your business.
              Just fill out this simple form to start rewarding your affiliates
              and driving sales today!
            </DialogDescription>
          </DialogHeader>
          <DealForm
            company={company}
            currentDeals={currentDeals}
            moduleRef={modalRef}
          />
        </DialogContent>
      </Dialog>
    );
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="lg" ref={modalRef}>
          New Deal
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Create Your Company Username First
          </AlertDialogTitle>
          <AlertDialogDescription>
            Set up your company username to begin creating deals.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => route.push("/new")}>
            Create Username
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
