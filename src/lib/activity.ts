import { supabase } from "@/lib/supabase";

export async function logActivity(
  userId: string,
  action: string,
  metadata: Record<string, any> = {}
) {
  const { error } = await supabase.from("activities").insert({
    user_id: userId,
    action,
    metadata,
  });

  if (error) {
    console.error("Activity log failed:", error.message);
  }
}
