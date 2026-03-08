"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormMessage from "@/components/ui/FormMessage";
import { requestPasswordReset } from "@/app/auth/actions";
import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/lib/data/schemas/authSchema";
import Link from "next/link";
import Reveal from "../ui/Reveal";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    try {
      await requestPasswordReset(data.email);
      toast.success(
        "If an account exists, a reset link has been sent to your email.",
      );
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Reveal className="flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-y-md reveal-item flex flex-1 flex-col"
      >
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="example@domain.com"
          />
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </div>

        <div className="gap-y-md flex w-full flex-col items-center">
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Send reset link
          </Button>
          <Link
            className="text-foreground-secondary hover:text-accent-muted underline underline-offset-3 transition-colors"
            href={"/auth/login"}
          >
            Back to login
          </Link>
        </div>
      </form>
    </Reveal>
  );
}
