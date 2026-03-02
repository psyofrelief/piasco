import CreateLinkForm from "@/components/forms/CreateLinkForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-y-6 p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

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
              className="transition-hover rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-y-1">
                <span className="font-semibold text-black">
                  p-s.co/{link.slug}
                </span>
                <span className="truncate text-sm text-gray-500">
                  {link.destination}
                </span>
              </div>
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
