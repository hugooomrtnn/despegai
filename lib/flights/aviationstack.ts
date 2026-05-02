import type { FlightResult, ParsedTravelRequest } from "@/types/travel";

// Free plan usa HTTP (sin SSL). Cambiar a https en plan de pago.
const BASE_URL = "http://api.aviationstack.com/v1";

// Precio estimado según duración del vuelo (Aviationstack no devuelve precios)
function estimatePrice(durationMinutes: number, stops: number): number {
  const base = 40 + durationMinutes * 0.55;
  const stopPenalty = stops * 30;
  const jitter = Math.round((Math.random() - 0.5) * base * 0.2);
  return Math.round(base + stopPenalty + jitter);
}

function diffMinutes(from: string, to: string): number {
  return Math.round((new Date(to).getTime() - new Date(from).getTime()) / 60000);
}

function skyscannerUrl(origin: string, dest: string, date: string, adults: number): string {
  const d = date.replace(/-/g, "").slice(2); // YYMMDD
  return `https://www.skyscanner.es/transporte/vuelos/${origin.toLowerCase()}/${dest.toLowerCase()}/${d}/?adults=${adults}`;
}

interface AviationstackFlight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    iata: string;
    scheduled: string;
    estimated: string | null;
    terminal: string | null;
  };
  arrival: {
    airport: string;
    iata: string;
    scheduled: string;
    estimated: string | null;
    terminal: string | null;
  };
  airline: { name: string; iata: string };
  flight: { iata: string; number: string };
}

export async function searchAviationstackFlights(
  request: ParsedTravelRequest
): Promise<FlightResult[]> {
  const key = process.env.AVIATIONSTACK_API_KEY!;
  const originCode = request.originAirportCode ?? "MAD";
  const destCode = request.destinationAirportCode;

  if (!destCode) throw new Error("Aviationstack requiere un destino concreto");

  const flightDate = request.departureDate ?? (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // mañana (los datos históricos son más fiables)
    return d.toISOString().split("T")[0];
  })();

  const params = new URLSearchParams({
    access_key: key,
    dep_iata: originCode,
    arr_iata: destCode,
    flight_date: flightDate,
    flight_status: "scheduled",
    limit: "10",
  });

  const res = await fetch(`${BASE_URL}/flights?${params}`);

  if (!res.ok) {
    throw new Error(`Aviationstack error: ${res.status}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(`Aviationstack API error: ${data.error.info ?? data.error.type}`);
  }

  const flights: AviationstackFlight[] = data.data ?? [];

  if (flights.length === 0) {
    throw new Error("No flights found for this route/date");
  }

  return flights.map((f, idx): FlightResult => {
    const depTime = f.departure.estimated ?? f.departure.scheduled;
    const arrTime = f.arrival.estimated ?? f.arrival.scheduled;
    const duration = diffMinutes(depTime, arrTime);
    const stops = 0; // Aviationstack free no devuelve escalas; asumimos directo
    const price = estimatePrice(duration, stops);
    const adults = request.passengers ?? 1;

    return {
      id: `avstack-${f.flight.iata ?? f.flight.number}-${idx}`,
      originCity: request.origin ?? f.departure.airport,
      originAirport: f.departure.iata,
      destinationCity: request.destination ?? f.arrival.airport,
      destinationAirport: f.arrival.iata,
      airline: f.airline.name,
      departureTime: depTime,
      arrivalTime: arrTime,
      price,
      currency: "EUR",
      durationMinutes: duration > 0 ? duration : 120,
      stops,
      bookingUrl: skyscannerUrl(f.departure.iata, f.arrival.iata, flightDate, adults),
      score: 0,
      recommendationReason: "",
      badges: [],
    };
  });
}
