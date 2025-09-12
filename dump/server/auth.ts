

// // src/lib/server/auth.ts
// import { cookies } from 'next/headers';

// type SessionData = {
//   id: string;
//   role: 'intern' | 'supervisor' | 'admin';
//   // add other session properties if needed
// };

// export async function auth(): Promise<SessionData | null> {
//   try {
//     const cookieStore = cookies(); // Tidak perlu await
//     const sessionCookie = (await cookieStore).get('session')?.value;


//     const session = JSON.parse(sessionCookie!);

//     // if (session &&
//     //     typeof session.id === 'string' &&
//     //     ['intern', 'supervisor', 'admin'].includes(session.role)) {
//     //   return session;
//     // }

//     return session;
//   } catch (error) {
//     console.error('Error parsing session cookie:', error);
//     return null;
//   }
// }