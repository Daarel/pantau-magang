import { Suspense } from "react";
import AdminSupervisorClient from './components/AdminSupervisorClient';

export default function AdminUserPage() {
  // jika ingin fetch data dari DB: make this async and fetch here, lalu pass data ke client
  return (
    <Suspense fallback={<div>Tunggu ya...</div>}>
      <div className='min-h-screen bg-gray-50 p-6'>
        <AdminSupervisorClient />
      </div>
    </Suspense>
  );
}
