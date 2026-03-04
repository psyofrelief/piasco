"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertLink(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const destination = formData.get("destination") as string;
  const slug =
    (formData.get("slug") as string) || Math.random().toString(36).substring(7);

  await prisma.link.upsert({
    where: { slug: slug },
    update: { destination },
    create: {
      destination,
      slug,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteLink(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.link.delete({
    where: { id: parseInt(id) },
  });

  revalidatePath("/dashboard");
}
export async function getLinkBySlug(slug: string) {
  return await prisma.link.findUnique({
    where: { slug },
    include: { user: true },
  });
}
