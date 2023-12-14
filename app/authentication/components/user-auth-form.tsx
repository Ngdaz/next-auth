"use client";

import { useState, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signOut } from "next-auth/react";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> { }
interface IForm {
  username: string;
  password: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const [form, setFormValue] = useState<IForm>({
    username: "",
    password: "",
  });

  const updateForm = (
    formKey: keyof IForm,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setFormValue({
      ...form,
      [formKey]: value
    });
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    signIn("credentials", {
      username: form.username,
      password: form.password,
      callbackUrl: "/",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              User Name
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => updateForm("username", event)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => updateForm("password", event)}
            />
          </div>
          <div className="flex w-full justify-end">
            <Button className="mr-2" disabled={isLoading} onClick={() => signOut()}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Out
            </Button>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>

          </div>
        </div>
      </form>
    </div>
  );
}
