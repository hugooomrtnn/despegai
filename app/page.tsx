"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plane, Brain, FileText, Zap, Globe,
  ChevronDown, ArrowRight, MapPin, Clock, Star, Sparkles, Search,
} from "lucide-react";
import { AITravelSearch } from "@/components/travel/AITravelSearch";
import type { AITravelSearchHandle } from "@/components/travel/AITravelSearch";
import { ParsedRequestSummary } from "@/components/travel/ParsedRequestSummary";
import { DestinationRecommendations } from "@/components/travel/DestinationRecommendations";
import { RealSearchPanel } from "@/components/travel/RealSearchPanel";
import { TripPlanPanel } from "@/components/travel/TripPlanPanel";
import { LoadingState } from "@/components/travel/LoadingState";
import { ErrorState } from "@/components/travel/ErrorState";
import type { TravelSearchResponse } from "@/types/travel";

// ─── Datos del hero ─────────────────────────────────────────────────────────

const DESTINATIONS_SHOWCASE = [
  { name: "París",      country: "Francia",   flag: "🇫🇷", tag: "Romántico",  gradient: "from-rose-600/30 to-pink-500/15",     border: "border-rose-500/25",   tag_color: "text-rose-400" },
  { name: "Tokio",      country: "Japón",     flag: "🇯🇵", tag: "Aventura",   gradient: "from-cyan-600/30 to-blue-500/15",     border: "border-cyan-500/25",   tag_color: "text-cyan-400" },
  { name: "Roma",       country: "Italia",    flag: "🇮🇹", tag: "Cultura",    gradient: "from-orange-500/30 to-amber-500/15",  border: "border-orange-500/25", tag_color: "text-sky-400" },
  { name: "Bali",       country: "Indonesia", flag: "🇮🇩", tag: "Playa",      gradient: "from-teal-600/30 to-emerald-500/15",  border: "border-teal-500/25",   tag_color: "text-teal-400" },
  { name: "El Cairo",   country: "Egipto",    flag: "🇪🇬", tag: "Historia",   gradient: "from-amber-600/30 to-yellow-400/15",  border: "border-amber-500/25",  tag_color: "text-amber-400" },
  { name: "Nueva York", country: "EE.UU.",    flag: "🇺🇸", tag: "Ciudad",     gradient: "from-violet-600/30 to-purple-500/15", border: "border-violet-500/25", tag_color: "text-violet-400" },
];

const TRAVEL_MOODS = [
  { icon: "🏖️", label: "Playa y Sol",      desc: "Caribe, Mediterráneo, Índico",  gradient: "from-amber-500 to-orange-500",    query: "quiero playa con sol garantizado y agua cristalina" },
  { icon: "🏙️", label: "Ciudad y Cultura", desc: "Capitales, museos, vida nocturna", gradient: "from-violet-500 to-indigo-600",  query: "ciudad europea con cultura y gastronomía de primer nivel" },
  { icon: "🧗", label: "Aventura",         desc: "Senderismo, naturaleza salvaje",  gradient: "from-emerald-500 to-teal-500",   query: "destino de aventura y naturaleza impresionante" },
  { icon: "💕", label: "Romántico",        desc: "Escapadas en pareja únicas",      gradient: "from-rose-500 to-pink-600",      query: "escapada romántica para dos con encanto especial" },
  { icon: "🍷", label: "Gastronomía",      desc: "Sabores, mercados, restaurantes", gradient: "from-red-500 to-orange-600",     query: "destino famoso por su gastronomía y cultura culinaria" },
  { icon: "🏛️", label: "Historia",         desc: "Civilizaciones, ruinas, legado",  gradient: "from-yellow-500 to-amber-600",   query: "destino con mucha historia antigua y patrimonio UNESCO" },
];

const STATS = [
  { value: "226+", label: "Destinos",      icon: MapPin },
  { value: "< 10s", label: "Por búsqueda", icon: Clock  },
  { value: "100%",  label: "En español",   icon: Globe  },
  { value: "0",     label: "Formularios",  icon: Star   },
];

