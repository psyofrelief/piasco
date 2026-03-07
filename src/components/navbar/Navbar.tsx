"use client";
import NavLink from "./NavLink";
import { MOBILE_DASHBOARD_LINKS, NAV_LINKS } from "@/lib/data/navigation";
import Link from "next/link";
import Button from "../ui/Button";
import Logo from "../logo/Logo";
import MenuTrigger from "../menu/MenuTrigger";
import { useMenuContext } from "@/contexts/menuContext";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

interface NavbarProps {
  className?: string;
  session: Session | null;
}

export default function Navbar({
  className,
  session: serverSession,
}: NavbarProps) {
  const pathname = usePathname();
  const { data: clientSession } = useSession();

  const session = clientSession || serverSession;
  const { menuOpen } = useMenuContext();
  const links = pathname.startsWith("/dashboard")
    ? MOBILE_DASHBOARD_LINKS
    : NAV_LINKS;

  return (
    <nav
      id="top"
      className={cn(
        "lg:px-md bg-background px-sm py-sm text-foreground border-outline z-4 mx-auto flex w-full max-w-250 items-center justify-between border-dashed sm:border-x",
        menuOpen && "fixed top-0 right-0 left-0",
        className,
      )}
    >
      <div className="gap-x-md flex items-center">
        <Logo />
        <ul className="group/nav gap-x-sm hidden sm:flex">
          {links.map((link) => {
            if (link.href === "/dashboard" && !session?.user) return null;

            return (
              <NavLink key={link.label} label={link.label} href={link.href} />
            );
          })}
        </ul>
      </div>
      <MenuTrigger />
      <div className="gap-x-xs hidden items-center sm:flex">
        {!session?.user ? (
          <>
            <Link href={"/auth/login"} className="flex size-fit">
              <Button className="flex-1" variant="outline">
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"} className="flex size-fit">
              <Button className="flex-1">Register</Button>
            </Link>
          </>
        ) : (
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex-1"
            variant="outline"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}
