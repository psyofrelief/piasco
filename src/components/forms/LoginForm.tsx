"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormMessage from "@/components/ui/FormMessage";
import { loginSchema, LoginValues } from "@/lib/data/schemas/authSchema";
import GoogleIcon from "../icons/GoogleIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/auth/actions";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    try {
      await loginUser(data);
      toast.success("Welcome back!");

      router.refresh();

      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An unexpected error occurred");
    }
  };
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="example@gmail.com"
        />
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="*************"
        />
        {errors.password && (
          <FormMessage>{errors.password.message}</FormMessage>
        )}
      </div>

      <div className="gap-x-xs flex items-center">
        <input
          type="checkbox"
          id="remember"
          className="size-4 cursor-pointer"
        />
        <Label
          htmlFor="remember"
          className="text-foreground-secondary cursor-pointer text-sm font-normal"
        >
          Keep me logged in on this device
        </Label>
      </div>

      <div className="gap-y-md flex w-full flex-col items-center">
        <div className="gap-x-xs flex w-full">
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Log In
          </Button>
          <Button
            variant="outline"
            type="button"
            className="gap-x-sm w-full"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
        </div>

        <Link
          href="/auth/forgot-password"
          className="text-foreground-secondary w-fit text-sm hover:underline"
        >
          I forgot my password
        </Link>
      </div>
    </form>
  );
}
