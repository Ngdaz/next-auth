"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";

export const LoginButton = () => {
  return <Button onClick={() => signIn()}>Sign in</Button>;
};

export const RegisterButton = () => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8",
      )}
      href="/register"
    >
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
