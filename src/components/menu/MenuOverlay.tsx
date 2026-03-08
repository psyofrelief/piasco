"use client";
import MenuNavLink from "./MenuNavLink";
import { useMenuContext } from "@/contexts/menuContext";
import { MOBILE_DASHBOARD_LINKS, NAV_LINKS } from "@/lib/data/navigation";
import { useSession } from "next-auth/react";
import MenuCta from "./MenuCta";
import MenuLogo from "../logo/MenuLogo";
import { usePathname } from "next/navigation";
import FadeUp from "../ui/FadeUp";

export default function MenuOverlay() {
  const { menuOpen } = useMenuContext();
  const pathname = usePathname();
  const links = pathname.startsWith("/dashboard")
    ? MOBILE_DASHBOARD_LINKS
    : NAV_LINKS;

  const { data: session } = useSession();
  if (!menuOpen) return null;

  return (
    <menu className="text-foreground border-t-outline h-screen-minus-navbar-mobile bg-background fixed top-[65px] right-0 bottom-0 left-0 z-99 flex flex-col justify-between border-t border-dashed">
      <FadeUp as={"ul"} className="flex flex-col">
        {links.map((link) => {
          if (link.href === "/dashboard" && !session) return null;
          return (
            <MenuNavLink label={link.label} href={link.href} key={link.href} />
          );
        })}
      </FadeUp>
      <MenuCta />
      <MenuLogo />
    </menu>
  );
}
