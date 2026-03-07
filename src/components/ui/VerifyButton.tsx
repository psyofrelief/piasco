"use client";
import { useState } from "react";
import { sendVerificationEmail } from "@/app/auth/actions";
import Button from "./Button";

interface VerifyButtonProps {
  email: string;
}

export default function VerifyButton({ email }: VerifyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      await sendVerificationEmail(email);
      alert("Verification email sent!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSend} disabled={loading}>
      {loading ? "Sending..." : "Resend Verification Email"}
    </Button>
  );
}
