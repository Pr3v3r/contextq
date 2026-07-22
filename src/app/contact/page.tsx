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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background font-sans relative overflow-hidden pb-32">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
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
      <article className="relative z-10 max-w-2xl mx-auto px-8 pt-16">
        <header className="mb-12">
          <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl md:text-6xl font-normal text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-xl max-w-xl leading-relaxed">
            Have questions, found an issue, or want to request a feature? We'd love to hear from you.
          </p>
        </header>

        <div className="space-y-6 text-muted-foreground">
          
          <div className="p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Email Support</h2>
            <p className="text-sm max-w-xs mx-auto">
              Drop us an email. We usually respond within 1-2 business days.
            </p>
            <a 
              href="mailto:11pravar.singh11@gmail.com" 
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all text-sm mt-4"
            >
              11pravar.singh11@gmail.com <span>→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href="https://github.com/Pr3v3r/contextq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 bg-background border border-border/50 rounded-full flex items-center justify-center text-foreground mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="font-semibold text-foreground mb-1">GitHub</h3>
              <p className="text-sm">Report bugs or contribute.</p>
            </a>

            <a 
              href="https://linkedin.com/in/pravarsingh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 bg-background border border-border/50 rounded-full flex items-center justify-center text-foreground mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <h3 className="font-semibold text-foreground mb-1">LinkedIn</h3>
              <p className="text-sm">Connect with the founder.</p>
            </a>
          </div>

        </div>
      </article>
    </main>
  );
}