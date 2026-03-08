"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormMessage from "@/components/ui/FormMessage";
import {
  resetPasswordSchema,
  ResetPasswordValues,
} from "@/lib/data/schemas/authSchema";
import { resetPasswordAction } from "@/app/auth/actions";
import FadeUp from "../ui/FadeUp";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordValues> = async (data) => {
    if (!token || !email) {
      toast.error("Link is still loading or invalid.");
      return;
    }

    try {
      await resetPasswordAction({ email, token, password: data.password });
      toast.success("Password updated successfully");
      router.push("/auth/login");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An unexpected error occurred.");
    }
  };

  return (
    <FadeUp className="flex w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-y-md flex flex-col"
      >
        <div className="gap-y-xs flex flex-col">
          <Label htmlFor="password">New Password</Label>
          <Input
            {...register("password")}
            placeholder="************"
            type="password"
          />
          {errors.password && (
            <FormMessage>{errors.password.message as string}</FormMessage>
          )}
        </div>
        <div className="gap-y-xs flex flex-col">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...register("confirmPassword")}
            placeholder="Confirm new password"
            type="password"
          />
          {errors.confirmPassword && (
            <FormMessage>
              {errors.confirmPassword.message as string}
            </FormMessage>
          )}
        </div>
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Update Password
        </Button>
      </form>
    </FadeUp>
  );
}
