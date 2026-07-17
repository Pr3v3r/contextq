import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const documentId = searchParams.get("documentId");

  if (!documentId) return NextResponse.json({ error: "documentId required" }, { status: 400 });

  const document = await (prisma as any).document.findFirst({
    where: {
      userId: session.user.id,
      documentId: documentId,
    }
  });

  if (!document) return NextResponse.json({ messages: [] });

  const messages = await (prisma as any).message.findMany({
    where: { documentId: document.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { documentId, role, content } = await req.json();
  console.log("GET - documentId:", documentId);
  console.log("GET - userId:", session.user.id);

  const document = await (prisma as any).document.findFirst({
    where: {
      userId: session.user.id,
      documentId: documentId,
    }
  });
  console.log("GET - found document:", document);


  if (!document) return NextResponse.json({ error: "Document not found" }, { status: 404 });

  const message = await (prisma as any).message.create({
    data: {
      documentId: document.id,
      userId: session.user.id,
      role,
      content,
    }
  });

  return NextResponse.json({ message });
}