import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { auth } from "@/lib/auth";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Navbar session={session} />
      {children}
      <Footer />
    </>
  );
}
