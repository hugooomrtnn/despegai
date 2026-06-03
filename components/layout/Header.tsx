"use client";

import { Plane } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all">
            <Plane className="h-4 w-4 text-white" />
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">
            Fly<span className="text-orange-400">AI</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-white/50 hover:text-white/90 transition-colors font-medium">
            Cómo funciona
          </a>
          <a href="#" className="text-sm text-white/50 hover:text-white/90 transition-colors font-medium">
            Precios
          </a>
          <a href="#" className="text-sm text-white/50 hover:text-white/90 transition-colors font-medium">
            Para agencias
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm text-white/60 hover:text-white/90 transition-colors font-medium px-3 py-1.5">
            Iniciar sesión
          </button>
          <button className="text-sm font-semibold px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0">
            Empezar gratis
          </button>
        </div>
      </div>
    </header>
  );
}
