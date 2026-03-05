"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { SettingsValues } from "@/lib/data/schemas/settingsSchema";

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

//auth
interface UserUpdateData {
  name: string;
  email: string;
  password?: string;
}

export async function updateUser(values: SettingsValues) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { name, email, currentPassword, newPassword } = values;

  const updateData: UserUpdateData = { name, email };

  if (newPassword && currentPassword) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user?.password) throw new Error("User has no password set");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Current password is incorrect");

    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
  });

  revalidatePath("/dashboard/settings");
}
