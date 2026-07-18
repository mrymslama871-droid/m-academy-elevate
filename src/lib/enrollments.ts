import { supabase } from "@/integrations/supabase/client";

export async function enrollInSubject(userId: string, subjectId: string) {
  const { error } = await supabase
    .from("enrollments")
    .upsert(
      { user_id: userId, subject_id: subjectId, status: "pending" },
      { onConflict: "user_id,subject_id" },
    );
  if (error) throw error;
}

export async function fetchMyEnrollments(userId: string) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("id, subject_id, progress, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
