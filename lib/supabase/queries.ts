import { getSupabaseClient } from "./client";
import type { QuizResult, UserProgress } from "@/types";

/**
 * Persist quiz result. No-op if Supabase is not configured.
 */
export async function saveQuizResult(result: QuizResult): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.from("quiz_results").insert({
    score: result.score,
    total: result.total,
    correct: result.correct,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function upsertUserProgress(progress: UserProgress) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.from("user_progress").upsert({
    module: progress.module,
    completed: progress.completed,
    progress_percent: progress.progress_percent,
    updated_at: new Date().toISOString(),
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function getRecentQuizResults(limit = 10): Promise<QuizResult[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("quiz_results")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as QuizResult[];
}
