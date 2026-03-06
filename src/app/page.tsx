import Navbar from "@/components/navbar/Navbar";
import CtaSection from "@/components/sections/CtaSection";
import FaqsSection from "@/components/sections/FaqsSection";
import FeaturesDetailedSection from "@/components/sections/FeaturesDetailed.tsx";
import FeaturesOverviewSection from "@/components/sections/FeaturesOverview";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialSection from "@/components/sections/TestimonialSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="border-outline flex w-full max-w-250 flex-col">
        <Navbar />
        <HeroSection />
      </div>
      <FeaturesOverviewSection />
      <FeaturesDetailedSection />
      <StatsSection />
      <TestimonialSection />
      <FaqsSection />
      <CtaSection />
    </main>
  );
}
