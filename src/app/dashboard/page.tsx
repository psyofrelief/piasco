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

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-y-6 p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border bg-white p-8 shadow-sm"
          >
            <div className="mb-4 h-8 w-8 rounded-md bg-blue-400" />
            <div className="text-5xl font-bold tracking-tight text-black">
              {stat.value}
            </div>
            <div className="mt-2 font-medium text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-lg">Create a New Link</h2>
        <CreateLinkForm />
      </section>

      <section className="flex flex-col gap-y-4">
        <h2 className="text-xl font-bold">Latest Links Created</h2>
        <div className="flex flex-col gap-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="transition-hover flex justify-between rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md"
            >
              <a href={link.slug} className="flex flex-col gap-y-1">
                <span className="font-semibold text-black">
                  {process.env.NEXT_PUBLIC_BASE_URL?.replace(
                    /^https?:\/\//,
                    "",
                  )}
                  /{link.slug}
                </span>
                <span className="truncate text-sm text-gray-500">
                  {link.destination}
                </span>
              </a>
              <p className="my-auto text-black">{link.clicks} Clicks</p>
              <form action={deleteLink.bind(null, link.id.toString())}>
                <button
                  type="submit"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}

          {links.length === 0 && (
            <p className="text-gray-400 italic">No links created yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
