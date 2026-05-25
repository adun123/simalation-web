import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client (client-side).
 *
 * The app works fully with dummy data when env vars are not set.
 * Returns `null` if Supabase is not configured so callers can fall back gracefully.
 */
let _client: SupabaseClient | null | undefined;

export function getSupabaseClient(): SupabaseClient | null {
  if (_client !== undefined) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    _client = null;
    return _client;
  }
  _client = createClient(url, anon, {
    auth: { persistSession: false },
  });
  return _client;
}
