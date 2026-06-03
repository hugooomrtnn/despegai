"use client";

import { Plane, Clock, ArrowRight, ExternalLink, Zap, TrendingDown, Award, Star } from "lucide-react";
import type { FlightResult, FlightBadge } from "@/types/travel";
import { formatPrice, formatDuration, formatTime, formatDate } from "@/lib/utils";

const BADGE_CONFIG: Record<FlightBadge, { label: string; bg: string; text: string }> = {
  cheapest:       { label: "Más barato",    bg: "bg-emerald-50",  text: "text-emerald-700" },
  direct:         { label: "Directo",       bg: "bg-blue-50",     text: "text-blue-700" },
  best_value:     { label: "Mejor valor",   bg: "bg-amber-50",    text: "text-amber-700" },
  ai_recommended: { label: "IA recomienda", bg: "bg-violet-50",   text: "text-violet-700" },
  fastest:        { label: "Más rápido",    bg: "bg-sky-50",      text: "text-sky-700" },
  popular:        { label: "Popular",       bg: "bg-rose-50",     text: "text-rose-700" },
};

const BADGE_ICONS: Record<FlightBadge, React.ComponentType<{ className?: string }>> = {
  cheapest: TrendingDown,
  direct: Zap,
  best_value: Star,
  ai_recommended: Award,
  fastest: Clock,
  popular: Star,
};

const AIRLINE_INITIALS: Record<string, { bg: string; text: string }> = {
  Vueling:          { bg: "bg-amber-400",    text: "text-white" },
  Ryanair:          { bg: "bg-blue-600",     text: "text-white" },
  Iberia:           { bg: "bg-red-500",      text: "text-white" },
  "Iberia Express": { bg: "bg-red-400",      text: "text-white" },
  EasyJet:          { bg: "bg-orange-500",   text: "text-white" },
  "Wizz Air":       { bg: "bg-purple-600",   text: "text-white" },
  "Air Europa":     { bg: "bg-blue-700",     text: "text-white" },
  Transavia:        { bg: "bg-emerald-500",  text: "text-white" },
  "British Airways":{ bg: "bg-blue-800",     text: "text-white" },
  Lufthansa:        { bg: "bg-yellow-500",   text: "text-slate-900" },
  "Air France":     { bg: "bg-blue-600",     text: "text-white" },
  KLM:              { bg: "bg-sky-500",      text: "text-white" },
  Emirates:         { bg: "bg-red-700",      text: "text-white" },
  "Qatar Airways":  { bg: "bg-purple-800",   text: "text-white" },
  "Turkish Airlines":{ bg: "bg-red-600",     text: "text-white" },
  EgyptAir:         { bg: "bg-blue-900",     text: "text-white" },
};

function AirlineBadge({ airline }: { airline: string }) {
  const cfg = AIRLINE_INITIALS[airline] || { bg: "bg-slate-500", text: "text-white" };
  const initials = airline.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[10px] font-bold ${cfg.bg} ${cfg.text} flex-shrink-0`}>
      {initials}
    </span>
  );
}

function buildSkyscannerUrl(flight: FlightResult): string {
  const date = flight.departureTime.slice(0, 10).replace(/-/g, "").slice(2);
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
    <div className={`card-premium rounded-2xl overflow-hidden ${isTopPick ? "ring-2 ring-orange-200 border-orange-100" : ""}`}>
      {/* Top accent for best pick */}
      {isTopPick && (
        <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />
      )}

      <div className="p-5">
        {/* Badges row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-1.5">
            {displayBadges.map((badge) => {
              const cfg = BADGE_CONFIG[badge];
              const Icon = BADGE_ICONS[badge];
              return (
                <span key={badge} className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
                  <Icon className="h-3 w-3" />
                  {cfg.label}
                </span>
              );
            })}
          </div>
          {isTopPick && (
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
              ★ Mejor opción
            </span>
          )}
        </div>

        {/* Flight info */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Departure */}
          <div className="text-center flex-shrink-0 min-w-[72px]">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{formatTime(flight.departureTime)}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">{flight.originAirport}</p>
            <p className="text-xs text-slate-400 hidden sm:block">{flight.originCity}</p>
          </div>

          {/* Route line */}
          <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0 px-2">
            <p className="text-xs text-slate-400 font-medium">{formatDuration(flight.durationMinutes)}</p>
            <div className="flex items-center gap-1.5 w-full">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Plane className="h-3 w-3 text-slate-400" />
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <p className={`text-xs font-semibold ${flight.stops === 0 ? "text-emerald-600" : "text-amber-600"}`}>
              {flight.stops === 0 ? "Sin escalas" : `${flight.stops} escala${flight.stops > 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-center flex-shrink-0 min-w-[72px]">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{formatTime(flight.arrivalTime)}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">{flight.destinationAirport}</p>
            <p className="text-xs text-slate-400 hidden sm:block">{flight.destinationCity}</p>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-slate-100 hidden sm:block flex-shrink-0 mx-1" />

          {/* Price */}
          <div className="text-right flex-shrink-0">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              {formatPrice(flight.price, flight.currency)}
            </p>
            <p className="text-xs text-slate-400 mt-1">por persona</p>
          </div>
        </div>

        {/* Return flight */}
        {flight.returnDepartureTime && flight.returnArrivalTime && (
          <div className="mt-4 pt-4 border-t border-dashed border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="h-3 w-3 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Vuelta incluida</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[72px]">
                <p className="text-base font-bold text-slate-600">{formatTime(flight.returnDepartureTime)}</p>
                <p className="text-xs text-slate-400">{flight.destinationAirport}</p>
              </div>
              <div className="flex-1 flex items-center gap-1.5">
                <div className="h-px flex-1 bg-slate-100" />
                <Plane className="h-3 w-3 text-slate-300 rotate-180 flex-shrink-0" />
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="text-center min-w-[72px]">
                <p className="text-base font-bold text-slate-600">{formatTime(flight.returnArrivalTime)}</p>
                <p className="text-xs text-slate-400">{flight.originAirport}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom row */}
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <AirlineBadge airline={flight.airline} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">{flight.airline}</p>
              <p className="text-xs text-slate-400">{formatDate(flight.departureTime)}</p>
            </div>
          </div>

          <a
            href={flight.bookingUrl ?? buildSkyscannerUrl(flight)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-sm font-bold text-white px-5 py-2.5 rounded-xl btn-cta"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver oferta
          </a>
        </div>

        {/* Recommendation */}
        {flight.recommendationReason && (
          <p className="mt-3 text-xs text-slate-400 leading-relaxed border-t border-slate-50 pt-3">
            {flight.recommendationReason}
          </p>
        )}
      </div>
    </div>
  );
}
