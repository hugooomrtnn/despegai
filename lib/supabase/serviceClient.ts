import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con la service role key: solo para uso server-side sin sesión de usuario
// (cron jobs, tareas administrativas). Salta las políticas RLS, así que nunca se
// debe importar desde código que corra en el navegador.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service role no configurado (falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function isServiceRoleConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
