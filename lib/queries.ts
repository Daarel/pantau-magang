import { supabase } from "./supabase/client";

export async function getAttendanceByUser(userId: number) {
  return supabase.from("attendance").select("*").eq("user_id", userId);
}
