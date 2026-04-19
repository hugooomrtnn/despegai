"use client";

import { MapPin, TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { DestinationRecommendation } from "@/types/travel";

const PRICE_ICONS = {
  low: { icon: TrendingDown, label: "Precio bajo", color: "text-emerald-600", bg: "bg-emerald-50" },
  medium: { icon: Minus, label: "Precio medio", color: "text-amber-600", bg: "bg-amber-50" },
  high: { icon: TrendingUp, label: "Precio alto", color: "text-red-500", bg: "bg-red-50" },
};

const DESTINATION_EMOJIS: Record<string, string> = {
  Lisboa: "🇵🇹", Oporto: "🇵🇹", Marrakech: "🇲🇦", Budapest: "🇭🇺", Praga: "🇨🇿",
  Roma: "🇮🇹", Milán: "🇮🇹", "Palma de Mallorca": "🇪🇸", Ibiza: "🇪🇸",
  Malta: "🇲🇹", Atenas: "🇬🇷", Cagliari: "🇮🇹", Bruselas: "🇧🇪",
  París: "🇫🇷", Tokio: "🇯🇵", Bangkok: "🇹🇭", Ámsterdam: "🇳🇱", Málaga: "🇪🇸",
  Londres: "🇬🇧",
};

interface DestinationRecommendationsProps {
  destinations: DestinationRecommendation[];
}

export function DestinationRecommendations({ destinations }: DestinationRecommendationsProps) {
  if (destinations.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-violet-500" />
        Destinos recomendados por IA
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {destinations.map((dest) => {
          const priceInfo = PRICE_ICONS[dest.estimatedPriceLevel];
          const emoji = DESTINATION_EMOJIS[dest.city] || "🌍";

          return (
            <div
              key={dest.airportCode}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-violet-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{dest.city}</h3>
                    <p className="text-xs text-gray-500">{dest.country} · {dest.airportCode}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${priceInfo.bg}`}>
                  <priceInfo.icon className={`h-3 w-3 ${priceInfo.color}`} />
                  <span className={`text-xs font-medium ${priceInfo.color}`}>{priceInfo.label}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3 leading-relaxed">{dest.reason}</p>

              <div className="flex flex-wrap gap-1">
                {dest.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 rounded-full border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span className="text-xs text-gray-500">Match IA</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 bg-gray-100 rounded-full w-16 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all"
                      style={{ width: `${dest.matchScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-violet-600">{dest.matchScore}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
