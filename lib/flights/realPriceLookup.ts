import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

// Únicos orígenes que el cron de /chollos rastrea hoy (ver app/api/cron/refresh-chollos).
const TRACKED_ORIGINS = new Set(["MAD", "BCN"]);

export function isOriginTracked(originCode: string): boolean {
  return TRACKED_ORIGINS.has(originCode);
}

// Precios reales detectados por Travelpayouts (los mismos que alimentan /chollos),
// reutilizados aquí para que el precio de una búsqueda concreta —y el de las
// tarjetas de /destinos— coincida con lo que se ve al pinchar en "Ver vuelos
// disponibles" en vez de depender solo de la fórmula simulada por distancia.
export async function getRealAnchorPrices(
  originCode: string,
  destinationCodes?: string[]
): Promise<Map<string, number>> {
  const result = new Map<string, number>();
  if (!isOriginTracked(originCode) || !isSupabaseConfigured()) return result;
  if (destinationCodes && destinationCodes.length === 0) return result;

  try {
    const supabase = await createClient();
    let query = supabase
      .from("chollos")
      .select("destination_code, price")
      .eq("origin_code", originCode);

    if (destinationCodes) query = query.in("destination_code", destinationCodes);

    const { data, error } = await query;
    if (error || !data) return result;
    for (const row of data) result.set(row.destination_code, Math.round(row.price));
  } catch {
    // Silencioso: si falla la consulta, se usa la fórmula simulada como respaldo.
  }

  return result;
}
