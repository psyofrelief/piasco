import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Panel from "@/components/dashboard/Panel";
import Headline from "@/components/ui/Headline";
import StatCard from "@/components/StatCard";
import LinkCard from "@/components/dashboard/LinkCard";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  const totalLinks = links.length;
  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const ctrAverage = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

  const stats = [
    { label: "Links created", value: totalLinks },
    { label: "Total clicks", value: totalClicks },
    { label: "CTR average", value: `${ctrAverage}%` },
  ];

  return (
    <Panel className="gap-y-2xl relative flex flex-col">
      <div className="gap-y-lg flex flex-col">
        <Headline>Overview</Headline>
        <ul className="border-outline grid grid-cols-3 border border-dashed border-r-transparent">
          {stats.map((stat, idx) => (
            <StatCard {...stat} key={idx} />
          ))}
        </ul>
      </div>

      <div className="gap-y-lg flex flex-col">
        <div className="flex items-end justify-between">
          <Headline>Latest Links</Headline>

          <Link href="/dashboard/links" className="flex size-fit">
            <Button className="flex-1" variant="outline">
              View All Links
            </Button>
          </Link>
        </div>
        <ul className="border-b-outline flex flex-col border-b border-dotted">
          {links.map((l) => (
            <LinkCard
              id={l.id}
              slug={l.slug}
              destination={l.destination}
              clicks={l.clicks}
              key={l.id}
            />
          ))}
        </ul>
      </div>
    </Panel>
  );
}
