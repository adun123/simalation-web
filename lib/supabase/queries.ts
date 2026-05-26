import { getSupabaseClient } from "./client";
import type { QuizResult, UserProgress } from "@/types";

// ==================== AUTH ====================

export async function signInAdmin(email: string, password: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function signOutAdmin() {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ==================== MATERI ====================

export async function getMateriList() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase.from("materi").select("*").order("sort_order");
  return data ?? [];
}

export async function upsertMateri(materi: {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  icon: string;
  body: string[];
  layouts?: unknown;
  sort_order: number;
}) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.from("materi").upsert({
    ...materi,
    updated_at: new Date().toISOString(),
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function deleteMateri(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.from("materi").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

// ==================== QUIZ ====================

export async function getQuizQuestions() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase.from("quiz_questions").select("*").order("sort_order");
  return data ?? [];
}

export async function upsertQuizQuestion(q: {
  id?: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  sort_order: number;
}) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.from("quiz_questions").upsert(q);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function deleteQuizQuestion(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.from("quiz_questions").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

// ==================== QUIZ RESULTS ====================

export async function saveQuizResult(result: QuizResult) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { error } = await supabase.from("quiz_results").insert({
    score: result.score,
    total: result.total,
    correct: result.correct,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function getRecentQuizResults(limit = 10): Promise<QuizResult[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("quiz_results")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as QuizResult[];
}

export async function getQuizResultsCount() {
  const supabase = getSupabaseClient();
  if (!supabase) return 0;
  const { count } = await supabase.from("quiz_results").select("*", { count: "exact", head: true });
  return count ?? 0;
}

// ==================== USER PROGRESS ====================

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
