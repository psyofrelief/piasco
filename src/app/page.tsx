import Navbar from "@/components/navbar/Navbar";
import FeaturesDetailedSection from "@/components/sections/FeaturesDetailed.tsx";
import FeaturesOverviewSection from "@/components/sections/FeaturesOverview";
import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="border-outline flex w-full max-w-250 flex-col">
        <Navbar />
        <Hero />
      </div>
      <FeaturesOverviewSection />
      <FeaturesDetailedSection />
      <StatsSection />
    </main>
  );
}
