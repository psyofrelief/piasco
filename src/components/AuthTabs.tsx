"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AuthTabs() {
  const pathname = usePathname();

  const tabs = [
    { label: "Login", href: "/auth/login" },
    { label: "Create Account", href: "/auth/register" },
  ];

  return (
    <div className="grid grid-cols-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "pb-xs w-full text-center transition-all",
              isActive
                ? "border-b-accent border-b-2 font-semibold opacity-100"
                : "border-b-outline border-b opacity-50 hover:opacity-100",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
