import { requireAdminSession } from "@/lib/admin";
import { listPendingSubmissions } from "@/lib/tripSubmissions";
import SubmissionModerationClient from "./SubmissionModerationClient";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  await requireAdminSession();
  const submissions = await listPendingSubmissions();
  return <SubmissionModerationClient initialSubmissions={submissions} />;
}
