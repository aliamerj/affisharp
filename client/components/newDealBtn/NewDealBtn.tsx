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

import { DealForm } from "../dealForm/DealForm";
import { z } from "zod";
import { DealsQuerySchema } from "@/schemas/deal_schema";
import { useRef } from "react";

export const NewDealBtn = ({
  currentDeals,
}: {
  currentDeals: z.infer<typeof DealsQuerySchema>[];
}) => {
  const modalRef = useRef<HTMLButtonElement>(null);
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
          company="todo"
          currentDeals={currentDeals}
          moduleRef={modalRef}
        />
      </DialogContent>
    </Dialog>
  );
};
