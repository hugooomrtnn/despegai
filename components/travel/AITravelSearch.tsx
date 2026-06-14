"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Plane, ArrowRight, Loader2, Sparkles } from "lucide-react";
import type { TravelSearchResponse } from "@/types/travel";

const PROMPT_EXAMPLES = [
  "Vuelos a Egipto desde Madrid en agosto",
  "Escapada romántica a París 4 días en octubre",
  "Familia busca playa en Grecia, presupuesto 800€",
  "Madrid-Londres ida y vuelta la semana que viene",
  "Destino sorpresa barato desde Barcelona en mayo",
  "Japón 10 días desde Madrid en septiembre",
];

interface AITravelSearchProps {
  onResults: (data: TravelSearchResponse) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  value?: string;
  onChange?: (v: string) => void;
  onBeforeSearch?: () => boolean; // devuelve false para cancelar la búsqueda
}

export interface AITravelSearchHandle {
  submit: (queryOverride?: string) => void;
}

export const AITravelSearch = forwardRef<AITravelSearchHandle, AITravelSearchProps>(
  function AITravelSearch({ onResults, onError, isLoading, setIsLoading, value, onChange, onBeforeSearch }, ref) {
    const [internalPrompt, setInternalPrompt] = useState("");
    const prompt    = value    !== undefined ? value    : internalPrompt;
    const setPrompt = onChange !== undefined ? onChange : setInternalPrompt;

    async function handleSearch(queryOverride?: string, skipBeforeSearch = false) {
      if (!skipBeforeSearch && onBeforeSearch && !onBeforeSearch()) return;
      const trimmed = (queryOverride ?? prompt).trim();
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

    useImperativeHandle(ref, () => ({
      // skipBeforeSearch=true porque el check ya se hizo en handleDirectSearch
      submit: (queryOverride?: string) => handleSearch(queryOverride, true),
    }));

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSearch();
      }
    }

    return (
      <div className="w-full max-w-3xl mx-auto">
        {/* Search box glass */}
        <div className="glass-search rounded-3xl overflow-hidden">
          <div className="p-2">
            <textarea
              id="search-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ej: Vuelos a Italia para 2 personas en julio, sin escalas, máximo 400€..."
              rows={3}
              maxLength={1000}
              disabled={isLoading}
              className="w-full resize-none border-0 bg-transparent p-4 text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-0 disabled:opacity-60"
            />
            <div className="flex items-center justify-between px-4 pb-3">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <Sparkles className="h-3.5 w-3.5 text-yellow-400/80" />
                <span>IA en tiempo real · {prompt.length}/1000</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-xs text-white/25">⌘ + Enter</span>
                <button
                  onClick={() => handleSearch()}
                  disabled={isLoading || prompt.trim().length < 5}
                  className="btn-cta flex items-center gap-2 text-sm font-bold text-white px-6 py-2.5 rounded-2xl disabled:opacity-40 disabled:transform-none disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Plane className="h-4 w-4" />
                      Buscar
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Example chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {PROMPT_EXAMPLES.map((example) => (
            <button
              key={example}
              onClick={() => setPrompt(example)}
              disabled={isLoading}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white/6 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-40"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
