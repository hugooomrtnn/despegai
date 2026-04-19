"use client";

import { Plane, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
            <Plane className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">
            Fly<span className="text-violet-600">AI</span>
          </span>
          <div className="hidden sm:flex items-center gap-1 ml-2 px-2 py-0.5 bg-violet-50 rounded-full border border-violet-100">
            <Sparkles className="h-3 w-3 text-violet-500" />
            <span className="text-xs font-medium text-violet-600">Beta</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Cómo funciona
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Precios
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-gray-600">
            Iniciar sesión
          </Button>
          <Button size="sm">
            Registrarse gratis
          </Button>
        </div>
      </div>
    </header>
  );
}
