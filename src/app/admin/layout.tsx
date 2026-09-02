import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { isAdminEmail } from "@/lib/admin";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "Admin Panel | Raste Aur Raahein",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) {
    redirect("/");
  }

  return <AdminShell>{children}</AdminShell>;
}
