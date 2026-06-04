"use client";

import { useState } from "react";
import { Plane, Hotel, ExternalLink, MapPin, Calendar, ChevronDown } from "lucide-react";
import type { ParsedTravelRequest, DestinationRecommendation } from "@/types/travel";

const TP_MARKER = "736116";
const TP_TRS    = "536391";

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function defaultDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function formatDateEs(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

// Para destino concreto siempre incluimos fecha (orientativa si no hay).
// Sin fecha, Jetradar muestra "explorar destinos" en lugar de la ruta buscada.
function buildJetradarUrl(
  origin: string,
  dest: string,
  date: string | null,
  adults: number,
  returnDate?: string | null,
): string {
  const departDate = date ?? defaultDate();
  const p = new URLSearchParams({
    origin,
    destination: dest,
    depart_date: departDate,
    adults: String(adults),
    marker: TP_MARKER,
    trs: TP_TRS,
  });
  if (returnDate) p.set("return_date", returnDate);
  return `https://search.jetradar.com/flights/?${p.toString()}`;
}

function buildSkyscannerUrl(origin: string, dest: string, date: string | null, flexible?: boolean): string {
  if (flexible || !date) {
    return `https://www.skyscanner.es/transporte/vuelos/${origin.toLowerCase()}/${dest.toLowerCase()}/`;
  }
  const yymmdd = date.replace(/-/g, "").slice(2);
  return `https://www.skyscanner.es/transporte/vuelos/${origin.toLowerCase()}/${dest.toLowerCase()}/${yymmdd}/`;
}

function buildKayakUrl(origin: string, dest: string, date: string | null, returnDate?: string | null, flexible?: boolean): string {
  if (flexible || !date) return `https://www.kayak.es/flights/${origin}-${dest}/`;
  let url = `https://www.kayak.es/flights/${origin}-${dest}/${date}`;
  if (returnDate) url += `/${returnDate}`;
  return url;
}

function buildEdreamsUrl(origin: string, dest: string, date: string | null, returnDate?: string | null, adults?: number): string {
  const compact = date?.replace(/-/g, "") ?? "";
  const retCompact = returnDate?.replace(/-/g, "") ?? "";
  const type = returnDate ? "ROUND_TRIP" : "ONE_WAY";
  let url = `https://www.edreams.es/search/#results/type=${type};fromAirport=${origin};toAirport=${dest};adults=${adults ?? 1}`;
  if (compact) url += `;departureDate=${compact}`;
  if (retCompact) url += `;returnDate=${retCompact}`;
  return url;
}

function buildHotelUrls(city: string, checkIn: string, nights: number, adults: number) {
  const checkOut = addDays(checkIn, nights);
  return {
    booking: `https://www.booking.com/searchresults.es.html?ss=${encodeURIComponent(city)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&no_rooms=1`,
    airbnb:  `https://www.airbnb.es/s/${encodeURIComponent(city)}/homes?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}`,
  };
}

// ─── Componente iframe de vuelos ──────────────────────────────────────────────
function FlightIframe({ src }: { src: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm" style={{ height: 620 }}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="payment"
        title="Búsqueda de vuelos"
        className="w-full h-full"
      />
    </div>
  );
}

// ─── Chips de buscadores alternativos ────────────────────────────────────────
function AltProviders({ urls }: { urls: { name: string; url: string; color: string }[] }) {
  return (
    <div className="flex items-center gap-2 flex-wrap mt-3">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">También en:</span>
      {urls.map(p => (
        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
          className={`text-xs font-semibold text-slate-500 bg-slate-100 ${p.color} hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors`}>
          {p.name}
        </a>
      ))}
    </div>
  );
}

interface Props {
  parsed: ParsedTravelRequest;
  recommendations: DestinationRecommendation[];
}

export function RealSearchPanel({ parsed, recommendations }: Props) {
  const [expandedDest, setExpandedDest] = useState<string | null>(null);

  const origin     = parsed.originAirportCode ?? "MAD";
  const originCity = parsed.origin ?? "Madrid";
  const adults     = parsed.passengers ?? 1;
  const nights     = parsed.durationDays ?? 5;
  const flexible   = parsed.flexibleDates || !parsed.departureDate;
  const date       = parsed.departureDate ?? (flexible ? null : defaultDate());
  const returnDate = parsed.returnDate ??
    (parsed.durationDays && date ? addDays(date, parsed.durationDays) : null);

  // ── Destino concreto ────────────────────────────────────────────────────────
  if (!parsed.flexibleDestination && parsed.destinationAirportCode) {
    const dest     = parsed.destinationAirportCode;
    const destName = parsed.destination ?? dest;
    const hUrls    = hotelCheckIn(date) ? buildHotelUrls(destName, date ?? defaultDate(), nights, adults) : null;
    const jetradar = buildJetradarUrl(origin, dest, date, adults, returnDate);

    return (
      <div className="space-y-4">
        {/* Cabecera */}
        <div className="card-premium rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Plane className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Vuelos {originCity} → {destName}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {flexible
                  ? `Fecha orientativa: ${formatDateEs(date ?? defaultDate())} · cámbiala en el buscador`
                  : `${date ? formatDateEs(date) : ""}${returnDate ? ` — ${formatDateEs(returnDate)}` : ""}`}
                {" · "}{adults} {adults === 1 ? "adulto" : "adultos"}
              </p>
            </div>
          </div>

          {/* Iframe Jetradar */}
          <FlightIframe src={jetradar} />

          {/* Buscadores alternativos */}
          <AltProviders urls={[
            { name: "Skyscanner", url: buildSkyscannerUrl(origin, dest, date, flexible), color: "hover:text-blue-600" },
            { name: "Kayak",      url: buildKayakUrl(origin, dest, date, returnDate, flexible), color: "hover:text-orange-500" },
            { name: "eDreams",    url: buildEdreamsUrl(origin, dest, date, returnDate, adults),  color: "hover:text-red-500" },
          ]} />
        </div>

        {/* Hoteles */}
        {hUrls && (
          <div className="card-premium rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Hotel className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Alojamiento en {destName}</h3>
                <p className="text-xs text-slate-400">{nights} noches · {adults} {adults === 1 ? "adulto" : "adultos"}</p>
              </div>
            </div>
            <div className="flex gap-3">
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
        )}
      </div>
    );
  }

  // ── Destino flexible — iframe por destino al hacer clic ────────────────────
  if (recommendations.length > 0) {
    return (
      <div className="card-premium rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Buscar vuelos a los destinos recomendados</h3>
            <p className="text-xs text-slate-400">
              Haz clic en un destino para ver vuelos reales desde {originCity}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {recommendations.map(rec => {
            const jetradar = buildJetradarUrl(origin, rec.airportCode, date, adults, returnDate);
            const isOpen   = expandedDest === rec.airportCode;

            return (
              <div key={rec.airportCode}>
                <button
                  onClick={() => setExpandedDest(isOpen ? null : rec.airportCode)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg font-mono">
                      {rec.airportCode}
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-800">{rec.city}</p>
                      <p className="text-xs text-slate-400">{rec.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-500">
                    <span>{isOpen ? "Cerrar" : "Ver vuelos"}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-2 mb-1">
                    <FlightIframe src={jetradar} />
                    <AltProviders urls={[
                      { name: "Skyscanner", url: buildSkyscannerUrl(origin, rec.airportCode, date, flexible), color: "hover:text-blue-600" },
                      { name: "Kayak",      url: buildKayakUrl(origin, rec.airportCode, date, returnDate, flexible), color: "hover:text-orange-500" },
                      { name: "eDreams",    url: buildEdreamsUrl(origin, rec.airportCode, date, returnDate, adults), color: "hover:text-red-500" },
                    ]} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

// helper
function hotelCheckIn(date: string | null): date is string {
  return !!date;
}
