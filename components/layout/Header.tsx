"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, X } from "lucide-react";

export function Header() {
  const [toast, setToast] = useState(false);

  function scrollToSearch() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => document.getElementById("search-input")?.focus(), 400);
  }

  function showComingSoon() {
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  }

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
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">
            Cómo funciona
          </a>
          <Link href="/guias" className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">
            Guías
          </Link>
          <Link href="/consejos" className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">
            Consejos
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={showComingSoon}
            className="hidden sm:block text-sm text-white/50 hover:text-white/90 transition-colors font-medium px-3 py-1.5"
          >
            Iniciar sesión
          </button>
          <button
            onClick={scrollToSearch}
            className="text-sm font-semibold px-4 py-2 rounded-xl btn-cta transition-all"
          >
            Empezar gratis
          </button>
        </div>

      </div>

      {/* Toast próximamente */}
      {toast && (
        <div className="fixed top-20 right-4 z-[100] flex items-start gap-3 glass-dark border border-white/10 rounded-2xl px-4 py-3 shadow-2xl max-w-xs animate-fade-in">
          <div>
            <p className="text-sm font-semibold text-white/90">🚀 Próximamente</p>
            <p className="text-xs text-white/50 mt-0.5">Los registros de usuario estarán disponibles muy pronto.</p>
          </div>
          <button onClick={() => setToast(false)} className="text-white/30 hover:text-white/70 transition-colors mt-0.5">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
}
