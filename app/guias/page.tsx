"use client";

import { useState } from "react";
import { MapPin, Plane, Clock, Utensils, Lightbulb, Euro, Loader2, Search } from "lucide-react";
import Link from "next/link";

interface GuideSection {
  title: string;
  items: { name: string; description: string }[];
}

interface DestinationGuide {
  destination: string;
  country: string;
  intro: string;
  bestTime: string;
  mustSee: GuideSection;
  food: GuideSection;
  tips: string[];
  budget: string;
  gettingThere: string;
}

export default function GuiasPage() {
  const [query, setQuery] = useState("");
  const [guide, setGuide] = useState<DestinationGuide | null>(null);
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
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="hero-dark py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <MapPin className="h-3.5 w-3.5" />
            Guías de destino con IA
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            ¿A dónde quieres viajar?
          </h1>
          <p className="text-slate-300 mb-8">
            Escribe cualquier ciudad o país y la IA te genera una guía de viaje completa al instante.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ej: París, Tokio, Marruecos…"
              className="flex-1 px-4 py-3 rounded-xl border-0 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
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
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {!guide && !loading && (
          <div className="text-center py-12 text-slate-400">
            <MapPin className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Tu guía aparecerá aquí una vez que escribas un destino.</p>
            <p className="text-xs mt-1">Puedes preguntar por ciudades, países o regiones.</p>
          </div>
        )}

        {guide && (
          <div className="space-y-5">
            {/* Cabecera de la guía */}
            <div className="card-premium rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{guide.destination}</h2>
                  <p className="text-sm text-slate-400 mb-3">{guide.country}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{guide.intro}</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Mejor época */}
              <div className="card-premium rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-sky-500" />
                  <h3 className="font-bold text-slate-800 text-sm">Mejor época para ir</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.bestTime}</p>
              </div>

              {/* Presupuesto */}
              <div className="card-premium rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Euro className="h-4 w-4 text-sky-500" />
                  <h3 className="font-bold text-slate-800 text-sm">Presupuesto orientativo</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.budget}</p>
              </div>
            </div>

            {/* Qué ver */}
            <div className="card-premium rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-4 w-4 text-sky-500" />
                <h3 className="font-bold text-slate-800">{guide.mustSee.title}</h3>
              </div>
              <div className="space-y-3">
                {guide.mustSee.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-6 h-6 bg-sky-50 text-sky-600 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gastronomía */}
            <div className="card-premium rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-4 w-4 text-sky-500" />
                <h3 className="font-bold text-slate-800">{guide.food.title}</h3>
              </div>
              <div className="space-y-3">
                {guide.food.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-lg leading-none flex-shrink-0">🍽️</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consejos */}
            <div className="card-premium rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-4 w-4 text-sky-500" />
                <h3 className="font-bold text-slate-800">Consejos prácticos</h3>
              </div>
              <ul className="space-y-2">
                {guide.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-sky-400 font-bold flex-shrink-0">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cómo llegar */}
            <div className="card-premium rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Plane className="h-4 w-4 text-sky-500" />
                <h3 className="font-bold text-slate-800 text-sm">Cómo llegar desde España</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{guide.gettingThere}</p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-center text-white">
              <p className="font-bold text-lg mb-1">¿Listo para reservar tu vuelo a {guide.destination}?</p>
              <p className="text-sm text-sky-100 mb-4">Usa Despegai para encontrar los vuelos más baratos al instante.</p>
              <Link href={`/?q=vuelos+a+${encodeURIComponent(guide.destination)}`}
                className="inline-flex items-center gap-2 bg-white text-sky-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors">
                <Plane className="h-4 w-4" />
                Buscar vuelos a {guide.destination}
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
