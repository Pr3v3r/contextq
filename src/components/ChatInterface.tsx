"use client";

import { useState, useRef, useEffect } from "react";
import { showToast, dismissToast } from "@/components/ToastContainer";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  documentId: string;
  documentName: string;
}

export default function ChatInterface({ documentId, documentName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/ask-stream`);
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })));
        }
      } catch (err) {
        showToast("Failed to load chat history", "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadHistory();
  }, [documentId]);

  const saveMessage = async (role: string, content: string) => {
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId, role, content }),
      });
    } catch (err) {
      console.error("Failed to save message", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    await saveMessage("user", input);
    setInput("");
    setIsStreaming(true);

    const toastId = showToast("Thinking...", "loading");

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    let fullAnswer = "";
    let firstChunk = true;

    try {
      const res = await fetch("http://localhost:8000/ask-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, document_id: documentId }),
      });

      if (!res.ok) {
        dismissToast(toastId);
        showToast("Failed to get a response. Please try again.", "error");
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: "Something went wrong. Please try again." };
          return updated;
        });
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (firstChunk) {
                dismissToast(toastId);
                firstChunk = false;
              }
              fullAnswer += parsed.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: fullAnswer };
                return updated;
              });
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            } catch {}
          }
        }
      }

      await saveMessage("assistant", fullAnswer);
    } catch (err) {
      dismissToast(toastId);
      showToast("Connection error. Is the backend running?", "error");
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Something went wrong. Please try again." };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col gap-3 mt-4">
            {[1,2,3].map(i => (
              <div key={i} className={`h-12 rounded-2xl bg-surface animate-pulse ${i % 2 === 0 ? "w-3/4" : "w-2/3 self-end"}`} />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center mt-16">
            <p className="text-2xl">💬</p>
            <p className="text-foreground font-medium">Ask anything about this document</p>
            <p className="text-muted text-sm">Your questions and answers will be saved automatically</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
  <div
  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
    msg.role === "user"
      ? "bg-primary text-primary-foreground rounded-tr-sm"
      : "bg-surface-elevated border border-border text-foreground rounded-tl-sm"
  }`}
>
<ReactMarkdown>
  {msg.content || (isStreaming ? "▊" : "")}
</ReactMarkdown></div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-border flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question..."
          className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={isStreaming || !input.trim()}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-xl font-medium hover:opacity-90 disabled:opacity-40 transition-all text-sm cursor-pointer"
        >
          {isStreaming ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}