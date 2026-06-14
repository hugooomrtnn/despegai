"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plane, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollToSearch() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => document.getElementById("search-input")?.focus(), 400);
  }

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  }

  const userInitial = user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
      <div className="absolute inset-0 bg-[#030305]/85 backdrop-blur-xl border-b border-white/[0.06]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all">
            <Plane className="h-4 w-4 text-white" />
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">
            Despeg<span className="text-orange-400">ai</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link href="/consultas"    className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">Consultas</Link>
          <Link href="/destinos"     className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">Destinos</Link>
          <Link href="/guias"        className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">Guías</Link>
          <Link href="/consejos"     className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">Consejos</Link>
          <Link href="/quienes-somos" className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">Quiénes somos</Link>
        </nav>

        {/* Auth / CTA */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
          ) : user ? (
            /* Usuario logueado */
            <div className="relative">
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {userInitial}
                </div>
                <span className="hidden sm:block text-xs text-white/70 font-medium max-w-[120px] truncate">
                  {user.email}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 text-white/40 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 glass-dark border border-white/10 rounded-2xl py-1.5 shadow-2xl z-[100]">
                  <div className="px-4 py-2.5 border-b border-white/[0.06]">
                    <p className="text-xs font-semibold text-white/80 truncate">{user.email}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">Búsquedas ilimitadas</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/60 hover:text-white/90 hover:bg-white/5 transition-all"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Sin sesión */
            <>
              <Link
                href="/login"
                className="hidden sm:block text-sm text-white/50 hover:text-white/90 transition-colors font-medium px-3 py-1.5"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="text-sm font-semibold px-4 py-2 rounded-xl btn-cta transition-all"
              >
                Empezar gratis
              </Link>
            </>
          )}

          {/* Botón buscar (cuando hay sesión) */}
          {user && (
            <button
              onClick={scrollToSearch}
              className="text-sm font-semibold px-4 py-2 rounded-xl btn-cta transition-all"
            >
              Buscar
            </button>
          )}
        </div>

      </div>

      {/* Cierre del menú al hacer clic fuera */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90]" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
