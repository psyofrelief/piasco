"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export default function SidebarLink({ href, label }: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li className="flex">
      <Link
        className={`p-sm flex-1 font-mono uppercase transition-colors ${
          isActive ? "bg-popover" : "hover:bg-popover/50 bg-transparent"
        }`}
        href={href}
      >
        {label}
      </Link>
    </li>
  );
}
