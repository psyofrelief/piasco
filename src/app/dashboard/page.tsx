import CreateLinkForm from "@/components/forms/CreateLinkForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { deleteLink } from "./actions";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  // Calculate Stats
  const totalLinks = links.length;
  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const ctrAverage = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

  const stats = [
    { label: "Links created", value: totalLinks },
    { label: "Total clicks", value: totalClicks },
    { label: "CTR average", value: `${ctrAverage}%` },
  ];

  return <div className="size-full flex-1">main</div>;
}
