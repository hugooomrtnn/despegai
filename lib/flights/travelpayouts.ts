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
  }>>;
  error?: string;
};

export function isTravelpayoutsConfigured(): boolean {
  return !!process.env.TRAVELPAYOUTS_API_TOKEN;
}

// "Cheap tickets" — precios más baratos encontrados recientemente desde un origen,
// agrupados por destino. Una sola llamada cubre decenas de destinos a la vez.
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

  const tickets: CheapTicket[] = [];
  for (const [destinationCode, byStops] of Object.entries(json.data ?? {})) {
    for (const entry of Object.values(byStops)) {
      if (typeof entry?.price !== "number") continue;
      tickets.push({
        destinationCode,
        price: entry.price,
        currency: currency.toUpperCase(),
        departureAt: entry.departure_at ?? null,
        returnAt: entry.return_at ?? null,
        airline: entry.airline ?? null,
      });
    }
  }

  return tickets;
}
