"use client";

import { Star, MapPin, Wifi, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { HotelResult, HotelBadge } from "@/types/travel";

const BADGE_CONFIG: Record<HotelBadge, { label: string; variant: "success" | "info" | "warning" | "purple" | "secondary" }> = {
  cheapest: { label: "Más económico", variant: "success" },
  top_rated: { label: "Mejor valorado", variant: "purple" },
  best_value: { label: "Mejor relación calidad/precio", variant: "warning" },
  recommended: { label: "Recomendado", variant: "info" },
  central: { label: "Zona céntrica", variant: "secondary" },
};

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < stars ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

interface HotelCardProps {
  hotel: HotelResult;
  nights: number;
}

export function HotelCard({ hotel, nights }: HotelCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
      <div className="p-5">
        {/* Badges + rating */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {hotel.badges.slice(0, 2).map((b) => {
              const cfg = BADGE_CONFIG[b];
              return (
                <Badge key={b} variant={cfg.variant} className="text-xs">
                  {cfg.label}
                </Badge>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 rounded-xl px-2.5 py-1.5 flex-shrink-0">
            <span className="text-sm font-bold text-blue-700">{hotel.rating}</span>
            <span className="text-xs text-blue-400">/10</span>
          </div>
        </div>

        {/* Name + stars */}
        <h3 className="font-semibold text-gray-900 mb-1">{hotel.name}</h3>
        <StarRating stars={hotel.stars} />

        {/* Zone */}
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <MapPin className="h-3 w-3" />
          <span>{hotel.zone}</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-1 mt-3 flex-wrap">
          <Wifi className="h-3 w-3 text-gray-400" />
          {hotel.amenities.slice(0, 4).map((a) => (
            <span key={a} className="text-xs px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100">
              {a}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
          <div>
            <p className="text-2xl font-bold text-gray-900">{hotel.pricePerNight}€</p>
            <p className="text-xs text-gray-400">por noche · {hotel.totalPrice}€ total ({nights} noches)</p>
          </div>
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver en Booking
          </a>
        </div>

        {/* Reason */}
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">{hotel.recommendationReason}</p>
      </div>
    </div>
  );
}
