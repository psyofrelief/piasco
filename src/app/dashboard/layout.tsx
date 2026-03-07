"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { update } = useSession();
  const searchParams = useSearchParams();
  const isJustVerified = searchParams.get("verified") === "true";

  useEffect(() => {
    if (isJustVerified) {
      update();
    }
  }, [isJustVerified, update]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
