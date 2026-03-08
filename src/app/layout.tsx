import type { Metadata } from "next";
import { Fragment_Mono, Familjen_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import { MenuProvider } from "@/contexts/menuContext";
import MenuOverlay from "@/components/menu/MenuOverlay";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import GSAPInitialiser from "@/lib/gsapInitialiser";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Piasco | Link Shortener",
    template: "%s | Piasco",
  },
  description:
    "A fast, secure, and minimalist link shortening tool built for developers and creators. Manage and track your branded links with ease.",
  keywords: [
    "Piasco",
    "Link shortener",
    "URL shortener",
    "Branded links",
    "Custom slugs",
    "Next.js link shortener",
    "Faried Idris",
    "Open source link shortener",
    "Developer tools",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Piasco — Modern Link Shortener",
    description:
      "The simple way to create and manage short links. Built for speed and developer experience.",
    url: "https://p-s.co",
    siteName: "Piasco",
    images: [
      {
        url: "https://piasco.com/opengraph.webp",
        width: 1200,
        height: 630,
        alt: "Piasco Link Shortener",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piasco — Modern Link Shortener",
    description:
      "Create, manage, and track your short links with a clean, developer-focused interface.",
    images: ["https://piasco.com/opengraph.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${familjenGrotesk.variable} ${fragmentMono.variable} tracking-[-0.03em] antialiased`}
      >
        <SessionProvider session={session}>
          <MenuProvider>
            <GSAPInitialiser />
            <main className="flex min-h-screen flex-col">{children}</main>
            <Toaster />

            <MenuOverlay />
          </MenuProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
