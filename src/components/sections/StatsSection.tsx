import { STATS } from "@/lib/data/stats";
import Headline from "../ui/Headline";
import Section from "../ui/Section";
import StatCard from "../StatCard";

export default function StatsSection() {
  return (
    <div className="bg-popover flex w-full justify-center">
      <Section className="gap-y-xl flex w-full max-w-250 flex-col sm:items-center">
        <Headline className="pl-sm max-w-80 sm:max-w-100 sm:pl-0 sm:text-center">
          Scale That Powers Global Connections
        </Headline>

        <div className="border-outline flex w-full gap-px overflow-x-auto border border-dashed lg:grid lg:grid-cols-3 lg:overflow-visible lg:border-r-transparent">
          {STATS.map((stat, idx) => (
            <ul key={idx} className="min-w-70 flex-none sm:min-w-0">
              <StatCard {...stat} />
            </ul>
          ))}
        </div>
      </Section>
    </div>
  );
}
