"use client";
import MenuNavLink from "./MenuNavLink";
import { useMenuContext } from "@/contexts/menuContext";
import { MOBILE_DASHBOARD_LINKS, NAV_LINKS } from "@/lib/data/navigation";
import { useSession } from "next-auth/react";
import MenuCta from "./MenuCta";
import MenuLogo from "../logo/MenuLogo";
import { usePathname } from "next/navigation";

export default function MenuOverlay() {
  const { menuOpen } = useMenuContext();
  const pathname = usePathname();
  const links = pathname.startsWith("/dashboard")
    ? MOBILE_DASHBOARD_LINKS
    : NAV_LINKS;

  const { data: session } = useSession();
  return (
    <menu
      className={`text-foreground border-t-outline h-screen-minus-navbar-mobile bg-background fixed top-[65px] right-0 bottom-0 left-0 flex-col justify-between border-t border-dashed transition-opacity duration-100 ${menuOpen ? "z-99 flex" : "-z-1 hidden"}`}
    >
      <div className="flex flex-col">
        {links.map((link) => {
          if (link.href === "/dashboard" && !session) return null;
          return (
            <MenuNavLink label={link.label} href={link.href} key={link.href} />
          );
        })}
      </div>
      <MenuCta />
      <MenuLogo />
    </menu>
  );
}
