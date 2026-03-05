import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Panel from "@/components/dashboard/Panel";
import Headline from "@/components/ui/Headline";
import LinkCard from "@/components/dashboard/LinkCard";
import Button from "@/components/ui/Button";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return (
    <Panel className="gap-y-lg relative flex flex-col">
      <div className="flex items-end justify-between">
        <Headline>Your Links</Headline>
        <Button>CREATE NEW</Button>
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
    </Panel>
  );
}
