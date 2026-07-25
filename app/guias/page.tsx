import Link from "next/link";
import { MapPin, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { STATIC_GUIDES } from "@/lib/data/staticGuides";
import { GuideGenerator } from "@/components/guides/GuideGenerator";

export const metadata: Metadata = {
  title: "Guías de viaje — Qué ver, comer y cuándo ir | Despegai",
  description: "Guías completas de los destinos más populares desde España: qué ver, gastronomía, mejor época para viajar, presupuesto orientativo y cómo llegar. París, Roma, Tokio, Nueva York y muchos más.",
};

export default function GuiasPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="hero-dark py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <MapPin className="h-3.5 w-3.5" />
            Guías de destino
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            ¿A dónde quieres viajar?
          </h1>
          <p className="text-slate-300">
            Qué ver, qué comer, cuándo ir y cuánto cuesta — guías completas de los destinos más buscados desde España.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Guías estáticas */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-14">
          {STATIC_GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="card-premium rounded-2xl p-4 hover:shadow-md transition-all hover:border-sky-200 group block"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl">{g.flag}</span>
                <div>
                  <p className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">{g.destination}</p>
                  <p className="text-xs text-slate-400">{g.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Generador para otros destinos */}
        <div className="border-t border-slate-200 pt-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Genera una guía al instante
            </div>
            <p className="text-slate-500 text-sm">¿Buscas otro destino que no está en la lista? Escríbelo y te lo generamos.</p>
          </div>
          <GuideGenerator />
        </div>
      </div>
    </main>
  );
}
