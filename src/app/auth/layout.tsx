import Logo from "@/components/logo/Logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-1 xl:grid-cols-2">
      <div className="gap-y-xl md:p-3xl p-sm flex flex-col">
        <Logo />

        {children}
      </div>
      <div className="relative hidden h-full w-full xl:block">
        <Image
          src="/images/auth.webp"
          alt="Auth Page Image"
          fill
          className="object-cover"
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
