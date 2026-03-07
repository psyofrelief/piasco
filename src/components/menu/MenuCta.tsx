"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function MenuCta() {
  const { data: session } = useSession();

  return (
    <div className="gap-y-xs p-sm flex flex-col">
      {!session?.user ? (
        <>
          <Link href={"/auth/login"} className="flex w-full">
            <Button className="flex-1" variant="outline">
              Login
            </Button>
          </Link>
          <Link href={"/auth/register"} className="flex w-full">
            <Button className="flex-1">Register</Button>
          </Link>
        </>
      ) : (
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="outline"
          className="w-full"
        >
          Logout
        </Button>
      )}
    </div>
  );
}
