import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DocumentList from "@/components/DocumentList";
import UploadSection from "@/components/UploadSection";
import ChatInterface from "@/components/ChatInterface";
import { signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted">{session.user?.email}</p>
<form action={async () => {
  "use server";
  await signOut({ redirectTo: "/login" });
}}>
  <button type="submit" className="text-sm text-muted hover:text-foreground">
    Sign out
  </button>
</form>
          </div>
          <UploadSection />
          <ChatInterface
  documentId="1784266478737-10_PE_124145786"
  documentName="EV Charging Challenges"
/>
          <DocumentList />
        </div>
      </main>
    </div>
  );
}