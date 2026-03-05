"use client";

import { DASHBOARD_LINKS } from "@/lib/data/navigation";
import Logo from "../../logo/Logo";
import SidebarLink from "../sidebar/SidebarLink";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { signOut } from "next-auth/react";
import CreateLinkDialog from "@/components/forms/CreateLinkDialog";

export default function Sidebar() {
  return (
    <aside className="p-lg border-r-outline flex min-w-100 flex-col justify-between border-r border-dashed">
      <div className="gap-y-xl flex flex-col">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="gap-y-lg flex flex-col">
          {DASHBOARD_LINKS.map((e) => (
            <div key={e.category} className="gap-y-md flex flex-col">
              <Heading
                className="border-b-outline pb-xs border-b border-dashed"
                label={e.category}
              />
              <ul className="gap-y-xs flex flex-col">
                {e.links.map((l, idx) =>
                  l.label !== "Logout" ? (
                    <SidebarLink label={l.label} href={l.href} key={idx + 1} />
                  ) : (
                    <li
                      key={l.label}
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="p-sm hover:bg-popover flex flex-1 cursor-pointer font-mono uppercase transition-colors"
                    >
                      {l.label}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <CreateLinkDialog className="w-full!" />
    </aside>
  );
}
