"use client";

import { useState, useRef, useEffect } from "react";

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
        const res = await fetch(`/api/messages?documentId=${documentId}`);
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })));
        }
      } catch (err) {
        console.error("Failed to load history", err);
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

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    let fullAnswer = "";

    try {
      const res = await fetch("http://localhost:8000/ask-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, document_id: documentId }),
      });

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
              fullAnswer += parsed.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: fullAnswer,
                };
                return updated;
              });
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            } catch {}
          }
        }
      }

      await saveMessage("assistant", fullAnswer);
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border bg-surface">
        <p className="font-medium text-foreground">{documentName}</p>
        <p className="text-sm text-muted">Ask anything about this document</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {isLoading ? (
          <p className="text-muted text-sm text-center mt-8">Loading history...</p>
        ) : messages.length === 0 ? (
          <p className="text-muted text-sm text-center mt-8">
            No messages yet. Ask a question about your document.
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface border border-border text-foreground"
                }`}
              >
                {msg.content || (isStreaming ? "▊" : "")}
              </div>
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
          className="flex-1 bg-surface border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
        />
        <button
          onClick={sendMessage}
          disabled={isStreaming || !input.trim()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isStreaming ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}