// src/lib/server/auth.ts
import { cookies } from 'next/headers';

export async function auth(): Promise<SessionData | null> {
  try {
    const cookieStore = cookies(); // Tidak perlu await
    const sessionCookie = cookieStore.get('session')?.value;
    
    if (!sessionCookie) return null;
    
    const session = JSON.parse(sessionCookie);
    
    if (session && 
        typeof session.id === 'string' && 
        ['intern', 'supervisor', 'admin'].includes(session.role)) {
      return session;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return null;
  }
}