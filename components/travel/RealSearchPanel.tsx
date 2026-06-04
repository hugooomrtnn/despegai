"use client";

import { Plane, Hotel, ExternalLink, Search, MapPin } from "lucide-react";
import type { ParsedTravelRequest, DestinationRecommendation } from "@/types/travel";

const TP_MARKER = "736116";
const TP_TRS    = "536391";

function defaultDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatDateEs(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

function flightUrls(origin: string, dest: string, date: string, adults: number, returnDate?: string) {
  const yymmdd = date.replace(/-/g, "").slice(2);
  const compact = date.replace(/-/g, "");
  const p = new URLSearchParams({ origin, destination: dest, depart_date: date, adults: String(adults), marker: TP_MARKER, trs: TP_TRS });
  if (returnDate) p.set("return_date", returnDate);
  return {
    jetradar:  `https://search.jetradar.com/flights/?${p.toString()}`,
    skyscanner:`https://www.skyscanner.es/transporte/vuelos/${origin.toLowerCase()}/${dest.toLowerCase()}/${yymmdd}/`,
    kayak:     `https://www.kayak.es/flights/${origin}-${dest}/${date}${returnDate ? `/${returnDate}` : ""}`,
    edreams:   `https://www.edreams.es/search/#results/type=${returnDate ? "ROUND_TRIP" : "ONE_WAY"};fromAirport=${origin};toAirport=${dest};departureDate=${compact};adults=${adults}`,
  };
}

function hotelUrls(city: string, checkIn: string, nights: number, adults: number) {
  const checkOut = addDays(checkIn, nights);
  return {
    booking: `https://www.booking.com/searchresults.es.html?ss=${encodeURIComponent(city)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&no_rooms=1`,
    airbnb:  `https://www.airbnb.es/s/${encodeURIComponent(city)}/homes?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}`,
  };
}

interface Props {
  parsed: ParsedTravelRequest;
  recommendations: DestinationRecommendation[];
}

export function RealSearchPanel({ parsed, recommendations }: Props) {
  const origin    = parsed.originAirportCode ?? "MAD";
  const originCity = parsed.origin ?? "España";
  const date      = parsed.departureDate ?? defaultDate();
  const returnDate = parsed.returnDate ??
    (parsed.durationDays ? addDays(date, parsed.durationDays) : undefined);
  const adults = parsed.passengers ?? 1;
  const nights = parsed.durationDays ?? 5;

  // ── Destino concreto ──────────────────────────────────────────────────────
  if (!parsed.flexibleDestination && parsed.destinationAirportCode) {
    const dest     = parsed.destinationAirportCode;
    const destName = parsed.destination ?? dest;
    const fUrls    = flightUrls(origin, dest, date, adults, returnDate);
    const hUrls    = hotelUrls(destName, date, nights, adults);

    return (
      <div className="space-y-4">
        {/* Vuelos */}
        <div className="card-premium rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Plane className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Buscar vuelos reales</h3>
              <p className="text-xs text-slate-400">
                {originCity} → {destName} · {formatDateEs(date)}
                {returnDate && ` — ${formatDateEs(returnDate)}`}
                {" · "}{adults} {adults === 1 ? "adulto" : "adultos"}
              </p>
            </div>
          </div>

          <a
            href={fUrls.jetradar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full btn-cta py-3 rounded-xl text-sm font-bold mb-3"
          >
            <Search className="h-4 w-4" />
            Ver vuelos disponibles en Jetradar
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">También en:</span>
            {[
              { name: "Skyscanner", url: fUrls.skyscanner, color: "hover:text-blue-600" },
              { name: "Kayak",      url: fUrls.kayak,      color: "hover:text-orange-500" },
              { name: "eDreams",    url: fUrls.edreams,    color: "hover:text-red-500" },
            ].map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`text-xs font-semibold text-slate-500 bg-slate-100 ${p.color} hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors`}>
                {p.name}
              </a>
            ))}
          </div>
        </div>

        {/* Hoteles */}
        <div className="card-premium rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Hotel className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Buscar alojamiento real</h3>
              <p className="text-xs text-slate-400">
                {destName} · {nights} noches · {adults} {adults === 1 ? "adulto" : "adultos"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a href={hUrls.booking} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors">
              <ExternalLink className="h-3.5 w-3.5" />
              Booking.com
            </a>
            <a href={hUrls.airbnb} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors">
              <ExternalLink className="h-3.5 w-3.5" />
              Airbnb
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Destino flexible — un botón por recomendación ─────────────────────────
  if (recommendations.length > 0) {
    return (
      <div className="card-premium rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Buscar vuelos a estos destinos</h3>
            <p className="text-xs text-slate-400">Precios reales en Jetradar · {adults} {adults === 1 ? "adulto" : "adultos"} · desde {originCity}</p>
          </div>
        </div>

        <div className="space-y-2">
          {recommendations.map(rec => {
            const fUrls = flightUrls(origin, rec.airportCode, date, adults, returnDate);
            return (
              <a
                key={rec.airportCode}
                href={fUrls.jetradar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg font-mono">
                    {rec.airportCode}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{rec.city}</p>
                    <p className="text-xs text-slate-400">{rec.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 group-hover:text-orange-600">
                  <span>Ver vuelos</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
