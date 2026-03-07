import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Panel from "@/components/dashboard/Panel";
import Headline from "@/components/ui/Headline";
import StatCard from "@/components/StatCard";
import LinkCard from "@/components/dashboard/LinkCard";
import Link from "next/link";
import Button from "@/components/ui/Button";
import NoLinks from "@/components/dashboard/NoLinks";
import LinkIcon from "@/components/icons/LinkIcon";
import ClickIcon from "@/components/icons/ClickIcon";
import CTRIcon from "@/components/icons/CTRIcon";

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
    { label: "Links created", value: totalLinks, icon: <LinkIcon /> },
    { label: "Total clicks", value: totalClicks, icon: <ClickIcon /> },
    { label: "CTR average", value: `${ctrAverage}%`, icon: <CTRIcon /> },
  ];

  return (
    <Panel className="gap-y-2xl relative flex flex-col">
      <div className="gap-y-lg flex flex-col">
        <Headline>Overview</Headline>
        <ul className="border-outline flex w-full gap-px overflow-x-auto border border-dashed lg:grid lg:grid-cols-3 lg:overflow-visible lg:border-r-transparent">
          {stats.map((stat, idx) => (
            <div key={idx} className="min-w-70 flex-none lg:min-w-0">
              <StatCard {...stat} />
            </div>
          ))}
        </ul>
      </div>

      {links.length > 0 ? (
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
      ) : (
        <NoLinks />
      )}
    </Panel>
  );
}
