// // src/lib/server/auth.ts
// import { cookies } from 'next/headers';

// type UserRole = 'intern' | 'supervisor' | 'admin';

// export interface SessionData {
//   id: string;
//   role: UserRole;
// }

// export async function auth(): Promise<SessionData | null> {
//   try {
//     const cookieStore = cookies();
//     const sessionCookie = cookieStore.get('session')?.value;
    
//     if (!sessionCookie) return null;
    
//     const session = JSON.parse(sessionCookie);
    
//     // Validasi struktur session
//     if (session && 
//         typeof session.id === 'string' && 
//         ['intern', 'supervisor', 'admin'].includes(session.role)) {
//       return session;
//     }
    
//     return null;
//   } catch (error) {
//     console.error('Error parsing session cookie:', error);
//     return null;
//   }
// }