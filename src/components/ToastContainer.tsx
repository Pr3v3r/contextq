"use client";

import { useState, useCallback, useEffect } from "react";
import Toast, { ToastType } from "@/components/Toast";
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

let addToastExternal: ((message: string, type: ToastType) => string) | null = null;
let removeToastExternal: ((id: string) => void) | null = null;

export function showToast(message: string, type: ToastType = "success"): string {
  if (addToastExternal) return addToastExternal(message, type);
  return "";
}

export function dismissToast(id: string) {
  if (removeToastExternal) removeToastExternal(id);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType): string => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    addToastExternal = addToast;
    removeToastExternal = removeToast;
    return () => {
      addToastExternal = null;
      removeToastExternal = null;
    };
  }, [addToast, removeToast]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}