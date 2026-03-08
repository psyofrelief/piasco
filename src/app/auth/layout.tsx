"use client";

import { useState } from "react";
import Logo from "@/components/logo/Logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      data-theme="dark"
      className="bg-background text-foreground grid h-screen grid-cols-1 items-center justify-center xl:grid-cols-2"
    >
      <div className="gap-y-xl px-md py-xl flex flex-col md:px-40 md:py-40">
        <Logo />
        {children}
      </div>

      <div className="relative hidden h-full w-full overflow-hidden xl:block">
        <Image
          src="/images/auth.webp"
          alt="Auth Page Image"
          fill
          priority
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-all duration-250 ease-in-out ${
            loaded ? "blur-0 opacity-100" : "opacity-0 blur-xl"
          }`}
        />
      </div>
    </div>
  );
}
