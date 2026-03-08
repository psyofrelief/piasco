import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import Headline from "@/components/ui/Headline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function Page() {
  return (
    <div className="gap-y-xl flex flex-col">
      <header className="gap-y-xs flex flex-col">
        <Headline>Forgot Your Password?</Headline>
        <p className="text-foreground-secondary">
          Enter your email to receive a password reset link.
        </p>
      </header>
      <ForgotPasswordForm />
    </div>
  );
}
