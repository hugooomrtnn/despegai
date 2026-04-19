"use client";

import { Plane } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
        <Plane className="h-8 w-8 text-gray-300" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">No se encontraron vuelos</h3>
      <p className="text-sm text-gray-500 text-center max-w-xs">
        Prueba a cambiar las fechas, el destino o aumentar tu presupuesto.
      </p>
    </div>
  );
}
