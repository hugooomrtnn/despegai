// ─── Cliente de la Travelpayouts Data API ────────────────────────────────────
// Docs: https://travelpayouts.github.io/slate/#flight_prices_data
// Requiere un token gratuito de https://www.travelpayouts.com/developers (cuenta
// de afiliado ya existente — el mismo marker que usan los enlaces de Jetradar).

export type CheapTicket = {
  destinationCode: string;
  price: number;
  currency: string;
  departureAt: string | null;
  returnAt: string | null;
  airline: string | null;
  stops: number;
  durationOutMinutes: number | null;
  durationBackMinutes: number | null;
};

type CheapPricesRaw = {
  success: boolean;
  data?: Record<string, Record<string, {
    price: number;
    airline?: string;
    flight_number?: number;
    departure_at?: string;
    return_at?: string;
    expires_at?: string;
    duration_to?: number;
    duration_back?: number;
  }>>;
  error?: string;
};

export function isTravelpayoutsConfigured(): boolean {
  return !!process.env.TRAVELPAYOUTS_API_TOKEN;
}

// "Cheap tickets" — precios más baratos encontrados recientemente desde un origen,
// agrupados por destino (y, dentro de cada destino, por número de escalas). Una
// sola llamada cubre decenas de destinos a la vez. Nos quedamos con la opción más
// barata de cada destino (entre sus variantes de escalas) y descartamos las que ya
// tengan la fecha de salida en el pasado.
export async function fetchCheapestFromOrigin(
  originCode: string,
  currency = "eur"
): Promise<CheapTicket[]> {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) throw new Error("TRAVELPAYOUTS_API_TOKEN no configurado");

  const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${originCode}&currency=${currency}&token=${token}`;
  const res = await fetch(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Travelpayouts respondió ${res.status} para origen ${originCode}`);
  }

  const json = (await res.json()) as CheapPricesRaw;
  if (!json.success) {
    throw new Error(`Travelpayouts error: ${json.error ?? "respuesta sin success"}`);
  }

  const now = Date.now();
  const cheapestByDestination = new Map<string, CheapTicket>();

  for (const [destinationCode, byStops] of Object.entries(json.data ?? {})) {
    for (const [stopsKey, entry] of Object.entries(byStops)) {
      if (typeof entry?.price !== "number") continue;
      if (entry.departure_at && new Date(entry.departure_at).getTime() < now) continue;

      const candidate: CheapTicket = {
        destinationCode,
        price: entry.price,
        currency: currency.toUpperCase(),
        departureAt: entry.departure_at ?? null,
        returnAt: entry.return_at ?? null,
        airline: entry.airline ?? null,
        stops: Number(stopsKey) || 0,
        durationOutMinutes: entry.duration_to ?? null,
        durationBackMinutes: entry.duration_back ?? null,
      };

      const existing = cheapestByDestination.get(destinationCode);
      if (!existing || candidate.price < existing.price) {
        cheapestByDestination.set(destinationCode, candidate);
      }
    }
  }

  return Array.from(cheapestByDestination.values());
}
