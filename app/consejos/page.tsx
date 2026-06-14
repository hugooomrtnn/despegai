import Link from "next/link";
import { Lightbulb, TrendingDown, Luggage, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consejos de viaje — Despegai",
  description: "Guías y consejos prácticos para viajar más barato y mejor: vuelos baratos, equipaje, planificación y mucho más.",
};

const ARTICLES = [
  {
    slug: "vuelos-baratos",
    icon: TrendingDown,
    color: "from-sky-400 to-blue-600",
    title: "Cómo encontrar vuelos baratos",
    excerpt: "Las claves para pagar menos en tus vuelos: cuándo reservar, qué días volar y cómo usar la IA para encontrar las mejores ofertas.",
    readTime: "5 min",
  },
  {
    slug: "equipaje-mano",
    icon: Luggage,
    color: "from-violet-400 to-indigo-600",
    title: "Guía completa del equipaje de mano",
    excerpt: "Todo lo que necesitas saber sobre medidas, peso y qué llevar para volar solo con equipaje de cabina y ahorrar en tasas.",
    readTime: "4 min",
  },
  {
    slug: "cuando-viajar",
    icon: Calendar,
    color: "from-emerald-400 to-teal-600",
    title: "Las mejores épocas para viajar",
    excerpt: "Cuándo ir a los destinos más populares desde España: temporadas, precios y el clima que te vas a encontrar mes a mes.",
    readTime: "6 min",
  },
  {
    slug: "reserva-anticipada",
    icon: Clock,
    color: "from-amber-400 to-orange-500",
    title: "Con cuánta antelación reservar",
    excerpt: "La regla de oro de la antelación: cuándo reservar vuelos y hoteles para cada tipo de destino y temporada.",
    readTime: "3 min",
  },
];

export default function ConsejosPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="hero-dark py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Lightbulb className="h-3.5 w-3.5" />
            Consejos de viaje
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Viaja más, gasta menos
          </h1>
          <p className="text-slate-300">
            Guías prácticas para planificar mejor tus viajes y aprovechar al máximo cada euro.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 gap-5">
          {ARTICLES.map(art => {
            const Icon = art.icon;
            return (
              <Link key={art.slug} href={`/consejos/${art.slug}`}
                className="card-premium rounded-2xl p-5 hover:shadow-md transition-shadow group block">
                <div className={`w-10 h-10 bg-gradient-to-br ${art.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {art.title}
                </h2>
                <p className="text-sm text-slate-500 mb-3 leading-relaxed">{art.excerpt}</p>
                <span className="text-xs text-slate-400">{art.readTime} de lectura</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
