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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background font-sans relative overflow-hidden pb-32">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold">
            Last Updated: July 2026
          </p>
        </header>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          
          <section className="mb-10 text-lg">
            <p>
              At ContextQ, we believe that your documents are your property. This Privacy Policy explains how we collect, use, and protect your information when you use our service. We keep things simple, transparent, and built around your privacy.
            </p>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>When you use ContextQ, we collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Account Information:</strong> When you sign in with Google, we receive your basic profile information (name, email address, and profile picture).</li>
              <li><strong className="text-foreground">Your Documents:</strong> The PDF files you choose to upload to our platform.</li>
              <li><strong className="text-foreground">Chat History:</strong> The questions you ask your documents and the AI-generated answers, so you can resume your work later.</li>
            </ul>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <p>We use your data strictly to make the product work for you. Specifically, we use it to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authenticate your account and keep your sessions secure.</li>
              <li>Process and parse your uploaded PDFs to enable semantic search.</li>
              <li>Generate accurate, cited answers to the questions you ask.</li>
              <li>Save your chat history in isolated document vaults.</li>
            </ul>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              3. Your Documents and AI Training
            </h2>
            <p className="text-foreground font-medium mb-2">We do not use your documents to train global AI models.</p>
            <p className="text-sm">
              Your uploaded PDFs and chat histories are processed solely to provide answers to your specific queries in real-time. Neither ContextQ nor our LLM providers use your private data to train, fine-tune, or improve foundational AI models.
            </p>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">4. Third-Party Services</h2>
            <p>To provide our service, we rely on trusted third-party infrastructure:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Google (Auth):</strong> We use Google strictly for secure account authentication. We do not have access to your Google password.</li>
              <li><strong className="text-foreground">LLM Providers:</strong> We use external API providers to generate answers based on the text extracted from your PDFs. Data sent to these APIs is not retained for model training.</li>
              <li><strong className="text-foreground">Hosting & Database:</strong> Your data and vector embeddings are securely stored using modern cloud infrastructure providers.</li>
            </ul>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">5. Data Retention & Deletion</h2>
            <p>
              Your documents and chat histories remain in your account until you decide to delete them. When you delete a document from your vault, the PDF file, its vector embeddings, and the associated chat history are permanently removed from our active databases.
            </p>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">6. Security</h2>
            <p>
              Security is built into our architecture. All communication between your browser and our servers is encrypted via HTTPS. Document access is strictly tied to your authenticated Google account—users can only access documents they have explicitly uploaded.
            </p>
          </section>

          <section className="space-y-4 p-8 bg-surface/40 border border-border/50 rounded-3xl shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-2">7. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please reach out.
            </p>
            <p>
              Email: <a href="mailto:11pravar.singh11@gmail.com" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">11pravar.singh11@gmail.com</a>
            </p>
          </section>

        </div>
      </article>
    </main>
  );
}