"use client";

import { useState } from "react";
import { Copy, Check, FileText, TrendingDown, Clock, Plane, Users } from "lucide-react";
import type { FlightResult, ParsedTravelRequest } from "@/types/travel";
import { formatDuration } from "@/lib/utils";

interface ProposalPanelProps {
  parsedRequest: ParsedTravelRequest;
  flights: FlightResult[];
}

function buildProposalText(request: ParsedTravelRequest, flights: FlightResult[]): string {
  if (flights.length === 0) return "";

  const best = [...flights].sort((a, b) => b.score - a.score)[0];
  const cheapest = [...flights].sort((a, b) => a.price - b.price)[0];

  const destination = request.destination ?? "el destino solicitado";
  const origin = request.origin ?? "Madrid";
  const when = request.departureDate
    ? new Date(request.departureDate).toLocaleDateString("es-ES", { month: "long", year: "numeric" })
    : "las fechas solicitadas";

  const bestStops = best.stops === 0 ? "vuelo directo" : `${best.stops} escala${best.stops > 1 ? "s" : ""}`;
  const bestDuration = formatDuration(best.durationMinutes);
  const hasAlternatives = cheapest.price < best.price;

  return `Hola, he revisado opciones para tu viaje a ${destination} en ${when} saliendo desde ${origin}.

He encontrado ${flights.length} alternativas. La opción más recomendada combina buen precio y duración razonable: ${best.price}€, ${bestStops}, duración aproximada ${bestDuration} con ${best.airline}.${
    hasAlternatives
      ? `\n\nTambién hay opciones más económicas desde ${cheapest.price}€, aunque con mayor duración o más escalas.`
      : ""
  }

Si te parece bien, podemos avanzar con la reserva o revisar alternativas con fechas cercanas. ¿Tienes preferencia por algún horario o aerolínea?`;
}

export function ProposalPanel({ parsedRequest, flights }: ProposalPanelProps) {
  const [copied, setCopied] = useState(false);

  if (flights.length === 0) return null;

  const best = [...flights].sort((a, b) => b.score - a.score)[0];
  const minPrice = Math.min(...flights.map((f) => f.price));
  const maxPrice = Math.max(...flights.map((f) => f.price));

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildProposalText(parsedRequest, flights));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback para navegadores sin clipboard API
      const text = buildProposalText(parsedRequest, flights);
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-violet-100 rounded-lg flex-shrink-0">
            <FileText className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Propuesta para tu cliente</h3>
            <p className="text-xs text-gray-500">Lista para enviar por email o WhatsApp</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
            copied
              ? "bg-emerald-500 text-white border-emerald-500"
              : "bg-white text-violet-700 border-violet-200 hover:bg-violet-50 hover:border-violet-300"
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copiado" : "Copiar propuesta"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="bg-white rounded-xl p-3 border border-violet-50">
          <div className="flex items-center gap-1 mb-1">
            <Users className="h-3 w-3 text-violet-400" />
            <p className="text-xs text-gray-400">Opciones</p>
          </div>
          <p className="text-lg font-bold text-violet-700">{flights.length}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-violet-50">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="h-3 w-3 text-emerald-500" />
            <p className="text-xs text-gray-400">Desde</p>
          </div>
          <p className="text-lg font-bold text-emerald-700">{minPrice}€</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-violet-50">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-blue-400" />
            <p className="text-xs text-gray-400">Mejor opción</p>
          </div>
          <p className="text-sm font-bold text-blue-700">{formatDuration(best.durationMinutes)}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-violet-50">
          <div className="flex items-center gap-1 mb-1">
            <Plane className="h-3 w-3 text-violet-400" />
            <p className="text-xs text-gray-400">Escalas mejor</p>
          </div>
          <p className="text-sm font-bold text-violet-700">
            {best.stops === 0 ? "Directo" : `${best.stops} escala`}
          </p>
        </div>
      </div>

      {/* Message preview */}
      <div className="bg-white rounded-xl p-4 border border-violet-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Vista previa del mensaje
        </p>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {buildProposalText(parsedRequest, flights)}
        </p>
        {minPrice !== maxPrice && (
          <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
            Rango de precios: {minPrice}€ – {maxPrice}€
          </p>
        )}
      </div>
    </div>
  );
}