const HOW_IT_WORKS = [
  {
    icon: Brain, step: "01",
    color: "from-sky-400 to-blue-600", glow: "shadow-sky-500/20",
    title: "Cuéntale qué quieres buscar",
    description: "Escribe en español natural lo que buscas, como si le hablaras a un amigo. No hace falta rellenar formularios ni elegir fechas en un calendario.",
    examples: [
      "Dame vuelos baratos a París cualquier día de agosto",
      "Vuelos Madrid → Roma para 2 personas ida y vuelta la semana que viene",
      "Sorpréndeme con un destino de playa barato para este fin de semana",
    ],
  },
  {
    icon: Zap, step: "02",
    color: "from-violet-500 to-indigo-600", glow: "shadow-violet-500/20",
    title: "La IA detecta todo automáticamente",
    description: "Despegai extrae el destino, las fechas, los pasajeros y tus preferencias. Si el destino es flexible, te sugiere opciones con precio bajo. Si pides un mes entero, te muestra varias fechas para comparar.",
    examples: [],
  },
  {
    icon: FileText, step: "03",
    color: "from-emerald-400 to-teal-600", glow: "shadow-emerald-500/20",
    title: "Compara precios fecha a fecha",
    description: "Los resultados se muestran agrupados por fecha en secciones desplegables. Abre la que más te interese y verás vuelos reales con sus precios actuales. Puedes abrir varias fechas a la vez para comparar cuál sale más barata.",
    examples: [],
  },
  {
    icon: ArrowRight, step: "04",
    color: "from-sky-400 to-blue-600", glow: "shadow-sky-500/20",
    title: "Elige dónde comprar y reserva",
    description: "Cuando encuentres el vuelo que te encaje, pulsa en él para ir directamente a la aerolínea o plataforma oficial. También puedes elegir entre Iberia, Vueling, Ryanair, Google Flights, Skyscanner o Kayak — siempre la compra en el sitio oficial, sin intermediarios.",
    examples: [],
  },
];

// ─── Consultas populares ─────────────────────────────────────────────────────

const CONSULTAS = [
  {
    icon: "🏖️",
    query: "Vuelos baratos a Canarias para 2 personas en agosto",
    category: "Playa",
    color: "from-amber-500/15 to-orange-400/10 border-amber-500/20 hover:border-amber-400/50",
    tag: "bg-amber-100 text-amber-700",
  },
  {
    icon: "🏛️",
    query: "Fin de semana en Roma, ida y vuelta desde Madrid en octubre",
    category: "Cultural",
    color: "from-violet-500/15 to-indigo-400/10 border-violet-500/20 hover:border-violet-400/50",
    tag: "bg-violet-100 text-violet-700",
  },
  {
    icon: "💕",
    query: "Escapada romántica a París para 2 personas el puente de octubre",
    category: "Pareja",
    color: "from-rose-500/15 to-pink-400/10 border-rose-500/20 hover:border-rose-400/50",
    tag: "bg-rose-100 text-rose-700",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    query: "Familia con 2 niños a Mallorca en julio, máximo 600€ en total",
    category: "Familia",
    color: "from-emerald-500/15 to-teal-400/10 border-emerald-500/20 hover:border-emerald-400/50",
    tag: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "✈️",
    query: "Vuelo directo a Japón en marzo para 1 persona, máximo 700€",
    category: "Asia",
    color: "from-sky-500/15 to-blue-400/10 border-sky-500/20 hover:border-sky-400/50",
    tag: "bg-sky-100 text-sky-700",
  },
  {
    icon: "🌍",
    query: "Sorpréndeme con un destino barato desde Barcelona para este fin de semana",
    category: "Flexible",
    color: "from-cyan-500/15 to-blue-400/10 border-cyan-500/20 hover:border-cyan-400/50",
    tag: "bg-cyan-100 text-cyan-700",
  },
  {
    icon: "🎉",
    query: "Despedida de soltero en Ámsterdam, 4 personas, 3 noches en junio",
    category: "Grupos",
    color: "from-yellow-500/15 to-amber-400/10 border-yellow-500/20 hover:border-yellow-400/50",
    tag: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: "🏔️",
    query: "Destino de aventura en los Alpes sin pasaporte para febrero",
    category: "Aventura",
    color: "from-teal-500/15 to-emerald-400/10 border-teal-500/20 hover:border-teal-400/50",
    tag: "bg-teal-100 text-teal-700",
  },
  {
    icon: "🌊",
    query: "Caribe todo incluido para 2 personas en diciembre, presupuesto 1500€",
    category: "Lujo",
    color: "from-blue-500/15 to-indigo-400/10 border-blue-500/20 hover:border-blue-400/50",
    tag: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🍷",
    query: "Ciudad europea con gastronomía increíble para 3 días en septiembre",
    category: "Gastro",
    color: "from-red-500/15 to-orange-400/10 border-red-500/20 hover:border-red-400/50",
    tag: "bg-red-100 text-red-700",
  },
  {
    icon: "🧳",
    query: "Vuelos baratos desde Valencia a cualquier destino en noviembre",
    category: "Económico",
    color: "from-green-500/15 to-emerald-400/10 border-green-500/20 hover:border-green-400/50",
    tag: "bg-green-100 text-green-700",
  },
  {
    icon: "🏙️",
    query: "Nueva York para 2 personas en diciembre 5 noches, vuelos + hotel",
    category: "Ciudad",
    color: "from-slate-500/15 to-gray-400/10 border-slate-500/20 hover:border-slate-400/50",
    tag: "bg-slate-100 text-slate-700",
  },
];

