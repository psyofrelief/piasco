import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="border-outline flex w-full max-w-250 flex-col">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
