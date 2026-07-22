import { signIn } from "@/auth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full px-6">
        <div className="text-center mb-2">
          <Link href="/" className="text-muted text-sm hover:text-foreground transition-colors">
            ← Back to ContextQ
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to ContextQ</h1>
          <p className="text-muted text-sm">Sign in to access your documents. New here? Your account is created automatically.</p>
        </div>
        <form
          className="w-full"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Continue with Google
          </button>
        </form>
        <p className="text-muted text-xs text-center">
  By continuing, you agree to our{" "}
  <Link href="/terms" className="underline hover:text-foreground transition-colors">
    terms of service
  </Link>
  . No password needed.
</p>
      </div>
    </main>
  );
}