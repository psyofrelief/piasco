"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardClientWrapper({
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

  return <>{children}</>;
}
