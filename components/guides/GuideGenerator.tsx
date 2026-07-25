"use client";

import { useState } from "react";
import { MapPin, Loader2, Search } from "lucide-react";
import type { GuideContent } from "@/lib/data/staticGuides";
import { GuideView } from "@/components/guides/GuideView";

export function GuideGenerator() {
  const [query, setQuery] = useState("");
  const [guide, setGuide] = useState<GuideContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setGuide(null);
    try {
      const res = await fetch("/api/guia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: query.trim() }),
      });
      if (!res.ok) throw new Error("Error al generar la guía");
      const data = await res.json();
      setGuide(data);
    } catch {
      setError("No hemos podido generar la guía. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Otro destino? Ej: Praga, Sevilla, Vietnam…"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="btn-cta flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? "Generando…" : "Generar guía"}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6 max-w-xl mx-auto">
          {error}
        </div>
      )}

      {!guide && !loading && !error && (
        <div className="text-center py-8 text-slate-400">
          <MapPin className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">¿No encuentras tu destino en la lista de arriba? Escríbelo aquí y te generamos una guía al instante.</p>
        </div>
      )}

      {guide && <GuideView guide={guide} />}
    </div>
  );
}
