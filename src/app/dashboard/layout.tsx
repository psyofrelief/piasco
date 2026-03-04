import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { Toaster } from "@/components/ui/Toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">{children}</main>

      <Toaster />
    </div>
  );
}
