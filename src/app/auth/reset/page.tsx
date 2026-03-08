import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import Headline from "@/components/ui/Headline";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return (
    <div className="gap-y-xl flex flex-col">
      <header className="gap-y-xs flex flex-col">
        <Headline>Reset Your Password?</Headline>
        <p className="text-foreground-secondary">
          Enter your new desired password below.
        </p>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
