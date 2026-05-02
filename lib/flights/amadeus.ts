import type { FlightResult, ParsedTravelRequest } from "@/types/travel";

const BASE_URL = "https://test.api.amadeus.com"; // cambiar a api.amadeus.com en producción

// ─── Token cache (se reutiliza mientras no expire) ───────────────────────────
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  const clientId = process.env.AMADEUS_CLIENT_ID!;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET!;

  const res = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Amadeus auth failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  cachedToken = data.access_token as string;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseDurationToMinutes(iso: string): number {
  const h = parseInt(iso.match(/(\d+)H/)?.[1] ?? "0");
  const m = parseInt(iso.match(/(\d+)M/)?.[1] ?? "0");
  return h * 60 + m;
}

function defaultDepartureDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const AIRLINE_NAMES: Record<string, string> = {
  IB: "Iberia", VY: "Vueling", FR: "Ryanair", U2: "easyJet",
  LH: "Lufthansa", AF: "Air France", BA: "British Airways",
  KL: "KLM", AZ: "ITA Airways", TP: "TAP Portugal",
  EK: "Emirates", QR: "Qatar Airways", TK: "Turkish Airlines",
  AA: "American Airlines", DL: "Delta", UA: "United Airlines",
  NH: "ANA", JL: "Japan Airlines", SQ: "Singapore Airlines",
  W6: "Wizz Air", TO: "Transavia", V7: "Volotea",
  UX: "Air Europa", BV: "Blue Air", PC: "Pegasus",
};

function airlineName(code: string): string {
  return AIRLINE_NAMES[code] ?? code;
}

function buildBookingUrl(origin: string, destination: string, date: string, adults: number): string {
  const d = date.replace(/-/g, "").slice(2); // YYMMDD
  return `https://www.skyscanner.es/transporte/vuelos/${origin.toLowerCase()}/${destination.toLowerCase()}/${d}/?adults=${adults}`;
}

// ─── Tipos internos de la API de Amadeus ─────────────────────────────────────
interface AmadeusSegment {
  departure: { iataCode: string; at: string };
  arrival: { iataCode: string; at: string };
  carrierCode: string;
  numberOfStops: number;
}

interface AmadeusItinerary {
  duration: string;
  segments: AmadeusSegment[];
}

interface AmadeusOffer {
  id: string;
  itineraries: AmadeusItinerary[];
  price: { total: string; currency: string };
  validatingAirlineCodes: string[];
}

// ─── Mapea una oferta Amadeus → FlightResult ─────────────────────────────────
function mapOffer(
  offer: AmadeusOffer,
  request: ParsedTravelRequest,
  idx: number
): FlightResult {
  const outbound = offer.itineraries[0];
  const inbound = offer.itineraries[1];

  const firstSeg = outbound.segments[0];
  const lastSeg = outbound.segments[offer.itineraries[0].segments.length - 1];

  const originCode = firstSeg.departure.iataCode;
  const destCode = lastSeg.arrival.iataCode;
  const carrier = offer.validatingAirlineCodes?.[0] ?? firstSeg.carrierCode;

  const stops = outbound.segments.length - 1;
  const duration = parseDurationToMinutes(outbound.duration);
  const price = parseFloat(offer.price.total);

  return {
    id: `amadeus-${offer.id}-${idx}`,
    originCity: request.origin ?? originCode,
    originAirport: originCode,
    destinationCity: request.destination ?? destCode,
    destinationAirport: destCode,
    airline: airlineName(carrier),
    departureTime: firstSeg.departure.at,
    arrivalTime: lastSeg.arrival.at,
    returnDepartureTime: inbound?.segments[0]?.departure.at,
    returnArrivalTime: inbound?.segments[inbound.segments.length - 1]?.arrival.at,
    price,
    currency: offer.price.currency ?? "EUR",
    durationMinutes: duration,
    stops,
    bookingUrl: buildBookingUrl(originCode, destCode, firstSeg.departure.at.slice(0, 10), request.passengers ?? 1),
    score: 0,
    recommendationReason: "",
    badges: [],
  };
}

// ─── Búsqueda principal ───────────────────────────────────────────────────────
export async function searchAmadeusFlights(request: ParsedTravelRequest): Promise<FlightResult[]> {
  const originCode = request.originAirportCode ?? "MAD";
  const destCode = request.destinationAirportCode;

  if (!destCode) throw new Error("Amadeus requires a specific destination");

  const departureDate = request.departureDate ?? defaultDepartureDate();
  const passengers = request.passengers ?? 1;

  // Parámetros base
  const params = new URLSearchParams({
    originLocationCode: originCode,
    destinationLocationCode: destCode,
    departureDate,
    adults: String(passengers),
    max: "10",
    currencyCode: "EUR",
  });

  // Si hay vuelta, calcular fecha de retorno
  if (request.durationDays) {
    params.set("returnDate", addDays(departureDate, request.durationDays));
  } else if (request.returnDate) {
    params.set("returnDate", request.returnDate);
  }

  // Solo directos si el usuario lo pide
  if (request.preferences?.includes("vuelo directo")) {
    params.set("nonStop", "true");
  }

  const token = await getToken();

  const res = await fetch(`${BASE_URL}/v2/shopping/flight-offers?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    // Cachear 5 minutos en el edge (opcional)
    next: { revalidate: 300 },
  } as RequestInit);

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Amadeus search failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  const offers: AmadeusOffer[] = data.data ?? [];

  return offers.map((offer, idx) => mapOffer(offer, request, idx));
}
