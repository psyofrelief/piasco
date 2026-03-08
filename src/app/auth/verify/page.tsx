import { verifyToken } from "@/app/auth/actions";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import VerifyButton from "@/components/ui/VerifyButton";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Account",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const session = await auth();

  if (session?.user?.emailVerified) {
    return (
      <div className="gap-y-sm flex flex-col">
        <Headline>Account Verified</Headline>
        <p>All set. You can now access your dashboard.</p>
        <Link href="/dashboard" className="flex w-fit">
          <Button className="flex-1">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  if (token) {
    const result = await verifyToken(token);
    if (result.success) {
      return (
        <div className="gap-y-lg flex flex-col">
          <header className="gap-y-xs flex flex-col">
            <Headline>Verification Successful!</Headline>
            <p>
              Your email has been confirmed. Please log in again to refresh your
              session.
            </p>
          </header>
          <Link href="/auth/login" className="flex w-fit">
            <Button className="flex-1">Sign In to Continue</Button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="gap-y-lg flex flex-col">
      <header className="gap-y-xs flex flex-col">
        <Headline>Verify Your Email</Headline>
        <p className="text-foreground-secondary">
          {token
            ? "This link is invalid or expired."
            : "Check your inbox for a verification link."}
        </p>
      </header>
      <VerifyButton email={session?.user?.email || ""} />
    </div>
  );
}
