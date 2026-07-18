import { Flame } from "lucide-react";
import type { Metadata } from "next";
import { DESTINATIONS_CATALOG, getFlightBasePrice } from "@/lib/flights/mockFlightProvider";
import { getContinent, getFlag, roundPrice } from "@/lib/data/destinationMeta";
import { ChollosExplorer } from "@/components/travel/ChollosExplorer";
import type { DestinationCard } from "@/components/travel/DestinationsExplorer";

export const metadata: Metadata = {
  title: "Chollos de vuelos internacionales — Despegai",
  description: "Los vuelos internacionales más baratos detectados desde España, y alertas de precio para tus destinos favoritos.",
};

const INTERNATIONAL_DEALS: DestinationCard[] = DESTINATIONS_CATALOG
  .filter((d) => d.country !== "España")
  .map((d) => ({
    city: d.city,
    country: d.country,
    code: d.airportCode,
    flag: getFlag(d.country),
    price: roundPrice(getFlightBasePrice(d.airportCode, d.estimatedPriceLevel)),
    tags: d.tags.slice(0, 3),
    continent: getContinent(d.country),
  }))
  .sort((a, b) => a.price - b.price)
  .slice(0, 36);

export default function CholloPage() {
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
        <ChollosExplorer deals={INTERNATIONAL_DEALS} />
      </div>
    </main>
  );
}
