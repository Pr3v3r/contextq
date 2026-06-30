"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface text-foreground"
      >
        ☰
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar itself */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-surface text-foreground border-r border-border p-6 flex flex-col gap-6 z-50 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">ContextQ</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-muted"
          >
            ✕
          </button>
        </div>

        <button className="bg-primary text-primary-foreground rounded-lg py-2 px-4 font-medium hover:opacity-90 transition-colors">
          + Upload Document
        </button>

        <nav className="flex flex-col gap-2 text-muted">
          <span className="text-foreground font-medium">My Documents</span>
        </nav>
      </aside>
    </>
  );
}