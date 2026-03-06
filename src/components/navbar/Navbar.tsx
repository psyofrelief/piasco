import NavLink from "./NavLink";
import { NAV_LINKS } from "@/lib/data/navigation";
import Link from "next/link";
import Button from "../ui/Button";
import Logo from "../logo/Logo";
import { auth, signOut } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav
      id="top"
      className="sm:px-md px-sm py-sm text-foreground border-outline z-4 mx-auto flex w-full max-w-250 justify-between border-x border-dashed"
    >
      <div className="gap-x-md flex items-center">
        <Logo />
        <ul className="group/nav gap-x-sm hidden sm:flex">
          {NAV_LINKS.map((link) => {
            if (link.href === "/dashboard" && !session) return null;

            return (
              <NavLink key={link.label} label={link.label} href={link.href} />
            );
          })}
        </ul>
      </div>
      <div className="gap-x-xs flex items-center">
        {!session ? (
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
            onClick={async () => {
              "use server";
              await signOut();
            }}
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