// Ticker de búsquedas de ejemplo que rota en el hero
const TICKER_QUERIES = [
  "Quiero playa barata en agosto para 2 adultos",
  "Fin de semana romántico en Italia desde Madrid",
  "Vuelo + hotel a Japón en marzo, máximo 1500€",
  "Destinos baratos para Semana Santa desde Barcelona",
  "Escapada de aventura en los Alpes sin pasaporte",
  "Caribe todo incluido para 4 personas en julio",
  "Ciudad europea con mucha historia para 5 días",
  "Vuelo directo a Tailandia desde España en noviembre",
];

// Componente auxiliar para leer ?q= (necesita Suspense en Next.js 14)
function QueryLauncher({ onQuery }: { onQuery: (q: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q.trim().length >= 5) onQuery(q.trim());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [results, setResults]     = useState<TravelSearchResponse | null>(null);
  const [searchPrompt, setSearchPrompt] = useState("");
  const searchRef = useRef<AITravelSearchHandle>(null);

  function handleDirectSearch(q: string) {
    setSearchPrompt(q);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => searchRef.current?.submit(q), 100);
  }

  function handleResults(data: TravelSearchResponse) {
    setResults(data);
    setError(null);
    setTimeout(() => {
      const el = document.getElementById("results");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72; // 72 = header height + gap
      window.scrollTo({ top, behavior: "smooth" });
    }, 350);
  }
  function handleError(msg: string) { setError(msg); setResults(null); }
  function handleRetry()            { setError(null); }

  const showLanding = !results && !isLoading && !error;

  return (
    <main>
      {/* Lee ?q= de la URL y lanza la búsqueda automáticamente */}
      <Suspense fallback={null}>
        <QueryLauncher onQuery={(q) => {
          setSearchPrompt(q);
          setTimeout(() => searchRef.current?.submit(q), 200);
        }} />
      </Suspense>

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="hero-dark relative min-h-screen flex flex-col pt-16 overflow-hidden">

        {/* Anillos horizonte decorativos */}
        <div className="hero-horizon-ring" />
        <div className="hero-horizon-ring-outer" />

        {/* Orbs de luz */}
        <div className="absolute top-[18%] left-[8%]   w-[480px] h-[480px] rounded-full bg-blue-600/8   blur-[110px] pointer-events-none" />
        <div className="absolute top-[30%] right-[4%]  w-[360px] h-[360px] rounded-full bg-violet-600/8  blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[220px] rounded-full bg-sky-500/10 blur-[90px] pointer-events-none" />

        <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16">

          {/* Badge de confianza */}
          <div className="animate-fade-in flex items-center gap-2.5 px-4 py-2 rounded-full glass-dark mb-8">
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse-slow" />
            <Sparkles className="h-3.5 w-3.5 text-sky-400/80" />
            <span className="text-sm text-white/55 font-medium">
              226+ destinos · IA nativa en español · Sin formularios
            </span>
          </div>

          {/* Titular principal */}
          <h1 className="animate-slide-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-center max-w-5xl leading-[1.04] mb-5 text-balance tracking-tight">
            Dime a dónde{" "}
            <span className="text-gradient-fire">quieres volar.</span>
          </h1>

          <p className="animate-fade-in text-lg sm:text-xl text-white/45 text-center max-w-xl mb-10 leading-relaxed text-balance">
            Escríbelo en español, como le hablarías a un amigo.<br className="hidden sm:block" />
            La IA encuentra vuelos, hoteles y plan de viaje en segundos.
          </p>

          {/* Buscador IA */}
          <div className="animate-fade-in w-full max-w-3xl">
            <AITravelSearch
              ref={searchRef}
              onResults={handleResults}
              onError={handleError}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              value={searchPrompt}
              onChange={setSearchPrompt}
            />
          </div>

          {/* Ticker de ejemplos */}
          {showLanding && (
            <div className="mt-6 w-full max-w-3xl marquee-track">
              <div className="marquee-inner animate-marquee">
                {[...TICKER_QUERIES, ...TICKER_QUERIES].map((q, i) => (
                  <span
                    key={i}
                    onClick={() => handleDirectSearch(q)}
                    className="inline-flex items-center gap-2 mx-3 px-3 py-1.5 rounded-full glass-dark text-xs text-white/40 whitespace-nowrap cursor-pointer hover:text-white/70 transition-colors"
                  >
                    <Plane className="h-3 w-3 text-sky-400/60 flex-shrink-0" />
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Destination showcase — tarjetas con gradiente */}
          {showLanding && (
            <div className="mt-12 grid grid-cols-3 sm:grid-cols-6 gap-3 w-full max-w-3xl">
              {DESTINATIONS_SHOWCASE.map((d) => (
                <div
                  key={d.name}
                  onClick={() => {
                    const q = `Vuelos a ${d.name} para 2 personas`;
                    handleDirectSearch(q);
                  }}
                  className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl bg-gradient-to-br ${d.gradient} border ${d.border} hover:border-opacity-60 transition-all cursor-pointer group`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{d.flag}</span>
                  <span className="text-xs font-bold text-white/90 text-center leading-tight">{d.name}</span>
                  <span className={`text-[10px] font-semibold ${d.tag_color}`}>{d.tag}</span>
                </div>
              ))}
            </div>
          )}

          {showLanding && (
            <div className="mt-12 flex flex-col items-center gap-2 text-white/20 animate-float">
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Stats bar */}
        {showLanding && (
          <div className="relative border-t border-white/[0.06] bg-white/[0.025] backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <p className="text-2xl font-black text-gradient-fire">{stat.value}</p>
                  <p className="text-xs text-white/30 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════════
          RESULTADOS
      ════════════════════════════════════════════════════════════ */}
      {(isLoading || error || results) && (
        <section id="results" className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
            {isLoading && <LoadingState />}

            {!isLoading && error && (
              <ErrorState message={error} onRetry={handleRetry} />
            )}

            {!isLoading && !error && results && (
              <>
                <ParsedRequestSummary parsed={results.parsedRequest} />

                {results.destinationRecommendations.length > 0 && (
                  <DestinationRecommendations destinations={results.destinationRecommendations} />
                )}

                <RealSearchPanel
                  parsed={results.parsedRequest}
                  recommendations={results.destinationRecommendations}
                />

                {results.tripPlan && (
                  <TripPlanPanel plan={results.tripPlan} />
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          CONSULTAS POPULARES
      ════════════════════════════════════════════════════════════ */}
      {showLanding && (
        <section id="consultas" className="py-24 sm:py-32 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">

            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-5">
                <Search className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-semibold text-sky-600">Consultas populares</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                ¿No sabes por dónde empezar?
                <br />
                <span className="text-gradient-fire">Prueba con estos ejemplos</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Haz clic en cualquier búsqueda y la IA lo lanza al instante — sin escribir nada.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {CONSULTAS.map((c) => (
                <button
                  key={c.query}
                  onClick={() => handleDirectSearch(c.query)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-br ${c.color} text-left transition-all hover:shadow-md hover:-translate-y-0.5`}
                >
                  <span className="text-2xl flex-shrink-0">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-slate-900 line-clamp-2">
                      {c.query}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.tag}`}>
                      {c.category}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-slate-400 mt-8">
              O escribe directamente lo que buscas en el{" "}
              <button
                onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => document.getElementById("search-input")?.focus(), 400); }}
                className="text-sky-500 font-semibold hover:underline"
              >
                buscador de arriba
              </button>
            </p>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          TRAVEL MOODS — sección nueva única
      ════════════════════════════════════════════════════════════ */}
      {showLanding && (
        <section id="destinos" className="py-24 sm:py-32 bg-[#071120]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-5 border border-sky-500/20">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse-slow" />
                <span className="text-sm font-semibold text-sky-400">¿Qué tipo de viaje buscas?</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Busca por{" "}
                <span className="text-gradient-fire">estado de ánimo</span>
              </h2>
              <p className="text-lg text-white/35 max-w-lg mx-auto">
                Haz clic en el tipo de viaje que te apetece y la IA buscará los mejores destinos para ti.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TRAVEL_MOODS.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => handleDirectSearch(mood.query)}
                  className="card-mood rounded-3xl p-6 text-left group cursor-pointer"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${mood.gradient} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
                    {mood.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{mood.label}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{mood.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-400/70 group-hover:text-sky-400 transition-colors">
                    <span>Buscar destinos</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          CÓMO FUNCIONA
      ════════════════════════════════════════════════════════════ */}
      {showLanding && (
        <section id="how-it-works" className="py-24 sm:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100 mb-5">
                <Zap className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-semibold text-sky-600">Cómo funciona</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                De la búsqueda al vuelo
                <br />
                <span className="text-gradient-fire">en cuatro pasos</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Sin formularios, sin calendarios. Solo escribe lo que quieres y Despegai hace el resto.
              </p>
            </div>

            <div className="space-y-5 mb-16">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.title} className="card-premium rounded-3xl p-7 flex gap-5 items-start group">
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg ${step.glow} group-hover:scale-105 transition-transform`}>
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-black text-slate-100 select-none">{step.step}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">{step.description}</p>
                    {step.examples.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ejemplos que puedes escribir:</p>
                        {step.examples.map(ex => (
                          <div key={ex} className="flex items-start gap-2">
                            <span className="text-sky-400 font-bold text-xs flex-shrink-0 mt-0.5">›</span>
                            <p className="text-xs text-slate-600 italic">&ldquo;{ex}&rdquo;</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mapa de destinos — panel oscuro */}
            <div className="bg-[#071120] rounded-3xl p-10 text-center overflow-hidden relative border border-white/[0.06]">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] rounded-full bg-sky-500/10 blur-[60px] pointer-events-none" />
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Más de <span className="text-gradient-fire">226 destinos</span> en todo el mundo
                </h3>
                <p className="text-white/35 mb-8 max-w-lg mx-auto">
                  Europa completa, América, Asia, África, Oriente Medio y Oceanía. Busca por ciudad, país o región.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "🇫🇷 Francia", "🇮🇹 Italia", "🇩🇪 Alemania", "🇬🇷 Grecia",
                    "🇹🇷 Turquía", "🇪🇬 Egipto", "🇯🇵 Japón", "🇹🇭 Tailandia",
                    "🇧🇷 Brasil",  "🇺🇸 EE.UU.", "🇦🇺 Australia", "🇿🇦 Sudáfrica",
                    "🇮🇳 India",   "🇲🇦 Marruecos", "🇨🇺 Cuba", "🇮🇸 Islandia",
                  ].map((d) => {
                    const country = d.replace(/^\S+\s/, "");
                    const q = `Vuelos a ${country} para 2 personas`;
                    return (
                      <button
                        key={d}
                        onClick={() => handleDirectSearch(q)}
                        className="text-sm px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50 font-medium hover:border-sky-500/30 hover:text-white/70 transition-colors cursor-pointer"
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════ */}
      {!results && !isLoading && (
        <footer className="bg-[#071120] border-t border-white/[0.05] py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">

              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/25">
                  <Plane className="h-4 w-4 text-white" />
                </div>
                <span className="font-extrabold text-white text-lg">
                  Despeg<span className="text-sky-400">ai</span>
                </span>
              </div>

              {/* Links */}
              <nav className="flex flex-wrap justify-center gap-6">
                <a href="#how-it-works" className="text-sm text-white/30 hover:text-white/70 transition-colors font-medium">Cómo funciona</a>
                <a href="/destinos" className="text-sm text-white/30 hover:text-white/70 transition-colors font-medium">Destinos</a>
                <a href="/guias" className="text-sm text-white/30 hover:text-white/70 transition-colors font-medium">Guías</a>
                <a href="/consejos" className="text-sm text-white/30 hover:text-white/70 transition-colors font-medium">Consejos</a>
                <a href="/quienes-somos" className="text-sm text-white/30 hover:text-white/70 transition-colors font-medium">Quiénes somos</a>
              </nav>

              {/* Idioma */}
              <div className="flex items-center gap-1.5 text-sm text-white/25">
                <Globe className="h-3.5 w-3.5" />
                <span>Español</span>
              </div>
            </div>

            <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-white/20">
                © 2026 Despegai · Herramienta de búsqueda con inteligencia artificial
              </p>
              <div className="flex items-center gap-4">
                <a href="/politica-de-privacidad" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Política de privacidad
                </a>
                <a href="/terminos" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Términos y condiciones
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
