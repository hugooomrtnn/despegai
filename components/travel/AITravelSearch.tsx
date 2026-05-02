"use client";

import { useState } from "react";
import { Plane, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TravelSearchResponse } from "@/types/travel";

const PROMPT_EXAMPLES = [
  "Cliente quiere Japón en septiembre lo más barato posible desde Madrid",
  "Familia de 4 busca escapada a Roma en octubre, presupuesto ajustado",
  "Empresa necesita Madrid-Londres ida y vuelta la semana que viene",
  "Pareja quiere 5 días en París, vuelos cómodos sin escalas",
  "Escapada de fin de semana desde Madrid por menos de 150€, destino flexible",
  "Viaje de empresa Sevilla-Berlín para 2 personas en junio",
];

interface AITravelSearchProps {
  onResults: (data: TravelSearchResponse) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function AITravelSearch({ onResults, onError, isLoading, setIsLoading }: AITravelSearchProps) {
  const [prompt, setPrompt] = useState("");

  async function handleSearch() {
    const trimmed = prompt.trim();
    if (!trimmed || trimmed.length < 5) {
      onError("Por favor, describe qué tipo de viaje quieres (mínimo 5 caracteres).");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/travel-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await res.json();
      if (!res.ok) {
        onError(data.error || "Error al buscar vuelos. Inténtalo de nuevo.");
        return;
      }
      onResults(data);
    } catch {
      onError("No se pudo conectar con el servidor. Verifica tu conexión.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Search box */}
      <div className="relative bg-white rounded-3xl shadow-2xl shadow-violet-100/60 border border-violet-100/80 overflow-hidden">
        <div className="p-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe tu viaje ideal... ej: Quiero ir a algún sitio de playa barato desde Madrid en julio durante 5 días"
            rows={3}
            maxLength={1000}
            disabled={isLoading}
            className="w-full resize-none border-0 bg-transparent p-4 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 disabled:opacity-60"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span>Impulsado por IA · {prompt.length}/1000</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-xs text-gray-400">⌘ + Enter para buscar</span>
              <Button
                onClick={handleSearch}
                disabled={isLoading || prompt.trim().length < 5}
                size="lg"
                className="rounded-2xl px-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Plane className="h-4 w-4" />
                    Buscar vuelos
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Example prompts */}
      <div className="mt-6">
        <p className="text-center text-sm text-gray-500 mb-3">O prueba uno de estos ejemplos:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {PROMPT_EXAMPLES.map((example) => (
            <button
              key={example}
              onClick={() => setPrompt(example)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all disabled:opacity-50"
            >
              {example.length > 55 ? example.slice(0, 52) + "…" : example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
