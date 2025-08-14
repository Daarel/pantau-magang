import { supabase } from './supabaseClient'

export async function getAttendanceByUser(userId) {
  return supabase.from('attendance').select('*').eq('user_id', userId)
}
