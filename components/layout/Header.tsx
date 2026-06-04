"use client";

import { Plane } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
      <div className="absolute inset-0 bg-[#030305]/85 backdrop-blur-xl border-b border-white/[0.06]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all">
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
          <a href="#destinos" className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">
            Destinos
          </a>
          <a href="#" className="text-sm text-white/45 hover:text-white/90 transition-colors font-medium">
            Para agencias
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm text-white/50 hover:text-white/90 transition-colors font-medium px-3 py-1.5">
            Iniciar sesión
          </button>
          <button className="text-sm font-semibold px-4 py-2 rounded-xl btn-cta transition-all">
            Empezar gratis
          </button>
        </div>

      </div>
    </header>
  );
}
