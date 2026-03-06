import Logo from "@/components/logo/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid h-screen grid-cols-2">
      <div className="gap-y-xl p-3xl flex flex-col">
        <Logo />

        {children}
      </div>
      <div className="bg-popover size-full" />
    </main>
  );
}
