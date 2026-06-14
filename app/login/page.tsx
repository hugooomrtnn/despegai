"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plane, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [mode, setMode]         = useState<"password" | "magic">("password");
  const [sent, setSent]         = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      if (mode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw error;
        setSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al iniciar sesión";
      if (msg.includes("Invalid login credentials")) {
        setError("Email o contraseña incorrectos. Comprueba tus datos.");
      } else if (msg.includes("Email not confirmed")) {
        setError("Confirma tu email antes de iniciar sesión. Revisa tu bandeja de entrada.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen hero-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sky-500/30">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Revisa tu email</h1>
          <p className="text-white/50 mb-6">
            Te hemos enviado un enlace mágico a <span className="text-white/80 font-semibold">{email}</span>. Haz clic en él para entrar directamente.
          </p>
          <button onClick={() => setSent(false)} className="text-sm text-sky-400 hover:text-sky-300 transition-colors">
            Usar otro método
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen hero-dark flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-white text-xl tracking-tight">
              Despeg<span className="text-orange-400">ai</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Bienvenido de nuevo</h1>
          <p className="text-white/40 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        {/* Card */}
        <div className="glass-dark border border-white/[0.08] rounded-3xl p-8">

          {/* Selector de modo */}
          <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("password")}
              className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${mode === "password" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              Contraseña
            </button>
            <button
              onClick={() => setMode("magic")}
              className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${mode === "magic" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              Enlace mágico
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Contraseña (solo en modo password) */}
            {mode === "password" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-white/50">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => setMode("magic")}
                    className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:bg-white/8 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full btn-cta py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Entrando...</>
              ) : mode === "magic" ? (
                "Enviar enlace mágico"
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/35 mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
