import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

// Únicos orígenes que el cron de /chollos rastrea hoy (ver app/api/cron/refresh-chollos).
const TRACKED_ORIGINS = new Set(["MAD", "BCN"]);

export function isOriginTracked(originCode: string): boolean {
  return TRACKED_ORIGINS.has(originCode);
}

export type RealTicket = {
  price: number;
  airline: string | null;
  departureAt: string | null;
  returnAt: string | null;
  stops: number | null;
  durationOutMinutes: number | null;
  durationBackMinutes: number | null;
};

// Precios (y fecha, aerolínea, escalas y duración) reales detectados por
// Travelpayouts — los mismos que alimentan /chollos — reutilizados aquí para que
// el resultado de una búsqueda concreta, y las tarjetas de /destinos, coincidan
// con lo que se ve al pinchar en "Ver vuelos disponibles" en vez de depender de
// una fórmula simulada.
export async function getRealTickets(
  originCode: string,
  destinationCodes?: string[]
): Promise<Map<string, RealTicket>> {
  const result = new Map<string, RealTicket>();
  if (!isOriginTracked(originCode) || !isSupabaseConfigured()) return result;
  if (destinationCodes && destinationCodes.length === 0) return result;

  try {
    const supabase = await createClient();
    let query = supabase
      .from("chollos")
      .select("destination_code, price, airline, departure_at, return_at, stops, duration_out, duration_back")
      .eq("origin_code", originCode);

    if (destinationCodes) query = query.in("destination_code", destinationCodes);

    const { data, error } = await query;
    if (error || !data) return result;

    for (const row of data) {
      result.set(row.destination_code, {
        price: Math.round(row.price),
        airline: row.airline,
        departureAt: row.departure_at,
        returnAt: row.return_at,
        stops: row.stops,
        durationOutMinutes: row.duration_out,
        durationBackMinutes: row.duration_back,
      });
    }
  } catch {
    // Silencioso: si falla la consulta, se usa la fórmula simulada como respaldo.
  }

  return result;
}

// Atajo para cuando solo hace falta el precio (p. ej. las tarjetas de /destinos).
export async function getRealAnchorPrices(
  originCode: string,
  destinationCodes?: string[]
): Promise<Map<string, number>> {
  const tickets = await getRealTickets(originCode, destinationCodes);
  const prices = new Map<string, number>();
  tickets.forEach((ticket, code) => prices.set(code, ticket.price));
  return prices;
}
