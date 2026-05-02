"use client";

import { HotelCard } from "./HotelCard";
import type { HotelResult } from "@/types/travel";

interface HotelResultsListProps {
  hotels: HotelResult[];
  nights: number;
}

export function HotelResultsList({ hotels, nights }: HotelResultsListProps) {
  if (hotels.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} nights={nights} />
      ))}
    </div>
  );
}
