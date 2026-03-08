import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

async function getUserIdFromRequest(req: Request) {
  const session = await auth();
  if (session?.user?.id) return session.user.id;

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const plainKey = authHeader.substring(7);
    const hashedKey = createHash("sha256").update(plainKey).digest("hex");

    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { key: hashedKey },
      select: { userId: true },
    });

    return apiKeyRecord?.userId || null;
  }

  return null;
}

export async function POST(req: Request) {
  const userId = await getUserIdFromRequest(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { destination, slug } = await req.json();

  const link = await prisma.link.create({
    data: {
      destination,
      slug: slug || Math.random().toString(36).substring(2, 8),
      userId,
    },
  });

  return NextResponse.json(link);
}
