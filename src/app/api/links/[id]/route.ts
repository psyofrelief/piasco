import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.link.delete({
      where: {
        id: parseInt(id),
        userId: session.user.id,
      },
    });
    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Link not found or unauthorized" },
      { status: 404 },
    );
  }
}
