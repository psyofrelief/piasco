"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormMessage from "@/components/ui/FormMessage";
import GoogleIcon from "../icons/GoogleIcon";
import {
  registerSchema,
  type RegisterValues,
} from "@/lib/data/schemas/authSchema";
import Link from "next/link";
import { registerUser } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FadeUp from "../ui/FadeUp";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      isOAuth: false,
    },
  });

  const router = useRouter();
  const { update } = useSession();

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    try {
      await registerUser(data);
      toast.success("Account created! Please log in.");
      await update();
      router.push("/auth/login");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An unexpected error occurred");
    }
  };

  return (
    <FadeUp className="flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-y-md flex flex-1 flex-col"
      >
        <div className="gap-y-xs flex flex-col">
          <Label htmlFor="name">Full Name *</Label>
          <Input {...register("name")} id="name" placeholder="Mark Smith" />
          {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
        </div>

        <div className="gap-y-xs flex flex-col">
          <Label htmlFor="email">Email *</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="example@gmail.com"
          />
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </div>

        <div className="gap-y-xs flex flex-col">
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
            id="agreeTerms"
            className="size-4 cursor-pointer"
            required
          />
          <Label
            htmlFor="agreeTerms"
            className="text-foreground-secondary cursor-pointer text-sm font-normal"
          >
            I have read and agreed to Piasco`s{" "}
            <span className="underline">
              <Link href={"/terms-of-service"}>terms and conditions.</Link>
            </span>
          </Label>
        </div>

        <div className="gap-y-sm flex w-full flex-col">
          <div className="gap-x-xs flex w-full">
            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Register
            </Button>
            <Button variant="outline" type="button" className="gap-x-sm w-full">
              <GoogleIcon />
              Sign up with Google
            </Button>
          </div>
        </div>
      </form>
    </FadeUp>
  );
}
