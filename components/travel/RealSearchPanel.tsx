"use client";

import { useState } from "react";
import { Plane, Hotel, ExternalLink, MapPin, Calendar, ChevronDown, ShieldCheck } from "lucide-react";
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
    curr: "EUR",
    locale: "es",
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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildGoogleFlightsUrl(originCity: string, destName: string, _date?: string | null, _returnDate?: string | null): string {
  const q = encodeURIComponent(`Vuelos de ${originCity} a ${destName}`);
  return `https://www.google.es/travel/flights?hl=es&curr=EUR&q=${q}`;
}

function buildIberiaUrl(origin: string, dest: string, date: string | null, returnDate?: string | null, adults = 1): string {
  const compact = (date ?? defaultDate()).replace(/-/g, "");
  const tripType = returnDate ? "RT" : "OW";
  const retCompact = returnDate?.replace(/-/g, "") ?? "";
  let url = `https://www.iberia.com/es/flights/?origin=${origin}&destination=${dest}&departureDate=${compact}&tripType=${tripType}&adults=${adults}&cabin=Y`;
  if (retCompact) url += `&returnDate=${retCompact}`;
  return url;
}

function buildVuelingUrl(origin: string, dest: string, date: string | null, returnDate?: string | null, adults = 1): string {
  const dep = date ?? defaultDate();
  const [y, m, d] = dep.split("-");
  const depFormatted = `${d}/${m}/${y}`;
  const flightType = returnDate ? "RT" : "OW";
  let url = `https://www.vueling.com/es/ve-a-lo-que-vuelas/encuentra-tu-vuelo?departure=${origin}&arrival=${dest}&departureDate=${depFormatted}&adults=${adults}&flightType=${flightType}&lang=es`;
  if (returnDate) {
    const [ry, rm, rd] = returnDate.split("-");
    url += `&returnDate=${rd}/${rm}/${ry}`;
  }
  return url;
}

function buildRyanairUrl(origin: string, dest: string, date: string | null): string {
  const dep = (date ?? defaultDate()).replace(/-/g, "");
  return `https://www.ryanair.com/es/es/vuelos-baratos?from=${origin}&to=${dest}&dateOut=${dep}&adults=1`;
}

function buildHotelUrls(city: string, checkIn: string, nights: number, adults: number) {
  const checkOut = addDays(checkIn, nights);
  return {
    booking: `https://www.booking.com/searchresults.es.html?ss=${encodeURIComponent(city)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&no_rooms=1`,
    airbnb:  `https://www.airbnb.es/s/${encodeURIComponent(city)}/homes?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}`,
  };
}

// ─── Fechas semanales del mes para búsqueda flexible ─────────────────────────
function getMonthDates(baseDate: string, max = 5): string[] {
  const dates: string[] = [];
  const [y, m] = baseDate.split("-").map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const current = new Date(y, m - 1, 1);
  while (current.getMonth() === m - 1 && dates.length < max) {
    if (current >= today) {
      dates.push(current.toISOString().split("T")[0]);
    }
    current.setDate(current.getDate() + 7);
  }
  return dates;
}

