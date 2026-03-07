import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Panel from "@/components/dashboard/Panel";
import Headline from "@/components/ui/Headline";
import LinkCard from "@/components/dashboard/LinkCard";
import NoLinks from "@/components/dashboard/NoLinks";
import CreateLinkDialog from "@/components/forms/CreateLinkDialog";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return (
    <Panel className="gap-y-lg relative flex flex-col">
      {links.length > 0 ? (
        <>
          <div className="flex items-end justify-between">
            <Headline className="gap-x-xs flex">
              Your Links <span className="text-sm">({links.length})</span>
            </Headline>
            <CreateLinkDialog className="w-fit" label="Create Link" />
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
        </>
      ) : (
        <NoLinks />
      )}
    </Panel>
  );
}
