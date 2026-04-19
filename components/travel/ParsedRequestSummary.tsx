"use client";

import { MapPin, Calendar, Wallet, Users, Tag, Brain } from "lucide-react";
import type { ParsedTravelRequest } from "@/types/travel";
import { formatDateLong } from "@/lib/utils";

const TRIP_TYPE_LABELS: Record<string, string> = {
  beach: "🏖️ Playa",
  city: "🏙️ Ciudad",
  adventure: "🏔️ Aventura",
  romantic: "💕 Romántico",
  party: "🎉 Fiesta",
  culture: "🏛️ Cultura",
  relax: "🌿 Relax",
  unknown: "✈️ Viaje",
};

interface ParsedRequestSummaryProps {
  parsed: ParsedTravelRequest;
}

export function ParsedRequestSummary({ parsed }: ParsedRequestSummaryProps) {
  const items = [
    {
      icon: MapPin,
      label: "Origen",
      value: parsed.origin || "No especificado",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MapPin,
      label: "Destino",
      value: parsed.flexibleDestination
        ? "Flexible (recomendado por IA)"
        : parsed.destination || "No especificado",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    parsed.departureDate && {
      icon: Calendar,
      label: "Fechas",
      value: parsed.flexibleDates
        ? `Flexible (aprox. ${formatDateLong(parsed.departureDate)})`
        : formatDateLong(parsed.departureDate),
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    parsed.durationDays && {
      icon: Calendar,
      label: "Duración",
      value: `${parsed.durationDays} días`,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    parsed.budget && {
      icon: Wallet,
      label: "Presupuesto",
      value: `${parsed.budget} ${parsed.currency}`,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Users,
      label: "Pasajeros",
      value: `${parsed.passengers} persona${parsed.passengers > 1 ? "s" : ""}`,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
    parsed.tripType && parsed.tripType !== "unknown" && {
      icon: Tag,
      label: "Tipo de viaje",
      value: TRIP_TYPE_LABELS[parsed.tripType],
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
  ].filter(Boolean) as Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    color: string;
    bg: string;
  }>;

  return (
    <div className="bg-white rounded-2xl border border-violet-100 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-violet-50 rounded-lg">
          <Brain className="h-4 w-4 text-violet-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Lo que la IA ha entendido</h3>
          <p className="text-xs text-gray-500 truncate max-w-xs sm:max-w-md">&ldquo;{parsed.rawPrompt}&rdquo;</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item) => (
          <div key={item.label} className={`${item.bg} rounded-xl p-3`}>
            <div className="flex items-center gap-1.5 mb-1">
              <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              <span className="text-xs font-medium text-gray-500">{item.label}</span>
            </div>
            <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {parsed.preferences.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1.5">Preferencias detectadas:</p>
          <div className="flex flex-wrap gap-1.5">
            {parsed.preferences.map((p) => (
              <span key={p} className="text-xs px-2 py-0.5 bg-violet-50 text-violet-700 rounded-full border border-violet-100">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