// ─── Lista de fechas del mes como acordeón ───────────────────────────────────
function FlexibleDateList({ dates, origin, dest, adults, durationDays, returnDate }: {
  dates: string[];
  origin: string;
  dest: string;
  adults: number;
  durationDays: number | null;
  returnDate: string | null;
}) {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set([dates[0]]));

  function toggle(d: string) {
    setOpenSet(prev => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  }

  return (
    <div className="space-y-2 mb-4">
      {dates.map(d => {
        const ret = durationDays ? addDays(d, durationDays) : returnDate;
        const isOpen = openSet.has(d);
        const jetradar = buildJetradarUrl(origin, dest, d, adults, ret ?? null);

        return (
          <div key={d} className="rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => toggle(d)}
              className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-sky-50/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-sky-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800">{formatDateEs(d)}</p>
                  {ret && <p className="text-xs text-slate-400">Vuelta: {formatDateEs(ret)}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-500 group-hover:text-sky-600">
                <span>{isOpen ? "Cerrar" : "Ver vuelos"}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-slate-100">
                <FlightIframe src={jetradar} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
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

// ─── Grid de buscadores reconocidos ──────────────────────────────────────────
const PROVIDER_STYLES: Record<string, string> = {
  "Google Flights": "bg-white border-slate-200 hover:border-blue-300 hover:shadow-blue-100",
  "Iberia":         "bg-white border-slate-200 hover:border-red-300 hover:shadow-red-100",
  "Vueling":        "bg-white border-slate-200 hover:border-yellow-300 hover:shadow-yellow-100",
  "Ryanair":        "bg-white border-slate-200 hover:border-blue-300 hover:shadow-blue-100",
  "Skyscanner":     "bg-white border-slate-200 hover:border-sky-300 hover:shadow-sky-100",
  "Kayak":          "bg-white border-slate-200 hover:border-orange-300 hover:shadow-orange-100",
};
const PROVIDER_EMOJI: Record<string, string> = {
  "Google Flights": "✈️",
  "Iberia":         "🔴",
  "Vueling":        "🟡",
  "Ryanair":        "💙",
  "Skyscanner":     "🔵",
  "Kayak":          "🟠",
};

function AltProviders({ urls }: { urls: { name: string; url: string }[] }) {
  return (
    <div className="mt-4">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
        ¿Dónde quieres comprar tu vuelo?
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {urls.map(p => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl border text-center transition-all shadow-sm hover:shadow-md ${PROVIDER_STYLES[p.name] ?? "bg-white border-slate-200 hover:border-slate-300"}`}
          >
            <span className="text-lg leading-none">{PROVIDER_EMOJI[p.name] ?? "🔗"}</span>
            <span className="text-[11px] font-bold text-slate-700 leading-tight">{p.name}</span>
          </a>
        ))}
      </div>
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
  const baseDate   = parsed.departureDate ?? (flexible ? null : defaultDate());

  const selectedDate = baseDate ?? defaultDate();

  // Cuando hay duración, la vuelta se recalcula sobre la fecha seleccionada
  const returnDate = parsed.returnDate ??
    (parsed.durationDays ? addDays(selectedDate, parsed.durationDays) : null);

  // Fechas semanales del mes cuando la búsqueda es flexible por mes (solo fechas futuras)
  const _rawMonthDates = (flexible && baseDate) ? getMonthDates(baseDate) : null;
  const monthDates = _rawMonthDates && _rawMonthDates.length > 0 ? _rawMonthDates : null;

  // ── Destino concreto ────────────────────────────────────────────────────────
  if (!parsed.flexibleDestination && parsed.destinationAirportCode) {
    const dest     = parsed.destinationAirportCode;
    const destName = parsed.destination ?? dest;
    const hUrls    = buildHotelUrls(destName, selectedDate, nights, adults);
    const jetradar = buildJetradarUrl(origin, dest, selectedDate, adults, returnDate);

    return (
      <div className="space-y-4">
        {/* Cabecera */}
        <div className="card-premium rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Plane className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Vuelos {originCity} → {destName}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {monthDates
                  ? new Date((baseDate ?? selectedDate) + "T12:00:00").toLocaleDateString("es-ES", { month: "long", year: "numeric" })
                  : formatDateEs(selectedDate)
                }
                {!monthDates && returnDate ? ` — ${formatDateEs(returnDate)}` : ""}
                {" · "}{adults} {adults === 1 ? "adulto" : "adultos"}
                {flexible && !monthDates && " · fecha orientativa"}
              </p>
            </div>
          </div>

          {/* Banner de transparencia */}
          <div className="flex items-center gap-2.5 bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5 mb-3">
            <ShieldCheck className="h-4 w-4 text-sky-500 flex-shrink-0" />
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Selecciona tu vuelo</span> — al pulsar «Comprar» te llevamos directamente a la aerolínea o agencia oficial para completar la reserva de forma segura.
            </p>
          </div>

          {/* Vuelos: acordeón con todas las fechas del mes o iframe único */}
          {monthDates ? (
            <FlexibleDateList
              dates={monthDates}
              origin={origin}
              dest={dest}
              adults={adults}
              durationDays={parsed.durationDays ?? null}
              returnDate={parsed.returnDate ?? null}
            />
          ) : (
            <FlightIframe src={jetradar} />
          )}

          {/* Buscadores alternativos */}
          <AltProviders urls={[
            { name: "Google Flights", url: buildGoogleFlightsUrl(originCity, destName, selectedDate, returnDate) },
            { name: "Iberia",         url: buildIberiaUrl(origin, dest, selectedDate, returnDate, adults) },
            { name: "Vueling",        url: buildVuelingUrl(origin, dest, selectedDate, returnDate, adults) },
            { name: "Ryanair",        url: buildRyanairUrl(origin, dest, selectedDate) },
            { name: "Skyscanner",     url: buildSkyscannerUrl(origin, dest, selectedDate, false) },
            { name: "Kayak",          url: buildKayakUrl(origin, dest, selectedDate, returnDate, false) },
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
          <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
            const jetradar = buildJetradarUrl(origin, rec.airportCode, baseDate, adults, returnDate);
            const isOpen   = expandedDest === rec.airportCode;

            return (
              <div key={rec.airportCode}>
                <button
                  onClick={() => setExpandedDest(isOpen ? null : rec.airportCode)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 transition-all group"
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
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-500">
                    <span>{isOpen ? "Cerrar" : "Ver vuelos"}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-2 mb-1">
                    <div className="flex items-center gap-2.5 bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5 mb-3">
                      <ShieldCheck className="h-4 w-4 text-sky-500 flex-shrink-0" />
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">Selecciona tu vuelo</span> — al pulsar «Comprar» te llevamos a la aerolínea o agencia oficial para reservar de forma segura.
                      </p>
                    </div>
                    <FlightIframe src={jetradar} />
                    <AltProviders urls={[
                      { name: "Google Flights", url: buildGoogleFlightsUrl(originCity, rec.city, baseDate, returnDate) },
                      { name: "Iberia",         url: buildIberiaUrl(origin, rec.airportCode, baseDate, returnDate, adults) },
                      { name: "Vueling",        url: buildVuelingUrl(origin, rec.airportCode, baseDate, returnDate, adults) },
                      { name: "Ryanair",        url: buildRyanairUrl(origin, rec.airportCode, baseDate) },
                      { name: "Skyscanner",     url: buildSkyscannerUrl(origin, rec.airportCode, baseDate, flexible) },
                      { name: "Kayak",          url: buildKayakUrl(origin, rec.airportCode, baseDate, returnDate, flexible) },
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

