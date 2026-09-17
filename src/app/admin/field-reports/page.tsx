import { requireAdminSession } from "@/lib/admin";
import { getPendingReports } from "@/lib/fieldReports";
import FieldReportModerationClient from "./FieldReportModerationClient";

export const dynamic = "force-dynamic";

export default async function AdminFieldReportsPage() {
  await requireAdminSession();
  const reports = await getPendingReports();
  return <FieldReportModerationClient initialReports={reports} />;
}
