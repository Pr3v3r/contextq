import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <span className="font-bold text-lg">ContextQ</span>
        <Link
          href="/login"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-muted text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          AI-powered document intelligence
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-tight mb-6">
          Ask questions about<br />
          <span className="text-primary">any document</span>
        </h1>
        <p className="text-muted text-lg max-w-xl mb-10">
          Upload your PDFs — lecture notes, research papers, textbooks — and get instant AI-powered answers with source citations.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
          >
            Get started free →
          </Link>
          <a
            href="#how-it-works"
            className="text-muted hover:text-foreground transition-colors text-sm"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted text-xs uppercase tracking-widest text-center mb-4">How it works</p>
          <h2 className="text-3xl font-bold text-center mb-16">Three steps to clarity</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "📄", title: "Upload your PDF", desc: "Drag and drop any PDF — lecture slides, textbooks, research papers, notes." },
              { step: "02", icon: "💬", title: "Ask anything", desc: "Type your question naturally. ContextQ searches through your document to find the most relevant sections." },
              { step: "03", icon: "✨", title: "Get answers", desc: "Receive precise, cited answers streamed in real time. Every response references the exact source in your document." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col gap-4 p-6 rounded-2xl bg-surface border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{icon}</span>
                  <span className="text-xs text-muted font-mono">{step}</span>
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted text-xs uppercase tracking-widest text-center mb-4">Features</p>
          <h2 className="text-3xl font-bold text-center mb-16">Built for serious study</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "⚡", title: "Streaming responses", desc: "Answers appear word by word, just like talking to a tutor." },
              { icon: "📚", title: "Document vaults", desc: "Organize multiple documents. Each has its own isolated chat history." },
              { icon: "🔍", title: "Semantic search", desc: "RAG pipeline finds the most relevant chunks — not just keyword matches." },
              { icon: "💾", title: "Conversation history", desc: "Your chats are saved. Pick up exactly where you left off." },
              { icon: "🌙", title: "Dark & light mode", desc: "Night owl or morning person — ContextQ adapts to you." },
              { icon: "📱", title: "Works on mobile", desc: "Installable as a PWA. Study anywhere, on any device." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl bg-surface border border-border">
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted text-xs uppercase tracking-widest text-center mb-4">Reviews</p>
          <h2 className="text-3xl font-bold text-center mb-16">What students say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Pravar S.", role: "B.Tech CSE, MIT Manipal", review: "Finally stopped drowning in lecture notes. ContextQ finds exactly what I need in seconds." },
              { name: "Coming soon", role: "Add your review", review: "Be the first to share your experience with ContextQ." },
              { name: "Coming soon", role: "Add your review", review: "Be the first to share your experience with ContextQ." },
            ].map(({ name, role, review }) => (
              <div key={name} className="flex flex-col gap-4 p-6 rounded-2xl bg-surface border border-border">
                <p className="text-foreground text-sm leading-relaxed">"{review}"</p>
                <div className="mt-auto">
                  <p className="font-medium text-sm text-foreground">{name}</p>
                  <p className="text-muted text-xs">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-border/50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to study smarter?</h2>
          <p className="text-muted mb-8">Join students already using ContextQ to understand their documents faster.</p>
          <Link
            href="/login"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm inline-block"
          >
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center">
        <p className="text-muted text-xs">© 2026 ContextQ. Built by Pravar Singh.</p>
      </footer>

    </main>
  );
}