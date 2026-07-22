"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

// --- Custom Animations & Textures ---
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .bg-grid-pattern {
    background-size: 32px 32px;
    background-image: 
      linear-gradient(to right, rgba(128, 128, 128, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(128, 128, 128, 0.04) 1px, transparent 1px);
  }
`;

// --- Hooks & Utility Components ---

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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

function useScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrolled;
}

function useMouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="currentColor" className="text-primary" />
      <text x="14" y="20" fontFamily="serif" fontSize="16" fontWeight="bold" fill="var(--primary-foreground)" textAnchor="middle">Q</text>
    </svg>
  );
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="border border-border/40 rounded-xl bg-background overflow-hidden cursor-pointer hover:border-primary/40 transition-colors shadow-sm"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6 font-semibold flex justify-between items-center text-foreground">
        {q}
        {/* + to x animation */}
        <span className={`text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </div>
      <div className={`px-6 text-muted-foreground text-sm leading-relaxed transition-all duration-300 ${isOpen ? "pb-6 max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        {a}
      </div>
    </div>
  );
}

export default function Home() {
  const isScrolled = useScroll();
  const mousePosition = useMouseGlow();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20 relative">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Background Depth: Grid, Dual Gradients, and Mouse Glow */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] right-0 translate-x-1/3 w-[500px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none z-0" />
      
      {/* Dynamic Mouse Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block" 
        style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(128,128,128,0.06), transparent 40%)` }} 
      />

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? "border-b border-border/50 bg-background/80 shadow-sm" : "border-b border-border/20 bg-background/50"
      }`}>
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-semibold tracking-tight">ContextQ</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <a href="#comparison" className="px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-foreground transition-colors">Why ContextQ</a>
          <a href="#features" className="px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-foreground transition-colors">Features</a>
          <a href="#faq" className="px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-foreground transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-[95vh] px-8 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden z-10">
        {/* Left: Copy & CTA */}
        <div className="flex flex-col items-start text-left max-w-xl z-10 w-full lg:w-[45%]">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-surface text-muted-foreground text-xs mb-6 font-medium shadow-sm">
            Powered by Retrieval-Augmented Generation
          </div>

          <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-6xl md:text-7xl lg:text-[5.5rem] font-normal tracking-tight leading-[1.1] mb-6">
            Your documents<br/>can finally talk back.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mb-10 leading-relaxed">
            Chat with any PDF. Get cited answers instantly without manually searching through hundreds of pages.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="bg-foreground text-background px-8 py-4 rounded-full font-medium hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/10 transition-all text-sm flex items-center gap-2"
            >
              Upload your first PDF <span>→</span>
            </Link>
            <a href="#comparison" className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors text-sm font-medium group">
              Learn More <span className="text-lg leading-none group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </div>
          
          <div className="mt-12 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Built for</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/80 font-medium">
              <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> Lecture Notes</span>
              <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> Research Papers</span>
              <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> Tech Docs</span>
              <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> Contracts</span>
              <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> Books</span>
            </div>
          </div>
        </div>

        {/* Right: Actual Product Screenshot Wrapper */}
        <div className="relative w-full lg:w-[55%] max-w-4xl mt-20 lg:mt-0 z-10 perspective-1000 pl-0 lg:pl-10">
          
          {/* Main App Window - Group added for hover effects */}
          <div className="w-full aspect-[16/9] bg-surface rounded-xl shadow-2xl border border-border/40 animate-float -rotate-2 hover:rotate-0 transition-transform duration-700 ease-out flex flex-col group">
            {/* macOS Style Browser Frame */}
            <div className="h-10 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center px-4 gap-2 rounded-t-xl z-20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
            </div>
            
            {/* Screenshot Container */}
            <div className="flex-1 w-full bg-background relative overflow-hidden rounded-b-xl z-10">
                <Image
                  src="/screenshot3.png" 
                  alt="ContextQ Chat Interface" 
                  fill
                  priority
                  className={`object-cover object-top transition-all duration-700 group-hover:scale-[1.02] ${
                    imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm scale-105"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                  }}
                />
                
                {/* Fallback if image is missing */}
                <div className="fallback hidden absolute inset-0 flex flex-col items-center justify-center border-dashed border-2 border-border/50 m-4 rounded-lg bg-surface/50 text-muted-foreground">
                    <svg className="w-12 h-12 text-primary/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="font-medium text-foreground">Save your app screenshot as</p>
                    <p className="text-sm mt-1 font-mono bg-background px-2 py-1 rounded">public/screenshot.webp</p>
                </div>
            </div>
          </div>

         
          

        </div>
      </section>

      {/* The RAG Comparison Section */}
      <section id="comparison" className="py-32 px-8 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl md:text-5xl font-normal text-center mb-6">Stop reading. Start understanding.</h2>
            <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">Manual reading relies on exact keyword matching. ContextQ uses AI to understand the meaning of your document.</p>
          </Reveal>
          
          <Reveal delay={150}>
            <div className="grid md:grid-cols-2 bg-surface/50 border border-border/40 rounded-3xl overflow-hidden shadow-xl">
              {/* Manual Reading (Bad) */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/40 relative">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">Manual Reading</div>
                <ul className="space-y-6 text-muted-foreground">
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-destructive shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 9-6 6"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 9 6 6"/></svg>
                    Scroll blindly through 200+ pages
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-destructive shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 9-6 6"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 9 6 6"/></svg>
                    Ctrl+F hoping the exact word is there
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-destructive shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 9-6 6"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 9 6 6"/></svg>
                    Lose your place switching between sections
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-destructive shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 9-6 6"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 9 6 6"/></svg>
                    Manual, time-consuming note-taking
                  </li>
                </ul>
              </div>

              {/* ContextQ (Good) */}
              <div className="p-8 md:p-12 bg-background relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[64px]" />
                <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-8 flex items-center gap-2">
                  <Logo /> ContextQ
                </div>
                <ul className="space-y-6 text-foreground font-medium">
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4"/></svg>
                    Ask one question in plain English
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4"/></svg>
                    Semantic understanding (meaning, not just words)
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4"/></svg>
                    Get an instant, accurate answer
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4"/></svg>
                    AI provides clickable citations to prove it
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-8 bg-surface/30 z-10 relative border-y border-border/20">
  <div className="max-w-5xl mx-auto">
    <Reveal>
      <h2
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="text-4xl md:text-5xl font-normal text-center mb-16"
      >
        Designed for deep work.
      </h2>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Feature 1 - Semantic Search */}
      <Reveal
        delay={100}
        className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-background border border-border/40 p-8 shadow-sm hover:shadow-md transition-all"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] transition-opacity opacity-0 group-hover:opacity-100" />

        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold mb-2">
          Semantic Search
        </h3>

        <p className="text-muted-foreground text-sm max-w-sm relative z-10 mb-6">
          Finds meaning, not just exact keywords. Ask naturally.
        </p>

        <div className="bg-surface border border-border/50 rounded-xl p-4 shadow-sm text-sm font-medium w-64 md:w-80 mt-8 relative z-10 group-hover:border-primary/20 transition-colors">

          <div className="flex items-start gap-3 mb-3 text-muted-foreground">
            <div className="w-6 h-10 rounded-full bg-secondary shrink-0 flex items-center justify-center text-[10px]">
              You:
            </div>

            <div className="bg-background border border-border/40 rounded-lg rounded-tl-none p-2 text-xs">
              Explain the mitochondria.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-8 rounded-full bg-primary/20 text-primary shrink-0 flex items-center justify-center text-[10px]">
              <Logo />
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-lg rounded-tl-none p-2 text-xs text-foreground">
              It generates most of the cell's ATP...
            </div>
          </div>

        </div>
      </Reveal>


      {/* Feature 2 - Private Docs */}
      <Reveal
        delay={150}
        className="group relative overflow-hidden rounded-3xl bg-background border border-border/40 p-8 shadow-sm hover:shadow-md transition-all"
      >
        <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center mb-6">
          <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold mb-2">
          Private Docs
        </h3>

        <p className="text-muted-foreground text-sm">
          Your files remain yours. Isolated vaults for every document.
        </p>
      </Reveal>


      {/* Feature 3 - Streaming AI */}
      <Reveal
        delay={200}
        className="group relative overflow-hidden rounded-3xl bg-background border border-border/40 p-8 shadow-sm hover:shadow-md transition-all"
      >
        <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center mb-6">
          <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold mb-2">
          Streaming AI
        </h3>

        <p className="text-muted-foreground text-sm">
          Answers appear instantly as they're generated. Zero waiting time.
        </p>
      </Reveal>

    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-8 z-10 relative">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl md:text-5xl font-normal text-center mb-16">Frequently Asked</h2>
          </Reveal>
          <div className="space-y-4">
            <Reveal delay={100}><Accordion q="Is my PDF private?" a="Yes. Your documents are stored securely and isolated in their own vaults. They are never used to train global AI models." /></Reveal>
            <Reveal delay={150}><Accordion q="Does it hallucinate?" a="ContextQ is strictly constrained to the text within your uploaded document. If the answer isn't in the PDF, the AI is instructed to tell you it doesn't know." /></Reveal>
            <Reveal delay={200}><Accordion q="Is there a free plan?" a="Yes. The free plan allows you to upload and query a limited number of standard-sized PDFs every month. You don't need a credit card to start." /></Reveal>
            <Reveal delay={250}><Accordion q="What is the file size limit?" a="Currently, free users can upload PDFs up to 20MB or 120 pages. Premium users have significantly higher limits designed for massive textbooks and research collections." /></Reveal>
          </div>
        </div>
      </section>

      {/* Massive CTA */}
      <section className="py-40 px-8 border-t border-border/20 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
        <Reveal>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl md:text-7xl font-normal mb-8 leading-[1.1]">
              Ask your documents anything.
            </h2>
            <Link
              href="/login"
              className="bg-foreground text-background px-10 py-5 rounded-full font-medium hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/10 transition-all text-lg inline-flex items-center gap-2"
            >
              Upload your first PDF <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-border/20 bg-background relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <Logo />
                <span className="font-semibold text-sm">ContextQ</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                © {new Date().getFullYear()} ContextQ. Built by Pravar.
              </div>
            </div>
            {/* Status Indicator */}
            <div className="flex items-center gap-2 mt-2">
               <span className="relative flex h-2.5 w-2.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
               </span>
               <Link href="/status" className="text-xs text-muted-foreground font-medium hover:text-foreground transition-colors">All systems operational</Link>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium">
            <a href="#comparison" className="hover:text-foreground transition-colors">Why ContextQ</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium">
            <a href="https://github.com/Pr3v3r/contextq" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              Stars
            </a>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}