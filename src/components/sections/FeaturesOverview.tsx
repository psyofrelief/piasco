import { FEATURES_OVERVIEW } from "@/lib/data/features";
import Heading from "../ui/Heading";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import FeaturesOverviewCard from "../FeaturesOverviewCard";

export default function FeaturesOverviewSection() {
  return (
    <Section className="gap-y-xl mx-auto flex max-w-250 flex-col">
      <header className="gap-y-xs flex flex-col">
        <Heading label="Our Platform" />
        <Headline>Master Your Digital Touchpoints</Headline>
        <p className="text-foreground-secondary max-w-140">
          We provide the infrastructure to create, manage, and track
          personalised links and custom branded QR codes across every stage of
          your user journey.
        </p>
      </header>
      <ul className="gap-x-sm grid grid-cols-4">
        {FEATURES_OVERVIEW.map((e, idx) => (
          <FeaturesOverviewCard key={idx} {...e} />
        ))}
      </ul>
    </Section>
  );
}
