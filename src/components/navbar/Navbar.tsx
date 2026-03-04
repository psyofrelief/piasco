import NavLink from "./NavLink";
import { NAV_LINKS } from "@/lib/data/navigation";
import Link from "next/link";
import Button from "../ui/Button";
import Logo from "../logo/Logo";

export default function Navbar() {
  return (
    <nav className="sm:px-md px-sm py-sm text-foreground border-outline z-4 flex w-full justify-between border-x border-dashed">
      <div className="gap-x-md flex items-center">
        <Logo />
        <ul className="group/nav gap-x-sm hidden sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} label={link.label} href={link.href} />
          ))}
        </ul>
      </div>
      <div className="gap-x-xs flex items-center">
        <Link href={"/auth/login"} className="flex size-fit">
          <Button className="flex-1" variant="outline">
            Login
          </Button>
        </Link>
        <Link href={"/auth/register"} className="flex size-fit">
          <Button className="flex-1">Register</Button>
        </Link>
      </div>
    </nav>
  );
}
