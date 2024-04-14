"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useTransition } from "react";
import { OnboardingSchema } from "@/schemas/onboarding_schema";
import { Textarea } from "../ui/textarea";
import { ImageField } from "./fields/ImageField";
import { useSession } from "@clerk/nextjs";
import { env } from "process";
import { toast } from "react-toastify";

export const OnboardingForm = () => {
  const { session } = useSession();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof OnboardingSchema>) => {
    const serverUrl = env.SERVER_URL || "http://localhost:8080";

    startTransition(async () => {
      try {
        const token = await session?.getToken();
        if (!token) {
          toast.error("not Authorization");
          return;
        }

        const res = await fetch(`${serverUrl}/api/company/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const body = await res.json();
        if (!res.ok) {
          toast.error(body.message);
          return;
        }

        toast.success(body.message);
      } catch (error: any) {
        toast.error(error.message);
        return;
      }
    });
  };
  return (
    <div className="py-5">
      <Card className="w-full mx-auto max-w-4xl drop-shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Company Onboarding Form
          </CardTitle>
          <CardDescription>
            Set up your affiliate account by entering your company information
            below. This will enable you to integrate your CRM system, manage
            affiliate links, and track referrals efficiently. Complete the form
            to get started with optimizing your affiliate marketing efforts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="AffiSharp"
                        required
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Company UserName</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="username"
                        type="text"
                        placeholder="AffiSharp300"
                        required
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ImageField control={form.control} />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">
                      Motivation Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Type your motivation description here"
                        required
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Create a Company
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
