"use client";

import Link from "next/link";
import { X, Plane, Sparkles, Lock } from "lucide-react";

interface Props {
  onClose: () => void;
  searchesUsed: number;
  limit: number;
}

export function SearchLimitModal({ onClose, searchesUsed, limit }: Props) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-dark border border-white/[0.1] rounded-3xl p-8 text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icono */}
        <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-sky-500/30">
          <Lock className="h-8 w-8 text-white" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          Has agotado tus búsquedas gratuitas
        </h2>
        <p className="text-white/45 text-sm mb-2">
          Has usado {searchesUsed} de {limit} búsquedas gratuitas del día.
        </p>
        <p className="text-white/45 text-sm mb-7">
          Crea una cuenta gratis para tener{" "}
          <span className="text-sky-400 font-semibold">búsquedas ilimitadas</span> y acceso a tu historial.
        </p>

        {/* Beneficios */}
        <div className="bg-white/5 rounded-2xl p-4 mb-6 text-left space-y-2">
          {[
            "Búsquedas ilimitadas cada día",
            "Historial de tus búsquedas",
            "Guarda tus vuelos favoritos",
            "Alertas de precio (próximamente)",
          ].map(b => (
            <div key={b} className="flex items-center gap-2.5">
              <Sparkles className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
              <span className="text-sm text-white/70">{b}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link
            href="/registro"
            className="w-full btn-cta py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
          >
            <Plane className="h-4 w-4" />
            Crear cuenta gratis
          </Link>
          <Link
            href="/login"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white/90 border border-white/10 hover:border-white/25 flex items-center justify-center transition-all"
          >
            Ya tengo cuenta — Iniciar sesión
          </Link>
        </div>

        <p className="text-xs text-white/25 mt-4">
          Mañana se reinicia el contador de búsquedas gratuitas.
        </p>
      </div>
    </div>
  );
}
