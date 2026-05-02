"use client";

import { Plane, Clock, ArrowRight, ExternalLink, Bookmark, Zap, Star, TrendingDown, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FlightResult, FlightBadge } from "@/types/travel";
import { formatPrice, formatDuration, formatTime, formatDate } from "@/lib/utils";

const BADGE_CONFIG: Record<FlightBadge, { label: string; icon: React.ComponentType<{ className?: string }>; variant: "success" | "info" | "warning" | "purple" | "secondary" }> = {
  cheapest: { label: "Más barato", icon: TrendingDown, variant: "success" },
  direct: { label: "Vuelo directo", icon: Zap, variant: "info" },
  best_value: { label: "Mejor valor", icon: Star, variant: "warning" },
  ai_recommended: { label: "Recomendado IA", icon: Award, variant: "purple" },
  fastest: { label: "Más rápido", icon: Clock, variant: "secondary" },
  popular: { label: "Popular", icon: Star, variant: "secondary" },
};

const AIRLINE_COLORS: Record<string, string> = {
  Vueling: "bg-amber-400",
  Ryanair: "bg-blue-500",
  Iberia: "bg-red-500",
  "Iberia Express": "bg-red-400",
  EasyJet: "bg-orange-500",
  "Wizz Air": "bg-purple-500",
  "Air Europa": "bg-blue-600",
  Transavia: "bg-emerald-500",
  Volotea: "bg-blue-400",
  Norwegian: "bg-red-600",
  "British Airways": "bg-blue-700",
  Lufthansa: "bg-yellow-500",
  "Air France": "bg-blue-600",
  KLM: "bg-blue-400",
};

function AirlineDot({ airline }: { airline: string }) {
  const color = AIRLINE_COLORS[airline] || "bg-gray-400";
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${color} mr-1.5`} />
  );
}

function buildSkyscannerUrl(flight: FlightResult): string {
  const date = flight.departureTime.slice(0, 10).replace(/-/g, "").slice(2); // YYMMDD
  const origin = flight.originAirport.toLowerCase();
  const dest = flight.destinationAirport.toLowerCase();
  return `https://www.skyscanner.es/transporte/vuelos/${origin}/${dest}/${date}/`;
}

interface FlightCardProps {
  flight: FlightResult;
  rank: number;
}

export function FlightCard({ flight, rank }: FlightCardProps) {
  const priorityBadges: FlightBadge[] = ["cheapest", "direct", "best_value", "ai_recommended", "fastest"];
  const displayBadges = flight.badges.filter((b) => priorityBadges.includes(b)).slice(0, 3);

  const isTopPick = rank === 0;

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all group relative overflow-hidden ${
        isTopPick
          ? "border-violet-200 ring-1 ring-violet-100"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      {isTopPick && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500" />
      )}

      <div className="p-5">
        {/* Top row: badges + score */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-1.5">
            {displayBadges.map((badge) => {
              const cfg = BADGE_CONFIG[badge];
              return (
                <Badge key={badge} variant={cfg.variant} className="gap-1">
                  <cfg.icon className="h-3 w-3" />
                  {cfg.label}
                </Badge>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-1.5">
            <Star className="h-3.5 w-3.5 text-violet-500 fill-violet-500" />
            <span className="text-sm font-bold text-violet-700">{flight.score}</span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
        </div>

        {/* Main flight info */}
        <div className="flex items-center gap-3">
          {/* Departure */}
          <div className="text-center min-w-[80px]">
            <p className="text-2xl font-bold text-gray-900">{formatTime(flight.departureTime)}</p>
            <p className="text-xs font-medium text-gray-600 mt-0.5">{flight.originAirport}</p>
            <p className="text-xs text-gray-400">{flight.originCity}</p>
          </div>

          {/* Route line */}
          <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <p className="text-xs text-gray-400">{formatDuration(flight.durationMinutes)}</p>
            <div className="flex items-center gap-1 w-full">
              <div className="h-px flex-1 bg-gray-200" />
              <Plane className="h-3.5 w-3.5 text-violet-400 flex-shrink-0" />
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <p className="text-xs text-gray-400">
              {flight.stops === 0 ? "Directo" : `${flight.stops} escala${flight.stops > 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-center min-w-[80px]">
            <p className="text-2xl font-bold text-gray-900">{formatTime(flight.arrivalTime)}</p>
            <p className="text-xs font-medium text-gray-600 mt-0.5">{flight.destinationAirport}</p>
            <p className="text-xs text-gray-400">{flight.destinationCity}</p>
          </div>

          {/* Price */}
          <div className="text-right ml-2 flex-shrink-0">
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(flight.price, flight.currency)}
            </p>
            <p className="text-xs text-gray-400">por persona</p>
          </div>
        </div>

        {/* Return flight */}
        {flight.returnDepartureTime && flight.returnArrivalTime && (
          <div className="mt-3 pt-3 border-t border-dashed border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <ArrowRight className="h-3 w-3" />
              <span>Vuelo de vuelta</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center min-w-[80px]">
                <p className="text-base font-bold text-gray-700">{formatTime(flight.returnDepartureTime)}</p>
                <p className="text-xs text-gray-400">{flight.destinationAirport}</p>
              </div>
              <div className="flex-1 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1 w-full">
                  <div className="h-px flex-1 bg-gray-100" />
                  <Plane className="h-3 w-3 text-gray-300 flex-shrink-0 rotate-180" />
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
              </div>
              <div className="text-center min-w-[80px]">
                <p className="text-base font-bold text-gray-700">{formatTime(flight.returnArrivalTime)}</p>
                <p className="text-xs text-gray-400">{flight.originAirport}</p>
              </div>
            </div>
          </div>
        )}

        {/* Airline + date */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <AirlineDot airline={flight.airline} />
            <span className="font-medium">{flight.airline}</span>
            <span className="mx-2 text-gray-300">·</span>
            <span>{formatDate(flight.departureTime)}</span>
          </div>
        </div>

        {/* Recommendation reason */}
        <div className="mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-start gap-2">
            <Award className="h-3.5 w-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">{flight.recommendationReason}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex gap-2">
          <a
            href={flight.bookingUrl ?? buildSkyscannerUrl(flight)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button size="sm" className="w-full">
              <ExternalLink className="h-3.5 w-3.5" />
              Ver oferta
            </Button>
          </a>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Bookmark className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
