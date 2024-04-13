"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data?.error);
          }
          if (data?.success) {
            form.reset();
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="h-screen flex items-center">
      <Card className="mx-auto max-w-xl drop-shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="reset"
                          className="ml-auto inline-block text-sm underline"
                          aria-disabled={isPending}
                        >
                          Forgot your password ?
                        </Link>
                      </div>

                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          {...field}
                          placeholder="*********"
                          required
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
            </form>
          </Form>
          <hr className="my-3" />
          <Button
            variant="outline"
            className="w-full"
            disabled={isPending}
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="register"
              className="underline"
              aria-disabled={isPending}
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
