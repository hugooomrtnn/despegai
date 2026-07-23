import { Flame } from "lucide-react";
import type { Metadata } from "next";
import { DESTINATIONS_CATALOG, getFlightBasePrice } from "@/lib/flights/mockFlightProvider";
import { getContinent, getFlag, roundPrice, CONTINENTS, FAMOUS_CITY_CODES } from "@/lib/data/destinationMeta";
import { ChollosExplorer } from "@/components/travel/ChollosExplorer";
import type { DestinationCard } from "@/components/travel/DestinationsExplorer";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Chollos de vuelos internacionales — Despegai",
  description: "Los vuelos internacionales más baratos detectados desde España, en Europa y fuera de Europa, y alertas de precio para tus destinos favoritos.",
};

const PER_CONTINENT = 8;

// Los vuelos más baratos son casi siempre de corta distancia (Europa). Para que
// también aparezcan chollos fuera de Europa, se coge lo más barato POR CONTINENTE
// en vez de ordenar todo el catálogo/tabla por precio global. Además, los destinos
// icónicos (FAMOUS_CITY_CODES) se añaden siempre que haya datos para ellos, aunque
// no estén entre los más baratos de su continente ese día.
function pickTopPerContinent(items: DestinationCard[], perContinent = PER_CONTINENT): DestinationCard[] {
  return CONTINENTS.flatMap((continent) => {
    const continentItems = items.filter((d) => d.continent === continent);
    const cheapest = [...continentItems].sort((a, b) => a.price - b.price).slice(0, perContinent);
    const cheapestCodes = new Set(cheapest.map((d) => d.code));
    const famous = continentItems.filter((d) => FAMOUS_CITY_CODES.has(d.code) && !cheapestCodes.has(d.code));
    return [...cheapest, ...famous].sort((a, b) => a.price - b.price);
  });
}

function buildCatalogCard(code: string, isReal: boolean): DestinationCard | null {
  const d = DESTINATIONS_CATALOG.find((c) => c.airportCode === code);
  if (!d) return null;
  return {
    city: d.city,
    country: d.country,
    code: d.airportCode,
    flag: getFlag(d.country),
    price: roundPrice(getFlightBasePrice(d.airportCode, d.estimatedPriceLevel)),
    tags: d.tags.slice(0, 3),
    continent: getContinent(d.country),
    isReal,
  };
}

function buildSimulatedDeals(): DestinationCard[] {
  const all: DestinationCard[] = DESTINATIONS_CATALOG
    .filter((d) => d.country !== "España")
    .map((d) => buildCatalogCard(d.airportCode, false)!);
  return pickTopPerContinent(all);
}

type RealDealsResult = { deals: DestinationCard[]; lastUpdated: string } | null;

// Lee los chollos que el cron (/api/cron/refresh-chollos) va guardando con
// precios reales de la Travelpayouts Data API. Si aún no hay datos (token sin
// configurar, cron no ejecutado todavía, o falla la consulta) devuelve null y
// la página cae de vuelta a la estimación simulada.
async function getRealDeals(): Promise<RealDealsResult> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("chollos")
      .select("destination_code, destination_city, destination_country, price, detected_at")
      .order("price", { ascending: true })
      .limit(300);

    if (error || !data || data.length === 0) return null;

    const byCode = new Map(DESTINATIONS_CATALOG.map((d) => [d.airportCode, d]));
    const deals: DestinationCard[] = data
      .filter((row) => row.destination_country && row.destination_country !== "España")
      .map((row) => {
        const catalogEntry = byCode.get(row.destination_code);
        const country = row.destination_country ?? catalogEntry?.country ?? "";
        return {
          city: row.destination_city ?? catalogEntry?.city ?? row.destination_code,
          country,
          code: row.destination_code,
          flag: getFlag(country),
          price: Math.round(row.price),
          tags: catalogEntry?.tags.slice(0, 3) ?? [],
          continent: getContinent(country),
          isReal: true,
        };
      });

    // Destinos icónicos sin precio real ese día: se añaden con una estimación,
    // marcada individualmente como tal (nunca se presenta como real lo que no lo es).
    const coveredCodes = new Set(deals.map((d) => d.code));
    Array.from(FAMOUS_CITY_CODES).forEach((code) => {
      if (coveredCodes.has(code)) return;
      const card = buildCatalogCard(code, false);
      if (card && card.country !== "España") deals.push(card);
    });

    const lastUpdated = data.reduce((max, r) => (r.detected_at > max ? r.detected_at : max), data[0].detected_at);
    return { deals: pickTopPerContinent(deals), lastUpdated };
  } catch (e) {
    console.warn("[/chollos] No se pudieron leer precios reales, usando estimación:", e);
    return null;
  }
}

export default async function CholloPage() {
  const real = await getRealDeals();
  const deals = real?.deals ?? buildSimulatedDeals();
  const isReal = !!real;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="hero-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Flame className="h-3.5 w-3.5" />
            Chollos internacionales
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Los vuelos más baratos fuera de España
          </h1>
          <p className="text-slate-300">
            Destinos internacionales ordenados de más barato a más caro. Guarda una alerta y te avisamos cuándo revisarlo.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <ChollosExplorer deals={deals} isReal={isReal} lastUpdated={real?.lastUpdated ?? null} />
      </div>
    </main>
  );
}
