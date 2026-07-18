"use client";

import { propagateServerField } from "next/dist/server/lib/router-utils/setup-dev-bundler";
import { useState, useRef } from "react";

interface UploadResult {
  filename: string;
  document_id: string;
  total_chunks: number;
}

interface FileUploadProps {
  onUploadComplete: (data: UploadResult) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }
      
      onUploadComplete({
        filename: data.filename,
        document_id: data.document_id,
        total_chunks: data.total_chunks,
      });
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
<div
  id="upload-zone"
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onClick={() => inputRef.current?.click()}
  className={`group relative flex flex-col items-center justify-center w-full h-56 rounded-2xl cursor-pointer transition-all duration-300 ${
    isDragging
      ? "border-2 border-primary bg-primary/5 scale-[1.02]"
      : "border border-border/40 hover:border-primary/60 hover:bg-white/5 bg-white/[0.02]"
  }`}
  style={{ boxShadow: isDragging ? "0 0 30px rgba(242, 194, 214, 0.15)" : undefined }}
>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
{isUploading ? (
  <div className="flex flex-col items-center gap-3">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="text-muted text-sm">Processing your document...</p>
  </div>
) : (
  <div className="flex flex-col items-center gap-2">
    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">📄</div>
    <p className="text-foreground font-medium">Drop your PDF here</p>
    <p className="text-muted text-sm">or click to browse</p>
  </div>
)}
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
}