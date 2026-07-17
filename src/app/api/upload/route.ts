import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  const fastApiForm = new FormData();
  fastApiForm.append("file", new Blob([buffer], { type: "application/pdf" }), filename);

  const fastApiRes = await fetch("http://localhost:8000/process-pdf", {
    method: "POST",
    body: fastApiForm,
  });

  if (!fastApiRes.ok) {
    const error = await fastApiRes.json();
    return NextResponse.json({ error: error.detail }, { status: 500 });
  }

  const fastApiData = await fastApiRes.json();
  await (prisma as any).document.upsert({
        where: {
      userId_documentId: {
        userId: session.user!.id!,
        documentId: fastApiData.document_id,
      }
    },
    update: {},
    create: {
      userId: session.user!.id!,
      documentId: fastApiData.document_id,
      filename: file.name,
      totalChunks: fastApiData.total_chunks,
    }
  });

  return NextResponse.json({ 
    success: true, 
    filename,
    path: `/uploads/${filename}`,
    document_id: fastApiData.document_id,
    total_chunks: fastApiData.total_chunks,
  });
  
}