"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

interface Document {
  id: string;
  documentId: string;
  filename: string;
  totalChunks: number;
  createdAt: string;
}

interface SidebarProps {
  onSelectDocument: (documentId: string, filename: string) => void;
  selectedDocumentId: string | null;
  onUploadClick: () => void;
}

export default function Sidebar({ onSelectDocument, selectedDocumentId, onUploadClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        if (data.documents) setDocuments(data.documents);
      } catch (err) {
        console.error("Failed to fetch documents", err);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden cursor-pointer fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface text-foreground"
      >
        ☰
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-surface text-foreground border-r border-border p-4 flex flex-col z-50 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
  <h1 className="text-lg font-bold tracking-tight">ContextQ</h1>
  <div className="flex items-center gap-2">
    <ThemeToggle />
    <button onClick={() => setIsOpen(false)} className="md:hidden text-muted">✕</button>
  </div>
</div>

        {/* Document list */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1">
          <p className="text-xs text-muted uppercase tracking-widest mb-2">Documents</p>
          {documents.length === 0 ? (
            <p className="text-muted text-sm">No documents yet</p>
          ) : (
            documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => {
                  onSelectDocument(doc.documentId, doc.filename);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 cursor-pointer rounded-lg text-sm transition-colors truncate ${
                  selectedDocumentId === doc.documentId
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-surface-elevated"
                }`}
              >
                📄 {doc.filename}
              </button>
            ))
          )}
        </div>

        {/* Upload button pinned at bottom */}
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() => {
              setIsOpen(false);
              onUploadClick();
            }}
            className="w-full bg-primary cursor-pointer text-primary-foreground rounded-lg py-2 px-4 font-medium hover:opacity-90 transition-opacity text-sm"
          >
            + Upload Document
          </button>
        </div>
      </aside>
    </>
  );
}