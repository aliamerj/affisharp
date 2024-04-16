"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import React, { useTransition } from "react";
import { ImageField } from "./fields/ImageField";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { DealSchema, DealsQuerySchema } from "@/schemas/deal_schema";
import { Button } from "../ui/button";

import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { SERVERURL } from "@/lib/constants";

export const DealForm = ({
  company,
  moduleRef,
  currentDeals,
}: {
  company: string;
  currentDeals: z.infer<typeof DealsQuerySchema>[];
  moduleRef: React.RefObject<HTMLButtonElement>;
}) => {
  const { session } = useSession();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof DealSchema>>({
    resolver: zodResolver(DealSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: z.infer<typeof DealSchema>) => {
    startTransition(async () => {
      try {
        const token = await session?.getToken();
        if (!token) {
          toast.error("not Authorization");
          return;
        }

        const res = await fetch(`${SERVERURL}/api/deal/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            name: data.name.replace(/\s+/g, "-"),
          }),
        });
        const body = await res.json();
        if (!res.ok) {
          toast.error(body.message);
          if (res.status === 404) router.push("/new");
          return;
        }
        form.reset();

        moduleRef?.current?.click();
        router.refresh();
        toast.success(body.message);
      } catch (error: any) {
        toast.error(error.message);
        return;
      }
    });
  };
  const handleDealValidation = (dealName: string) => {
    if (dealName === "") return;
    const isExists = currentDeals.find(
      (c) => c.name === dealName.toLowerCase(),
    );
    if (isExists) {
      form.setError("name", {
        type: "onBlur",
        message: "You aleady have this deal name",
      });
      return;
    }
    form.clearErrors("name");
  };

  function truncateText(text: string) {
    return text.length > 18
      ? text.substring(0, 18).toLowerCase().replace(/\s+/g, "-") + " .. "
      : text.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <div>
      <div className="overflow-hidden">
        <p className="text-sm font-bold">Deal Link</p>
        <Badge variant="outline" className="max-w-full overflow-hidden pr-2">
          <p className="text-sm font-normal italic">
            {`https://affisharp.com/${company}/${form.watch("name") === "" ? "Deal_Name" : truncateText(form.watch("name"))} `}
          </p>
        </Badge>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Deal Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="Book Call"
                    required
                    disabled={isPending}
                    onBlur={(e) => handleDealValidation(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageField control={form.control} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Start creating deals now!
          </Button>
        </form>
      </Form>
    </div>
  );
};
