"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
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

  useEffect(() => {
    const saved = localStorage.getItem("selectedDoc");
    if (saved) setSelectedDoc(JSON.parse(saved));
  }, []);

  const selectDoc = (documentId: string, filename: string) => {
    const doc = { documentId, filename };
    setSelectedDoc(doc);
    localStorage.setItem("selectedDoc", JSON.stringify(doc));
  };

  const clearDoc = () => {
    setSelectedDoc(null);
    localStorage.removeItem("selectedDoc");
  };

  if (status === "loading") return null;
  if (!session) redirect("/login");

  const handleSignOut = async () => {
    localStorage.removeItem("selectedDoc");
    await signOut({ redirectTo: "/login" });
  };

  const handleUploadClick = () => {
    clearDoc();
    setTimeout(() => {
      document.getElementById("upload-zone")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        onSelectDocument={selectDoc}
        selectedDocumentId={selectedDoc?.documentId ?? null}
        onUploadClick={handleUploadClick}
      />
      <main className="flex-1 flex flex-col min-h-screen">
        {selectedDoc ? (
          <div className="flex flex-col h-screen">
            <div className="px-6 py-3 border-b border-border bg-surface/50 backdrop-blur-sm flex items-center gap-4">
              <button
                onClick={clearDoc}
                className="text-primary cursor-pointer hover:opacity-70 transition-opacity text-lg"              >
                ←
              </button>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-foreground truncate">{selectedDoc.filename}</h2>
                <p className="text-xs text-muted">{session.user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs cursor-pointer text-muted hover:text-foreground border border-border rounded-lg px-3 py-1.5 transition-colors"
              >
                Sign out
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                documentId={selectedDoc.documentId}
                documentName={selectedDoc.filename}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
            <div className="absolute top-4 right-4">
              <button
                onClick={handleSignOut}
                className="text-xs text-muted hover:text-foreground border border-border rounded-lg px-3 py-1.5 transition-colors"
              >
                Sign out
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                What are we studying today?
              </h1>
              <p className="text-muted">
                Upload a document and start asking questions
              </p>
            </div>
            <div className="w-full max-w-xl">
              <UploadSection onUploadComplete={(data) => {
                selectDoc(data.document_id, data.filename);
              }} />
            </div>
            <p className="text-muted text-sm">
              or select a document from the sidebar
            </p>
          </div>
        )}
      </main>
    </div>
  );
}