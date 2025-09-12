import { login } from './actions'
export default function LoginPage() {
  return (
    <form>
      <label htmlFor="nomorInduk">Nomor Induk:</label>
      <input id="nomorInduk" name="nomorInduk" type="number" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
    </form>
  )
}

// "use client";

// import { useRouter } from "next/navigation";
// import LoginForm from "@/components/LoginForm";

// type UserRole = "intern" | "supervisor" | "admin";

// export interface User {
//   role: UserRole;
// }

// export default function LoginPage() {
//   const router = useRouter();

//   const handleLogin = (user: User) => {
//     // Arahkan ke halaman dashboard sesuai role
//     switch (user.role) {
//       case "intern":
//         router.push("/intern/dashboard");
//         break;
//       case "supervisor":
//         router.push("/supervisor/dashboard");
//         break;
//       case "admin":
//         router.push("/admin/dashboard");
//         break;
//       default:
//         router.push("/intern/dashboard");
//     }
//   };
//   return (
//     <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
//       <LoginForm onLogin={handleLogin} />
//     </main>
//   );
// }
