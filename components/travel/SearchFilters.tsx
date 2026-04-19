"use client";

import { TrendingDown, GitMerge, Clock, Star } from "lucide-react";
import type { FlightSortOption } from "@/types/travel";

const SORT_OPTIONS: Array<{ value: FlightSortOption; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { value: "score", label: "Mejor puntuación", icon: Star },
  { value: "price", label: "Más barato", icon: TrendingDown },
  { value: "stops", label: "Menos escalas", icon: GitMerge },
  { value: "duration", label: "Menor duración", icon: Clock },
];

interface SearchFiltersProps {
  sortBy: FlightSortOption;
  onSortChange: (sort: FlightSortOption) => void;
  totalResults: number;
}

export function SearchFilters({ sortBy, onSortChange, totalResults }: SearchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p className="text-sm text-gray-500">
        <span className="font-semibold text-gray-900">{totalResults}</span> vuelos encontrados
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 font-medium">Ordenar por:</span>
        {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onSortChange(value)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              sortBy === value
                ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700"
            }`}
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
