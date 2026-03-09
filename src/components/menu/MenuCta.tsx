"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useMenuContext } from "@/contexts/menuContext";

export default function MenuCta() {
  const { data: session } = useSession();
  const { closeMenu } = useMenuContext();

  return (
    <div className="gap-y-xs p-sm flex flex-col">
      {!session?.user ? (
        <>
          <Link href={"/auth/login"} className="flex w-full">
            <Button onClick={closeMenu} className="flex-1" variant="outline">
              Login
            </Button>
          </Link>
          <Link href={"/auth/register"} className="flex w-full">
            <Button onClick={closeMenu} className="flex-1">
              Register
            </Button>
          </Link>
        </>
      ) : (
        <Button
          onClick={() => {
            closeMenu();
            signOut({ callbackUrl: "/" });
          }}
          variant="outline"
          className="w-full"
        >
          Logout
        </Button>
      )}
    </div>
  );
}
