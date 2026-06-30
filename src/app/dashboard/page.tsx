import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DocumentList from "@/components/DocumentList";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 md:ml-0">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted">{session.user?.email}</p>
          </div>
          <DocumentList />
        </div>
      </main>
    </div>
  );
}