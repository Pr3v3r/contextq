import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ClientDashboard from "./ClientDashboard";

export default async function DashboardPage() {
  // 1. Securely check auth on the server
  const session = await auth();
  
  // 2. If they aren't logged in, redirect them before rendering anything
  if (!session) {
    redirect("/login");
  }

  // 3. If they are logged in, pass the session to the client component
  return <ClientDashboard session={session} />;
}