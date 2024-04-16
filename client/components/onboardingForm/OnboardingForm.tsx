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
import { useSession } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SERVERURL } from "@/lib/constants";

export const OnboardingForm = () => {
  const { session } = useSession();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: z.infer<typeof OnboardingSchema>) => {
    startTransition(async () => {
      try {
        const token = await session?.getToken();
        if (!token) {
          toast.error("not Authorization");
          return;
        }

        const res = await fetch(`${SERVERURL}/api/company/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username.replace(/\s+/g, "-"),
          }),
        });
        const body = await res.json();
        if (!res.ok) {
          toast.error(body.message);
          return;
        }
        router.replace("/");

        toast.success(body.message);
      } catch (error: any) {
        toast.error(error.message);
        return;
      }
    });
  };
  const handleUsernameValidation = async (username: string) => {
    if (username === "") return;
    try {
      const token = await session?.getToken();
      if (!token) {
        return;
      }
      const res = await fetch(
        `${SERVERURL}/api/company/validate?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        const body = await res.json();
        form.setError("username", {
          type: "manual",
          message: body.message,
        });
        return;
      }
      form.clearErrors("username");
    } catch (error: any) {
      form.setError("username", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <Card className="w-full mx-auto max-w-2xl drop-shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Company Onboarding
          </CardTitle>
          <CardDescription>
            Create a unique username for your company to personalize your
            affiliate links, making them easily identifiable. This username will
            be featured in all your custom URLs, enhancing brand visibility and
            trust.
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Company Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="username"
                        type="text"
                        placeholder="AffiSharp300"
                        required
                        disabled={isPending}
                        onBlur={(e) => handleUsernameValidation(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Create a Username
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
