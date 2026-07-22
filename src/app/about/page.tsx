import Link from "next/link";

// --- Custom Textures ---
const customStyles = `
  .bg-grid-pattern {
    background-size: 32px 32px;
    background-image: 
      linear-gradient(to right, rgba(128, 128, 128, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(128, 128, 128, 0.04) 1px, transparent 1px);
  }
`;

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="currentColor" className="text-primary" />
      <text x="14" y="20" fontFamily="serif" fontSize="16" fontWeight="bold" fill="var(--primary-foreground)" textAnchor="middle">Q</text>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background font-sans relative overflow-hidden pb-32">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* Simple Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-semibold tracking-tight text-foreground">ContextQ</span>
        </div>
      </nav>

      {/* Content */}
      <article className="relative z-10 max-w-3xl mx-auto px-8 pt-16">
        <header className="mb-12">
          <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl md:text-6xl font-normal text-foreground mb-6">
            About ContextQ
          </h1>
          <p className="text-muted-foreground text-xl max-w-xl leading-relaxed">
            ContextQ helps you understand your documents faster.
          </p>
        </header>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          
          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">What we do</h2>
            <p>
              Upload PDFs, ask questions, and get answers grounded strictly in your own files using AI-powered semantic search. 
            </p>
            <p>
              ContextQ is built for students, researchers, and professionals who want to spend less time mindlessly searching and more time actually understanding their material.
            </p>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">The Story</h2>
            <p>
              This project was born out of sheer frustration. Between lengthy lecture slides, dense research papers, and technical documentation, the traditional method of reading endless scrolling and hoping <code>Ctrl+F</code> finds the exact right keyword felt archaic.
            </p>
            <p>
              We needed a way to ask a document a question in plain English and get an instant, cited answer. We couldn't find a tool that was fast, private, and easy to use, so we built it ourselves.
            </p>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">The Tech</h2>
            <p>
              ContextQ uses Retrieval Augmented Generation (RAG). When you upload a document, we break it down into mathematical vectors. When you ask a question, we semantically match your query to the most relevant sections of your PDF, and then use a large language model to synthesize an accurate, cited answer.
            </p>
          </section>

        </div>
      </article>
    </main>
  );
}