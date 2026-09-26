import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseAnonKey.trim().length > 0 &&
      !supabaseAnonKey.includes("your-supabase-anon-key") &&
      supabaseUrl.startsWith("http")
  );
};

export const isMockFallbackEnabled = (): boolean => {
  const forceMock = import.meta.env.VITE_USE_MOCK_FALLBACK === "true";
  return forceMock || !isSupabaseConfigured();
};

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (clientInstance) return clientInstance;

  const url = supabaseUrl || "https://placeholder.supabase.co";
  const key = supabaseAnonKey || "placeholder-anon-key";

  clientInstance = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return clientInstance;
};

export const supabase = getSupabaseClient();
