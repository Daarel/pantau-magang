import { Suspense } from "react";
import AdminUserClient from "./components/AdminUserClient";
import Loading from "../loading";

export default function AdminUserPage() {
  // jika ingin fetch data dari DB: make this async and fetch here, lalu pass data ke client
  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-gray-50 p-6'>
        <AdminUserClient />
      </div>
    </Suspense>
  );
}
