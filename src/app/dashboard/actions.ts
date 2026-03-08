"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { SettingsValues } from "@/lib/data/schemas/settingsSchema";
import { generateKey } from "@/lib/apiKeys";

export async function upsertLink(data: { destination: string; slug?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;
  const ONE_MINUTE_AGO = new Date(Date.now() - 60 * 1000);
  const recentLinksCount = await prisma.link.count({
    where: {
      userId,
      createdAt: { gte: ONE_MINUTE_AGO },
    },
  });

  if (recentLinksCount >= 5) {
    throw new Error("Slow down! You're creating links too quickly.");
  }

  const destination = data.destination;

  const slug = data.slug?.trim() || Math.random().toString(36).substring(2, 8);

  const existingLink = await prisma.link.findUnique({
    where: { slug },
  });

  if (existingLink) {
    if (existingLink.userId !== userId) {
      throw new Error("This short code is already taken by another user.");
    }

    await prisma.link.update({
      where: { slug },
      data: { destination },
    });
  } else {
    await prisma.link.create({
      data: {
        slug,
        destination,
        userId,
      },
    });
  }

  revalidatePath("/dashboard");
  return { success: true };
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

export async function createApiKeyAction() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { plainKey, hashedKey } = generateKey();

  await prisma.apiKey.deleteMany({ where: { userId: session.user.id } });

  await prisma.apiKey.create({
    data: {
      key: hashedKey,
      name: "Default Key",
      userId: session.user.id,
    },
  });

  return { plainKey };
}
