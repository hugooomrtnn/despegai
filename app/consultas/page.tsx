import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultas populares de vuelos — Despegai",
  description: "Ejemplos de búsquedas de vuelos con IA: escapadas románticas, viajes en familia, destinos baratos, playa, aventura y más. Haz clic y busca al instante.",
};

const CONSULTAS = [
  {
    icon: "🏖️",
    query: "Vuelos baratos a Canarias para 2 personas en agosto",
    category: "Playa",
    color: "from-amber-500/10 to-orange-400/5 border-amber-200 hover:border-amber-400",
    tag: "bg-amber-100 text-amber-700",
  },
  {
    icon: "🏛️",
    query: "Fin de semana en Roma, ida y vuelta desde Madrid en octubre",
    category: "Cultural",
    color: "from-violet-500/10 to-indigo-400/5 border-violet-200 hover:border-violet-400",
    tag: "bg-violet-100 text-violet-700",
  },
  {
    icon: "💕",
    query: "Escapada romántica a París para 2 personas el puente de octubre",
    category: "Pareja",
    color: "from-rose-500/10 to-pink-400/5 border-rose-200 hover:border-rose-400",
    tag: "bg-rose-100 text-rose-700",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    query: "Familia con 2 niños a Mallorca en julio, máximo 600€ en total",
    category: "Familia",
    color: "from-emerald-500/10 to-teal-400/5 border-emerald-200 hover:border-emerald-400",
    tag: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "✈️",
    query: "Vuelo directo a Japón en marzo para 1 persona, máximo 700€",
    category: "Asia",
    color: "from-sky-500/10 to-blue-400/5 border-sky-200 hover:border-sky-400",
    tag: "bg-sky-100 text-sky-700",
  },
  {
    icon: "🌍",
    query: "Sorpréndeme con un destino barato desde Barcelona para este fin de semana",
    category: "Flexible",
    color: "from-cyan-500/10 to-blue-400/5 border-cyan-200 hover:border-cyan-400",
    tag: "bg-cyan-100 text-cyan-700",
  },
  {
    icon: "🎉",
    query: "Despedida de soltero en Ámsterdam, 4 personas, 3 noches en junio",
    category: "Grupos",
    color: "from-yellow-500/10 to-amber-400/5 border-yellow-200 hover:border-yellow-400",
    tag: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: "🏔️",
    query: "Destino de aventura en los Alpes sin pasaporte para febrero",
    category: "Aventura",
    color: "from-teal-500/10 to-emerald-400/5 border-teal-200 hover:border-teal-400",
    tag: "bg-teal-100 text-teal-700",
  },
  {
    icon: "🌊",
    query: "Caribe todo incluido para 2 personas en diciembre, presupuesto 1500€",
    category: "Lujo",
    color: "from-blue-500/10 to-indigo-400/5 border-blue-200 hover:border-blue-400",
    tag: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🍷",
    query: "Ciudad europea con gastronomía increíble para 3 días en septiembre",
    category: "Gastro",
    color: "from-red-500/10 to-orange-400/5 border-red-200 hover:border-red-400",
    tag: "bg-red-100 text-red-700",
  },
  {
    icon: "🧳",
    query: "Vuelos baratos desde Valencia a cualquier destino en noviembre",
    category: "Económico",
    color: "from-green-500/10 to-emerald-400/5 border-green-200 hover:border-green-400",
    tag: "bg-green-100 text-green-700",
  },
  {
    icon: "🏙️",
    query: "Nueva York para 2 personas en diciembre 5 noches, vuelos + hotel",
    category: "Ciudad",
    color: "from-slate-500/10 to-gray-400/5 border-slate-200 hover:border-slate-400",
    tag: "bg-slate-100 text-slate-700",
  },
  {
    icon: "🐘",
    query: "Safari en Kenia o Tanzania para 2 personas en agosto, máximo 3000€",
    category: "Aventura",
    color: "from-orange-500/10 to-amber-400/5 border-orange-200 hover:border-orange-400",
    tag: "bg-orange-100 text-orange-700",
  },
  {
    icon: "🎿",
    query: "Fin de semana esquiando en los Alpes desde Madrid en enero",
    category: "Invierno",
    color: "from-indigo-500/10 to-blue-400/5 border-indigo-200 hover:border-indigo-400",
    tag: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: "🌺",
    query: "Tailandia 10 días para 2 personas en febrero, vuelos + hotel",
    category: "Asia",
    color: "from-pink-500/10 to-rose-400/5 border-pink-200 hover:border-pink-400",
    tag: "bg-pink-100 text-pink-700",
  },
  {
    icon: "🏟️",
    query: "Vuelo a Berlín para ver un partido de fútbol el próximo mes",
    category: "Eventos",
    color: "from-gray-500/10 to-slate-400/5 border-gray-200 hover:border-gray-400",
    tag: "bg-gray-100 text-gray-700",
  },
];

export default function ConsultasPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="hero-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Search className="h-3.5 w-3.5" />
            Consultas populares
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            ¿No sabes por dónde empezar?
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Haz clic en cualquier búsqueda y la IA lo lanza al instante — sin escribir nada.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 gap-3">
          {CONSULTAS.map((c) => (
            <Link
              key={c.query}
              href={`/?q=${encodeURIComponent(c.query)}`}
              className={`group flex items-center gap-4 p-5 rounded-2xl border bg-gradient-to-br ${c.color} text-left transition-all hover:shadow-md hover:-translate-y-0.5 bg-white`}
            >
              <span className="text-2xl flex-shrink-0">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-slate-900">
                  {c.query}
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.tag}`}>
                  {c.category}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 text-center text-white">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-80" />
          <h2 className="text-xl font-bold mb-2">¿Tienes otra idea en mente?</h2>
          <p className="text-sky-100 text-sm mb-5">
            Escríbela directamente — la IA entiende cualquier petición en español.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-sky-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors"
          >
            Ir al buscador
          </Link>
        </div>
      </div>
    </main>
  );
}
