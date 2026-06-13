"use client";

import { useState } from "react";
import {
  Plane, Brain, FileText, Zap, Globe,
  ChevronDown, ArrowRight, MapPin, Clock, Star, Sparkles,
} from "lucide-react";
import { AITravelSearch } from "@/components/travel/AITravelSearch";
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
    title: "Escribe como hablas",
    description: "Describe el viaje en español natural, como le contarías a un amigo. Sin filtros ni formularios.",
    color: "from-violet-500 to-indigo-600", glow: "shadow-violet-500/20",
  },
  {
    icon: Zap, step: "02",
    title: "La IA lo interpreta todo",
    description: "Detecta destino, fechas, presupuesto y preferencias. Busca vuelos, hoteles y crea un plan completo.",
    color: "from-violet-500 to-indigo-600", glow: "shadow-violet-500/20",
  },
  {
    icon: FileText, step: "03",
    title: "Propuesta lista al instante",
    description: "Copia el resumen y envíalo por WhatsApp o email. De petición a propuesta en menos de 10 segundos.",
    color: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/20",
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

function scrollToSearch(_query?: string, cb?: () => void) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    document.getElementById("search-input")?.focus();
    cb?.();
  }, 350);
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [results, setResults]     = useState<TravelSearchResponse | null>(null);
  const [searchPrompt, setSearchPrompt] = useState("");

  function handleResults(data: TravelSearchResponse) {
    setResults(data);
    setError(null);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  function handleError(msg: string) { setError(msg); setResults(null); }
  function handleRetry()            { setError(null); }

  const showLanding = !results && !isLoading && !error;

  return (
    <main>
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
                    onClick={() => scrollToSearch(q, () => setSearchPrompt(q))}
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
                    scrollToSearch(q, () => setSearchPrompt(q));
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
                  onClick={() => scrollToSearch(mood.query, () => setSearchPrompt(mood.query))}
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100 mb-5">
                <Zap className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-semibold text-sky-600">Cómo funciona</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                De la petición a la propuesta
                <br />
                <span className="text-gradient-fire">en 3 pasos</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Diseñado para agencias y viajeros que no tienen tiempo que perder.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.title} className="relative group">
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-6 -translate-x-3 z-10">
                      <ArrowRight className="h-5 w-5 text-slate-200 mx-auto" />
                    </div>
                  )}
                  <div className="card-premium rounded-3xl p-8 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl ${step.glow} group-hover:scale-105 transition-transform`}>
                        <step.icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="text-4xl font-black text-slate-50 select-none">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
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
                        onClick={() => scrollToSearch(q, () => setSearchPrompt(q))}
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
                {["Cómo funciona", "Destinos", "Para agencias", "Precios"].map((l) => (
                  <a key={l} href="#" className="text-sm text-white/30 hover:text-white/70 transition-colors font-medium">
                    {l}
                  </a>
                ))}
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
