import { FEATURED_MODULES } from "@/lib/data/features";
import Heading from "../ui/Heading";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import FeatureModule from "../FeatureModule";

export default function FeaturesDetailedSection() {
  return (
    <Section className="gap-y-2xl px-sm border-t-outline mx-auto flex max-w-250 flex-col border-t border-dashed lg:px-0">
      <header className="gap-y-xs flex flex-col">
        <Heading label="The Redirect Engine for Modern Teams" />
        <Headline>Platform Capabilities</Headline>
        <p className="text-foreground-secondary max-w-140">
          We provide the infrastructure to create, manage, and track
          personalised links and custom branded QR codes across every stage of
          your user journey.
        </p>
      </header>

      <ul className="gap-y-2xl sm:gap-y-xl flex flex-col">
        {FEATURED_MODULES.map((e, idx) => (
          <FeatureModule isReversed={idx % 2 !== 0} {...e} key={e.title} />
        ))}
      </ul>
    </Section>
  );
}
