"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function RegistroPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [done, setDone]         = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setDone(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al registrarse";
      if (msg.includes("already registered") || msg.includes("User already registered")) {
        setError("Este email ya está registrado. ¿Quieres iniciar sesión?");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <main className="min-h-screen hero-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">¡Cuenta creada!</h1>
          <p className="text-white/50 mb-6">
            Te hemos enviado un email de confirmación a <span className="text-white/80 font-semibold">{email}</span>. Haz clic en el enlace para activar tu cuenta.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 btn-cta px-6 py-2.5 rounded-xl text-sm font-bold text-white">
            Ir a iniciar sesión
          </Link>
        </div>
      </main>
    );
  }

  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
  const strengthLabel = ["", "Débil", "Buena", "Fuerte"];
  const strengthColor = ["", "bg-red-500", "bg-amber-400", "bg-emerald-400"];

  return (
    <main className="min-h-screen hero-dark flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-white text-xl tracking-tight">
              Despeg<span className="text-orange-400">ai</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Crea tu cuenta gratis</h1>
          <p className="text-white/40 text-sm mt-1">Búsquedas ilimitadas y sin límites</p>
        </div>

        {/* Card */}
        <div className="glass-dark border border-white/[0.08] rounded-3xl p-8">
          <form onSubmit={handleRegister} className="space-y-4">

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
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 transition-all"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Barra de fortaleza */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : "bg-white/10"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-white/40">{strengthLabel[strength]}</span>
                </div>
              )}
            </div>

            {/* Confirmar */}
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5">Confirmar contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type={showPass ? "text" : "password"}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  placeholder="Repite la contraseña"
                  className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all ${
                    confirm && confirm !== password
                      ? "border-red-500/40 focus:border-red-500/60"
                      : "border-white/10 focus:border-sky-500/50"
                  }`}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}{" "}
                {error.includes("ya está registrado") && (
                  <Link href="/login" className="underline font-semibold">Iniciar sesión</Link>
                )}
              </div>
            )}

            {/* Términos */}
            <p className="text-xs text-white/30 leading-relaxed">
              Al registrarte aceptas los{" "}
              <Link href="/terminos" className="text-white/50 hover:text-white/70 underline">términos y condiciones</Link>{" "}
              y la{" "}
              <Link href="/politica-de-privacidad" className="text-white/50 hover:text-white/70 underline">política de privacidad</Link>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password || !confirm}
              className="w-full btn-cta py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Creando cuenta...</>
              ) : (
                "Crear cuenta gratis"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/35 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
