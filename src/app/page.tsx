"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="currentColor" className="text-primary" />
      <text x="14" y="20" fontFamily="serif" fontSize="16" fontWeight="bold" fill="var(--primary-foreground)" textAnchor="middle">Q</text>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border/40 backdrop-blur-md bg-background/70">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-semibold tracking-tight">ContextQ</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-muted text-xs mb-8 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Now in beta
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl md:text-7xl font-normal tracking-tight max-w-3xl leading-[1.05] mb-6">
          Your documents,<br />
          <em className="text-primary not-italic">finally understood.</em>
        </h1>
        <p className="text-muted text-lg max-w-lg mb-10 leading-relaxed">
          Upload any PDF. Ask questions in plain English. Get precise answers pulled directly from your document — not the internet.
        </p>
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="bg-primary text-primary-foreground px-7 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm cursor-pointer"
          >
            Start for free
          </Link>
          <a href="#how-it-works" className="text-muted hover:text-foreground transition-colors text-sm cursor-pointer">
            See how it works
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-muted text-xs uppercase tracking-widest text-center mb-12">The problem with studying today</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { stat: "68%", label: "of students spend under 5 hours weekly on assigned reading", source: "NSSE 2024" },
              { stat: "14hrs", label: "average time per week students spend searching through academic material", source: "University Research" },
              { stat: "6.3hrs", label: "is all first-year students actually spend on assigned reading weekly", source: "NSSE 2024" },
            ].map(({ stat, label, source }, i) => (
              <Reveal key={stat} delay={i * 100}>
                <div className="flex flex-col gap-2 p-6">
                  <span style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl text-primary">{stat}</span>
                  <p className="text-muted text-sm leading-relaxed">{label}</p>
                  <p className="text-xs text-border">— {source}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Time Saved / Free Plan Value */}
      <section className="py-28 px-6 border-t border-border/40 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-muted text-xs uppercase tracking-widest text-center mb-3">How much time we save you — FOR FREE</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl md:text-5xl font-normal text-center mb-16">
              Your Free Account:<br /> Unlocking Time, Automatically.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Data Cards */}
            <div className="flex flex-col gap-5 order-2 md:order-1">
              {[
                { 
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  title: "RECLAIM ~30 HOURS MONTHLY.", 
                  desc: "Based on hypothetically saving 6 hours per complex paper, for 5 papers a month. That's time back in your life." 
                },
                { 
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
                  title: "PER DOCUMENT: SAVE 75% OF READING TIME.", 
                  desc: "A brutal 10-hour research session becomes 2.5 hours of targeted queries, direct answers, and review." 
                },
                { 
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
                  title: "10X FASTER INSIGHT.", 
                  desc: "Spend 1 minute asking exactly what you need, instead of 1 hour skimming for keywords that might not even be there." 
                }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="p-6 rounded-2xl border border-border/60 bg-background shadow-sm flex gap-5 items-start transition-all hover:border-primary/40">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1.5">{item.title}</h4>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Right: Chart */}
            <Reveal delay={200}>
              <div className="p-8 rounded-3xl bg-background border border-border shadow-md order-1 md:order-2">
                <div className="text-center mb-10">
                  <h3 className="text-sm font-semibold mb-1 uppercase tracking-wide">Monthly Reading & Research Time</h3>
                  <p className="text-xs text-muted">(Hypothetical Monthly Student Use)</p>
                </div>
                
                <div className="flex items-end justify-center gap-16 h-64 border-b border-border/50 pb-2 relative ml-6">
                  {/* Y-axis labels */}
                  <div className="absolute -left-6 top-0 bottom-2 flex flex-col justify-between text-xs text-muted font-mono">
                    <span>60h</span>
                    <span>45h</span>
                    <span>30h</span>
                    <span>15h</span>
                    <span>0h</span>
                  </div>

                  {/* Bar 1: Without ContextQ */}
                  <div className="flex flex-col items-center gap-3 w-24 z-10 group">
                    <div className="w-full bg-surface border border-border rounded-t-md h-[240px] relative transition-transform group-hover:-translate-y-1">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 text-sm font-bold backdrop-blur-sm">60 hrs</div>
                    </div>
                    <span className="text-xs font-medium text-muted">Without ContextQ</span>
                  </div>

                  {/* Bar 2: With ContextQ */}
                  <div className="flex flex-col items-center gap-3 w-24 z-10 group">
                    <div className="w-full bg-primary rounded-t-md h-[120px] relative transition-transform group-hover:-translate-y-1">
                       {/* Floating Saving Label */}
                       <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center animate-bounce">
                         <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">You Save</span>
                         <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">~30 HOURS</span>
                         <div className="w-px h-3 bg-primary/40 mt-1"></div>
                       </div>
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary-foreground/20 text-sm font-bold text-primary-foreground">30 hrs</div>
                    </div>
                    <span className="text-xs font-medium text-foreground">With ContextQ <br/><span className="text-[10px] text-primary font-bold uppercase tracking-wider">(Free Plan)</span></span>
                  </div>
                </div>
                <p className="text-[10px] text-muted text-center mt-8 italic leading-relaxed">*Example assumes a free tier usage and typical reading load. Your results will vary.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-28 px-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-muted text-xs uppercase tracking-widest text-center mb-3">How it works</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl font-normal text-center mb-16">From upload to insight in seconds</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Upload", title: "Drop your PDF", desc: "Lecture slides, textbooks, research papers, contracts. Any PDF." },
              { label: "Ask", title: "Type your question", desc: "Ask like you would ask a professor who has read the whole thing." },
              { label: "Read", title: "Get a precise answer", desc: "ContextQ searches semantically and returns a cited, accurate response." },
            ].map(({ label, title, desc }, i) => (
              <Reveal key={label} delay={i * 100}>
                <div className="group flex flex-col gap-4 p-6 rounded-2xl bg-surface border border-border h-full hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default">
                  <span className="text-xs text-muted uppercase tracking-widest font-mono">{label}</span>
                  <h3 className="font-semibold text-foreground text-lg">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 px-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-muted text-xs uppercase tracking-widest text-center mb-3">Features</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl font-normal text-center mb-16">Built for people who read seriously</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Streaming responses", desc: "Answers appear as they're generated. No waiting for the full response." },
              { title: "Document vaults", desc: "Each document has its own isolated chat. Switch between them without losing context." },
              { title: "Semantic search", desc: "Finds meaning, not just keywords. Understands what you're actually asking." },
              { title: "Persistent history", desc: "Every conversation is saved. Come back days later and continue where you left off." },
              { title: "Dark and light mode", desc: "A toggle that remembers your preference across sessions." },
              { title: "Installable on mobile", desc: "Add to your home screen and use it like a native app, anywhere." },
            ].map(({ title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="group flex flex-col gap-2 p-5 rounded-xl bg-surface border border-border hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-28 px-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-muted text-xs uppercase tracking-widest text-center mb-3">Reviews</p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl font-normal text-center mb-16">What students say</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Pravar S.", role: "B.Tech CSE, MIT Manipal", review: "Finally stopped drowning in lecture notes. ContextQ finds exactly what I need in seconds." },
              { name: "Your name here", role: "Leave a review", review: "Be among the first to share your experience. Reach out to add your review." },
              { name: "Your name here", role: "Leave a review", review: "Be among the first to share your experience. Reach out to add your review." },
            ].map(({ name, role, review }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group flex flex-col gap-5 p-6 rounded-2xl bg-surface border border-border h-full hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default">
                  <p className="text-foreground text-sm leading-relaxed flex-1">"{review}"</p>
                  <div className="border-t border-border/50 pt-4">
                    <p className="font-medium text-sm text-foreground">{name}</p>
                    <p className="text-muted text-xs mt-0.5">{role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 border-t border-border/40 text-center">
        <Reveal>
          <div className="max-w-xl mx-auto">
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl font-normal mb-4">Ready to actually understand your documents?</h2>
            <p className="text-muted mb-8 leading-relaxed">Join students using ContextQ to cut study time and go deeper on what matters.</p>
            <Link
              href="/login"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm inline-block cursor-pointer"
            >
              Get started free
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <Logo />
                <p className="font-semibold text-foreground">ContextQ</p>
              </div>
              <p className="text-muted text-sm leading-relaxed">AI-powered document intelligence for students and researchers. Upload any PDF and get instant, cited answers.</p>
            </div>
            <div className="flex flex-wrap gap-16">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-4">Product</p>
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">Get started</Link>
                  <a href="#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">How it works</a>
                  <a href="#features" className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">Features</a>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-4">Legal</p>
                <div className="flex flex-col gap-3">
                  <Link href="/terms" className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">Terms of service</Link>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-4">Links</p>
                <div className="flex flex-col gap-3">
                  <a href="https://github.com/Pr3v3r/contextq" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">GitHub</a>
                  <a href="https://linkedin.com/in/pravarsingh" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">LinkedIn</a>
                  <a href="mailto:11pravar.singh11@gmail.com" className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">Email</a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-8 border-t border-border/40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-muted text-xs">All systems operational</span>
            </div>
            <p className="text-muted text-xs">© 2026 ContextQ. Built by Pravar Singh.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}