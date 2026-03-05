"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export default function SidebarLink({ href, label, icon }: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li className="flex">
      <Link
        className={`p-sm gap-x-sm flex flex-1 items-center font-mono uppercase transition-colors ${
          isActive ? "bg-popover" : "hover:bg-popover/50 bg-transparent"
        }`}
        href={href}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
      </Link>
    </li>
  );
}
