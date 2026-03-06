import Navbar from "@/components/navbar/Navbar";
import FeaturesDetailedSection from "@/components/sections/FeaturesDetailed.tsx";
import FeaturesOverviewSection from "@/components/sections/FeaturesOverview";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="border-outline flex w-full max-w-250 flex-col">
        <Navbar />
        <Hero />
      </div>
      <FeaturesOverviewSection />
      <FeaturesDetailedSection />
    </main>
  );
}
