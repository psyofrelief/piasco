import CtaSection from "@/components/sections/CtaSection";
import FaqsSection from "@/components/sections/FaqsSection";
import FeaturesDetailedSection from "@/components/sections/FeaturesDetailed";
import FeaturesOverviewSection from "@/components/sections/FeaturesOverview";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialSection from "@/components/sections/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesOverviewSection />
      <FeaturesDetailedSection />
      <StatsSection />
      <TestimonialSection />
      <FaqsSection />
      <CtaSection />
    </>
  );
}
