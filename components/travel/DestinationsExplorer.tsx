"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, TrendingDown } from "lucide-react";
import { TAG_COLORS, TAG_LABELS, CONTINENTS, type Continent } from "@/lib/data/destinationMeta";

export type DestinationCard = {
  city: string;
  country: string;
  code: string;
  flag: string;
  price: number;
  tags: string[];
  continent: Continent;
};

export function DestinationsExplorer({ destinations }: { destinations: DestinationCard[] }) {
  const [query, setQuery] = useState("");
  const [continent, setContinent] = useState<Continent | "Todos">("Todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      const matchesQuery = !q || d.city.toLowerCase().includes(q) || d.country.toLowerCase().includes(q);
      const matchesContinent = continent === "Todos" || d.continent === continent;
      return matchesQuery && matchesContinent;
    });
  }, [destinations, query, continent]);

  return (
    <div>
      {/* Buscador + filtros */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca una ciudad o país…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setContinent("Todos")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              continent === "Todos" ? "bg-sky-500 text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-sky-300"
            }`}
          >
            Todos ({destinations.length})
          </button>
          {CONTINENTS.map((c) => (
            <button
              key={c}
              onClick={() => setContinent(c)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                continent === c ? "bg-sky-500 text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-sky-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 py-10 text-center">
          No encontramos destinos con &quot;{query}&quot;. Prueba con otra ciudad o país.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((dest) => (
            <Link
              key={dest.code}
              href={`/?q=${encodeURIComponent(`Vuelos baratos a ${dest.city}`)}`}
              className="card-premium rounded-2xl p-4 hover:shadow-md transition-all hover:border-sky-200 group block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{dest.flag}</span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">{dest.city}</p>
                    <p className="text-xs text-slate-400">{dest.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex-shrink-0">
                  <TrendingDown className="h-3 w-3" />
                  desde {dest.price}€
                </div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {dest.tags.map((tag) => (
                  <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] ?? "bg-slate-100 text-slate-500"}`}>
                    {TAG_LABELS[tag] ?? tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
