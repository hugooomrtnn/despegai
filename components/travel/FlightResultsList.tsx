"use client";

import { useMemo, useState } from "react";
import { FlightCard } from "./FlightCard";
import { SearchFilters } from "./SearchFilters";
import type { FlightResult, FlightSortOption } from "@/types/travel";

interface FlightResultsListProps {
  flights: FlightResult[];
  defaultSort?: FlightSortOption;
}

export function FlightResultsList({ flights, defaultSort = "score" }: FlightResultsListProps) {
  const [sortBy, setSortBy] = useState<FlightSortOption>(defaultSort);

  const sorted = useMemo(() => {
    return [...flights].sort((a, b) => {
      switch (sortBy) {
        case "price": return a.price - b.price;
        case "stops": return a.stops - b.stops;
        case "duration": return a.durationMinutes - b.durationMinutes;
        case "score": return b.score - a.score;
        default: return 0;
      }
    });
  }, [flights, sortBy]);

  if (flights.length === 0) return null;

  return (
    <div>
      <SearchFilters
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={flights.length}
      />
      <div className="mt-4 grid gap-4">
        {sorted.map((flight, index) => (
          <FlightCard key={flight.id} flight={flight} rank={index} />
        ))}
      </div>
    </div>
  );
}
