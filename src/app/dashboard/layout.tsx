import { auth } from "@/lib/auth";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import DashboardClientWrapper from "@/components/dashboard/DashboardClientWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Navbar session={session} className="lg:hidden" />
      <Sidebar />

      <DashboardClientWrapper>
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </DashboardClientWrapper>
    </div>
  );
}
