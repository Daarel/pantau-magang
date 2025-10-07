import { createClient } from "@/lib/supabase/client";

interface InsertActivityLogsParams {
  user_id: string;
  full_name: string;
  action_type: string;
  description: string;
  target_name: string;
}

export const insertActivityLogs = async ({
  user_id,
  full_name,
  action_type,
  description,
  target_name,
}: InsertActivityLogsParams) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("activity_logs").insert([
    {
      user_id,
      full_name: user?.user_metadata.full_name,
      action_type,
      description,
      target_name,
    },
  ]);

  if (error) {
    console.error("Error inserting activity log:", error.message);
    return null;
  }

  return data;
};
