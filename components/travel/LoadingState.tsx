"use client";

import { Plane, Sparkles } from "lucide-react";

const LOADING_MESSAGES = [
  "Interpretando tu viaje ideal...",
  "Buscando los mejores vuelos...",
  "Analizando precios y opciones...",
  "Calculando la mejor relación calidad/precio...",
  "Casi listo, preparando tus recomendaciones...",
];

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-200">
          <Plane className="h-9 w-9 text-white animate-pulse" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-violet-100">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">Buscando tus vuelos</h3>
      <p className="text-sm text-gray-500 text-center mb-8 max-w-xs">
        La IA está analizando tu petición y buscando las mejores opciones para ti
      </p>

      <div className="w-full max-w-sm space-y-3">
        {LOADING_MESSAGES.map((msg, i) => (
          <div
            key={msg}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse flex-shrink-0"
              style={{ animationDelay: `${i * 0.4}s` }} />
            <p className="text-sm text-gray-600">{msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
