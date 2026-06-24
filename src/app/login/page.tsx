import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">ContextQ</h1>
        <p className="text-zinc-500">Sign in to access your documents</p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="rounded-lg bg-black px-6 py-3 text-white hover:bg-zinc-800"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </main>
  );
}