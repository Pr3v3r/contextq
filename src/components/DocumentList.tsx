"use client";

const mockDocuments = [
  { id: "1", name: "Operating Systems - Unit 3.pdf", uploadedAt: "2 days ago" },
  { id: "2", name: "DAA Lecture Notes.pdf", uploadedAt: "5 days ago" },
  { id: "3", name: "Probability MAT2201.pdf", uploadedAt: "1 week ago" },
];

export default function DocumentList() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-foreground">Your Documents</h2>

      {mockDocuments.length === 0 ? (
        <p className="text-muted text-sm">No documents uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted">📄</span>
                <span className="font-medium text-foreground">{doc.name}</span>
              </div>
              <span className="text-sm text-muted">{doc.uploadedAt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}