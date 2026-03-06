import { STATS } from "@/lib/data/stats";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import StatCard from "../StatCard";

export default function StatsSection() {
  return (
    <div className="bg-popover flex w-full justify-center">
      <Section className="gap-y-xl flex w-full max-w-250 flex-col items-center">
        <Headline className="max-w-100 text-center">
          Scale That Powers Global Connections
        </Headline>

        <ul className="border-outline grid w-full grid-cols-3 border border-dashed border-r-transparent border-b-transparent">
          {STATS.map((stat, idx) => (
            <StatCard {...stat} key={idx} />
          ))}
        </ul>
      </Section>
    </div>
  );
}
