import { createClient } from "@/lib/supabase/server";

interface InsertActivityLogsParams {
  action_type:
    | "update_intern"
    | "insert_intern"
    | "delete_intern"
    | "change_password"
    | "update_supervisor"
    | "insert_supervisor"
    | "delete_supervisor";
  description: string;
  target_name: string;
}

export const insertActivityLogs = async ({
  action_type,
  description,
  target_name,
}: InsertActivityLogsParams) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("activity_logs").insert([
    {
      admin_id: user?.id,
      full_name: user?.user_metadata.full_name,
      action_type,
      description,
      target_name,
    },
  ]);

  console.log(data);

  if (error) {
    console.error("Error inserting activity log:", error.message);
    return null;
  }

  return data;
};
