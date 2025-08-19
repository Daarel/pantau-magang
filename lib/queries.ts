import { supabase } from './supabaseClient'

export async function getAttendanceByUser(userId: number) {
  return supabase.from('attendance').select('*').eq('user_id', userId)
}
