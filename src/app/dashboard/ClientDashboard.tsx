"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import UploadSection from "@/components/UploadSection";
import ChatInterface from "@/components/ChatInterface";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface SelectedDocument {
  documentId: string;
  filename: string;
}

interface ClientDashboardProps {
  session: Session;
}

export default function ClientDashboard({ session }: ClientDashboardProps) {
  const [selectedDoc, setSelectedDoc] = useState<SelectedDocument | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Extract first name for a friendlier greeting
  const firstName = session?.user?.name?.split(" ")[0] || "there";

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
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar
        onSelectDocument={selectDoc}
        selectedDocumentId={selectedDoc?.documentId ?? null}
        onUploadClick={handleUploadClick}
      />
      
      <main className="flex-1 flex flex-col min-h-screen h-screen overflow-hidden relative">
        
        {/* Global Top Navigation for User Profile */}
        <div className="absolute top-4 right-6 z-50">
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-surface border border-transparent hover:border-border/50 px-3 py-1.5 rounded-full transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-sm border border-primary/20">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">{firstName} ▾</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border/60 rounded-xl shadow-xl overflow-hidden py-1">
                <div className="px-4 py-2 border-b border-border/40 mb-1">
                  <p className="text-xs text-muted truncate">{session?.user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        {selectedDoc ? (
          <div className="flex flex-col h-full">
            {/* Improved Document Header */}
            <div className="px-6 py-4 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center gap-4 shrink-0 pr-32">
              <button
                onClick={clearDoc}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-border/50 text-muted hover:text-foreground hover:border-border transition-all cursor-pointer"
              >
                ←
              </button>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-foreground truncate flex items-center gap-2">
                  <span className="text-primary">📄</span> {selectedDoc.filename}
                </h2>
                <p className="text-xs text-muted mt-0.5">PDF Document • Ready to chat</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                documentId={selectedDoc.documentId}
                documentName={selectedDoc.filename}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-8 gap-10 max-w-4xl mx-auto pt-24 pb-12">
              
              <div className="text-center space-y-3">
                <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl md:text-5xl font-normal text-foreground">
                  Welcome back, {firstName}
                </h1>
                <p className="text-muted text-sm md:text-base">
                  What are we studying today? Upload a new document or select an existing one.
                </p>
              </div>

              <div id="upload-zone" className="w-full max-w-2xl bg-surface/30 border border-border/40 rounded-3xl p-6 md:p-8 shadow-sm">
                <UploadSection onUploadComplete={(data) => {
                  selectDoc(data.document_id, data.filename);
                }} />
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}