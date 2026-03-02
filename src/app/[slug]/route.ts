import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  let destination: string | null = null;

  try {
    const link = await prisma.link.update({
      where: { slug },
      data: { clicks: { increment: 1 } },
    });

    destination = link.destination;
  } catch (error) {
    console.error("Database error or slug not found:", error);
  }

  if (destination) {
    redirect(destination);
  }

  redirect("/");
}
