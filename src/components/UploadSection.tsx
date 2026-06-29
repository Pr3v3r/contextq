"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";

export default function UploadSection() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <FileUpload onUploadComplete={(filename) => setUploadedFile(filename)} />
      {uploadedFile && (
        <p className="text-green-600 text-sm">
          ✓ Uploaded: {uploadedFile}
        </p>
      )}
    </div>
  );
}