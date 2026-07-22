import { signIn } from "@/auth";
import Link from "next/link";
import Image from "next/image";

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
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="currentColor" className="text-primary" />
      <text x="14" y="20" fontFamily="serif" fontSize="16" fontWeight="bold" fill="var(--primary-foreground)" textAnchor="middle">Q</text>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen bg-background font-sans relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none z-0" />
      
      {/* Left Column: Auth Flow */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative z-10">
        
        {/* Subtle Back Link */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12">
          <Link href="/" className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
          </Link>
        </div>

        {/* Auth Card */}
        <div className="w-full max-w-[420px] bg-surface/50 backdrop-blur-xl border border-border/40 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col items-center">
          
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="mb-6 rounded-2xl shadow-sm border border-border/50 bg-background p-2">
              <Logo />
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl md:text-4xl font-normal text-foreground mb-3 leading-tight">
              Your documents<br/>are waiting.
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
              Sign in with Google to securely access your PDFs and chat history.
            </p>
          </div>

          <form
            className="w-full mb-8"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full bg-background border border-border/50 text-foreground hover:bg-surface rounded-2xl py-3.5 px-4 font-medium hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-3 text-sm"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          {/* Reassurance Feature List */}
          <div className="w-full space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4"/></svg>
              Secure Google authentication
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4"/></svg>
              Chat with YOUR documents
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4"/></svg>
              Conversations saved automatically
            </div>
          </div>

          <div className="w-full border-t border-border/40 pt-6 text-center space-y-2">
            <p className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
              Powered by Google Auth
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-[260px] mx-auto">
              We never store your password. By continuing, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-foreground transition-colors font-medium">
                Terms of Service
              </Link>.
            </p>
          </div>

        </div>
      </div>

      {/* Right Column: Screenshot Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surface/30 border-l border-border/20 items-center justify-center p-12 relative z-10 overflow-hidden">
        
        {/* Subtle aesthetic glow for the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-2xl aspect-[16/10] rounded-2xl shadow-2xl border border-border/40 bg-background overflow-hidden flex flex-col rotate-2 hover:rotate-0 transition-transform duration-700 ease-out relative">
          
          {/* macOS Browser Frame */}
          <div className="h-10 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
          </div>
          
          {/* App Screenshot */}
          <div className="flex-1 w-full relative">
            <Image
              src="/screenshot2.png" 
              alt="ContextQ App Interface" 
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </main>
  );
}