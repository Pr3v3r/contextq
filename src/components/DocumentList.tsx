"use client";

import { useState, useEffect } from "react";

interface Document {
  id: string;
  documentId: string;
  filename: string;
  totalChunks: number;
  createdAt: string;
}

interface DocumentListProps {
  onSelectDocument: (documentId: string, filename: string) => void;
  selectedDocumentId: string | null;
}

export default function DocumentList({ onSelectDocument, selectedDocumentId }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        if (data.documents) {
          setDocuments(data.documents);
        }
      } catch (err) {
        console.error("Failed to fetch documents", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  if (isLoading) {
    return <p className="text-muted text-sm">Loading documents...</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-foreground">Your Documents</h2>

      {documents.length === 0 ? (
        <p className="text-muted text-sm">No documents uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc.documentId, doc.filename)}
              className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedDocumentId === doc.documentId
                  ? "border-primary bg-surface"
                  : "border-border hover:border-primary hover:bg-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-muted">📄</span>
                <span className="font-medium text-foreground">{doc.filename}</span>
              </div>
              <span className="text-sm text-muted">{doc.totalChunks} chunks</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}