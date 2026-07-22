"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-muted text-sm hover:text-foreground transition-colors">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mt-8 mb-2">Terms of Service</h1>
        <p className="text-muted text-sm mb-12">Last updated: July 2026</p>

        <div className="flex flex-col gap-10 text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-foreground mb-3">1. Acceptance</h2>
            <p className="text-muted">By using ContextQ, you agree to these terms. If you do not agree, do not use the service.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-3">2. What ContextQ does</h2>
            <p className="text-muted">ContextQ allows you to upload PDF documents and ask questions about their content using AI. Answers are generated based on the content of your uploaded documents only.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-3">3. Your documents</h2>
            <p className="text-muted">You retain ownership of all documents you upload. ContextQ processes your documents solely to provide the service. We do not share your documents with third parties. Documents are stored securely and associated with your account.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-3">4. Acceptable use</h2>
            <p className="text-muted">You agree not to upload documents containing illegal content, or use ContextQ to generate harmful, misleading, or illegal content. ContextQ is intended for personal study and research purposes.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-3">5. AI limitations</h2>
            <p className="text-muted">ContextQ uses AI to generate responses. Answers may occasionally be inaccurate or incomplete. Do not rely on ContextQ as a substitute for professional legal, medical, or academic advice.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-3">6. Account</h2>
            <p className="text-muted">You sign in via Google OAuth. You are responsible for maintaining the security of your Google account. We may suspend accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-3">7. Service availability</h2>
            <p className="text-muted">ContextQ is provided as-is. We do not guarantee uninterrupted availability. The service may be modified or discontinued at any time.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-3">8. Contact</h2>
            <p className="text-muted">Questions about these terms? Reach out via GitHub: <a href="https://github.com/Pr3v3r/contextq" className="text-primary hover:opacity-70 transition-opacity">github.com/Pr3v3r/contextq</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}