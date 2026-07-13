"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";

interface UploadResult {
  filename: string;
  document_id: string;
  total_chunks: number;
}

export default function UploadSection() {
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <FileUpload onUploadComplete={(data) => setUploadResult(data)} />
      {uploadResult && (
        <div className="p-4 rounded-lg bg-surface border border-border">
          <p className="text-green-600 font-medium">✓ Document processed successfully</p>
          <p className="text-muted text-sm mt-1">File: {uploadResult.filename}</p>
          <p className="text-muted text-sm">Chunks stored: {uploadResult.total_chunks}</p>
          <p className="text-muted text-sm">Document ID: {uploadResult.document_id}</p>
        </div>
      )}
    </div>
  );
}