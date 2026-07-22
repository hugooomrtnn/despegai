import { MapPin, Plane } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS_CATALOG, getFlightBasePrice } from "@/lib/flights/mockFlightProvider";
import { getRealAnchorPrices } from "@/lib/flights/realPriceLookup";
import { getContinent, getFlag, roundPrice } from "@/lib/data/destinationMeta";
import { DestinationsExplorer, type DestinationCard } from "@/components/travel/DestinationsExplorer";

export const metadata: Metadata = {
  title: "Destinos populares desde España — Despegai",
  description: "Más de 180 destinos desde España: Europa, América, Asia, África y Oceanía. Encuentra los vuelos más baratos con inteligencia artificial.",
};

export default async function DestinosPage() {
  // Si hay un precio real reciente (Travelpayouts, el mismo que usa /chollos) para
  // algún destino desde Madrid, se muestra ese en vez de la estimación por fórmula —
  // así la tarjeta coincide con lo que se ve luego al buscar el vuelo.
  const realPrices = await getRealAnchorPrices("MAD");

  const destinations: DestinationCard[] = DESTINATIONS_CATALOG.map((d) => ({
    city: d.city,
    country: d.country,
    code: d.airportCode,
    flag: getFlag(d.country),
    price: realPrices.get(d.airportCode) ?? roundPrice(getFlightBasePrice(d.airportCode, d.estimatedPriceLevel)),
    tags: d.tags.slice(0, 3),
    continent: getContinent(d.country),
  }));

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="hero-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <MapPin className="h-3.5 w-3.5" />
            {destinations.length}+ destinos desde España
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            ¿A dónde quieres volar?
          </h1>
          <p className="text-slate-300">
            Los destinos más buscados desde España. Haz clic en cualquiera para ver los vuelos más baratos al instante.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <DestinationsExplorer destinations={destinations} />

        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 text-center text-white">
          <Plane className="h-8 w-8 mx-auto mb-3 opacity-80" />
          <h2 className="text-xl font-bold mb-2">¿No encuentras tu destino?</h2>
          <p className="text-sky-100 text-sm mb-5">Escríbelo directamente en el buscador — la IA entiende más de 200 destinos en todo el mundo.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-sky-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors">
            Ir al buscador
          </Link>
        </div>
      </div>
    </main>
  );
}
