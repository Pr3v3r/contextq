"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "loading";

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({ message, type, onDismiss, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    if (type !== "loading") {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss, type]);

  const icons = {
    success: "✓",
    error: "✕",
    loading: "⟳",
  };

  const colors = {
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
    loading: "border-primary/30 bg-primary/10 text-primary",
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 ${colors[type]} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <span className={`text-sm font-bold ${type === "loading" ? "animate-spin inline-block" : ""}`}>
        {icons[type]}
      </span>
      <p className="text-sm font-medium">{message}</p>
      {type !== "loading" && (
        <button onClick={onDismiss} className="ml-auto text-xs opacity-50 hover:opacity-100">
          ✕
        </button>
      )}
    </div>
  );
}