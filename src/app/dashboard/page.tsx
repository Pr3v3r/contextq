"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DocumentList from "@/components/DocumentList";
import UploadSection from "@/components/UploadSection";
import ChatInterface from "@/components/ChatInterface";
import { signOut } from "next-auth/react";

interface SelectedDocument {
  documentId: string;
  filename: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [selectedDoc, setSelectedDoc] = useState<SelectedDocument | null>(null);

  if (status === "loading") return null;
  if (!session) redirect("/login");

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/login" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted">{session.user?.email}</p>
            <button
              onClick={handleSignOut}
              className="text-sm text-muted hover:text-foreground"
            >
              Sign out
            </button>
          </div>
          <UploadSection />
          {selectedDoc && (
            <ChatInterface
              documentId={selectedDoc.documentId}
              documentName={selectedDoc.filename}
            />
          )}
          <DocumentList
            onSelectDocument={(documentId, filename) =>
              setSelectedDoc({ documentId, filename })
            }
            selectedDocumentId={selectedDoc?.documentId ?? null}
          />
        </div>
      </main>
    </div>
  );
}