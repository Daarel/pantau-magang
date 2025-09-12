// // src/components/AttendanceHistory.tsx
// import SupervisorInboxClient from "@/app/supervisor/inbox/component/SupervisorInboxClient";

// export default async function SupervisorInbox() {
//   return (
//     <>
//       <SupervisorInboxClient />
//     </>
//   );
// }

import { auth } from "@/dump/server/auth";
import SupervisorInboxClient from "@/app/supervisor/inbox/component/SupervisorInboxClient";

export default async function AttendancePage() {
  const session = await auth();
  const supervisorId = session?.id ?? "";

  return <SupervisorInboxClient supervisorId={supervisorId} />;
}
