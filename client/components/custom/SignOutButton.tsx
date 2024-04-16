"use client";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <p
      className="cursor-pointer"
      onClick={() => signOut(() => router.push("/"))}
    >
      Sign Out
    </p>
  );
};
