import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * `supabase` is null when env vars are not configured yet.
 * Every call site should check for that and degrade gracefully
 * (e.g. the Join form shows a "not configured" message instead of crashing).
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);

// ---- Table name constants (see supabase/schema.sql) ----
export const TABLES = {
  members: "members",
  boardMembers: "board_members",
  events: "events",
  projects: "projects",
  gallery: "gallery",
  announcements: "announcements",
  testimonials: "testimonials",
  joinRequests: "join_requests",
} as const;
