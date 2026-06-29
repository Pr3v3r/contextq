import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UploadSection from "@/components/UploadSection";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome to ContextQ</h1>
          <p className="text-zinc-500">{session.user?.email}</p>
        </div>
        <UploadSection />
      </div>
    </main>
  );
}