import { auth } from "@/dump/server/auth";
import AttendanceClient from "@/app/supervisor/attendance/component/AttendanceClient";

export default async function AttendancePage() {
  const session = await auth();
  const supervisorId = session?.id ?? "";

  return <AttendanceClient supervisorId={supervisorId} />;
}
