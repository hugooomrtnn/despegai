import { NextRequest, NextResponse } from "next/server";
import { fetchCheapestFromOrigin, isTravelpayoutsConfigured } from "@/lib/flights/travelpayouts";
import { createServiceClient, isServiceRoleConfigured } from "@/lib/supabase/serviceClient";
import { DESTINATIONS_CATALOG } from "@/lib/flights/mockFlightProvider";

export const maxDuration = 60;

// Orígenes que se consultan en cada refresco. Una llamada por origen cubre
// decenas de destinos de golpe (la Data API los devuelve todos agrupados).
const ORIGINS = ["MAD", "BCN"];

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!isTravelpayoutsConfigured()) {
    return NextResponse.json({ error: "TRAVELPAYOUTS_API_TOKEN no configurado", code: "NO_TRAVELPAYOUTS" }, { status: 500 });
  }
  if (!isServiceRoleConfigured()) {
    return NextResponse.json({ error: "Supabase service role no configurado", code: "NO_SUPABASE" }, { status: 500 });
  }

  const supabase = createServiceClient();
  const catalogByCode = new Map(DESTINATIONS_CATALOG.map((d) => [d.airportCode, d]));

  let totalUpserted = 0;
  const results: Record<string, number | string> = {};

  for (const origin of ORIGINS) {
    try {
      const tickets = await fetchCheapestFromOrigin(origin, "eur");

      // Solo guardamos destinos que ya conocemos en el catálogo (para tener
      // ciudad, país y tags con los que pintar la tarjeta correctamente).
      const rows = tickets
        .filter((t) => catalogByCode.has(t.destinationCode))
        .map((t) => {
          const dest = catalogByCode.get(t.destinationCode)!;
          return {
            origin_code: origin,
            destination_code: t.destinationCode,
            destination_city: dest.city,
            destination_country: dest.country,
            price: t.price,
            currency: t.currency,
            airline: t.airline,
            departure_at: t.departureAt,
            return_at: t.returnAt,
            source: "travelpayouts",
            detected_at: new Date().toISOString(),
          };
        });

      if (rows.length > 0) {
        const { error } = await supabase
          .from("chollos")
          .upsert(rows, { onConflict: "origin_code,destination_code" });
        if (error) throw error;
      }

      totalUpserted += rows.length;
      results[origin] = rows.length;
    } catch (e) {
      console.error(`[cron/refresh-chollos] Error con origen ${origin}:`, e);
      results[origin] = e instanceof Error ? e.message : "error desconocido";
    }
  }

  return NextResponse.json({ ok: true, totalUpserted, results });
}
