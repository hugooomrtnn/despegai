"use client";

import { useState } from "react";
import {
  Plane, Brain, FileText, Zap, Globe, Hotel, Map,
  ChevronDown, ArrowRight, MapPin, Clock, Star,
} from "lucide-react";
import { AITravelSearch } from "@/components/travel/AITravelSearch";
import { ParsedRequestSummary } from "@/components/travel/ParsedRequestSummary";
import { DestinationRecommendations } from "@/components/travel/DestinationRecommendations";
import { FlightResultsList } from "@/components/travel/FlightResultsList";
import { HotelResultsList } from "@/components/travel/HotelResultsList";
import { TripPlanPanel } from "@/components/travel/TripPlanPanel";
import { ProposalPanel } from "@/components/travel/ProposalPanel";
import { LoadingState } from "@/components/travel/LoadingState";
import { ErrorState } from "@/components/travel/ErrorState";
import { EmptyState } from "@/components/travel/EmptyState";
import type { TravelSearchResponse } from "@/types/travel";

const HOW_IT_WORKS = [
  {
    icon: Brain,
    step: "01",
    title: "Escribe en lenguaje natural",
    description: "Describe el viaje tal como lo harías por WhatsApp. Sin filtros, sin formularios, sin listas.",
    color: "from-violet-500 to-indigo-600",
    glow: "shadow-violet-500/20",
  },
  {
    icon: Zap,
    step: "02",
    title: "La IA lo interpreta todo",
    description: "Detecta destino, fechas, presupuesto y preferencias. Busca vuelos, hoteles y crea un plan.",
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/20",
  },
  {
    icon: FileText,
    step: "03",
    title: "Propuesta lista en segundos",
    description: "Copia el resumen para enviar por WhatsApp o email. De petición a propuesta en menos de 10s.",
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
  },
];

const STATS = [
  { value: "500+", label: "Destinos", icon: MapPin },
  { value: "< 10s", label: "Por búsqueda", icon: Clock },
  { value: "100%", label: "En español", icon: Globe },
  { value: "0", label: "Formularios", icon: Star },
];

const DESTINATIONS_SHOWCASE = [
  { name: "París", flag: "🇫🇷", tag: "Romántico" },
  { name: "Tokio", flag: "🇯🇵", tag: "Aventura" },
  { name: "Roma", flag: "🇮🇹", tag: "Cultura" },
  { name: "Bali", flag: "🇮🇩", tag: "Playa" },
  { name: "Egipto", flag: "🇪🇬", tag: "Historia" },
  { name: "Nueva York", flag: "🇺🇸", tag: "Ciudad" },
];

type ResultTab = "flights" | "hotels" | "plan";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<TravelSearchResponse | null>(null);
  const [activeTab, setActiveTab] = useState<ResultTab>("flights");

  function handleResults(data: TravelSearchResponse) {
    setResults(data);
    setError(null);
    setActiveTab("flights");
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleError(msg: string) {
    setError(msg);
    setResults(null);
  }

  function handleRetry() {
    setError(null);
  }

  const hasResults = results && results.flights.length > 0;
  const hasNoFlights = results && results.flights.length === 0;

  return (
    <main>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero-dark relative min-h-screen flex flex-col pt-16 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-green-500/5 blur-[80px] pointer-events-none" />

        <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-20">
          {/* Trust badge */}
          <div className="animate-fade-in flex items-center gap-2.5 px-4 py-2 rounded-full glass-dark mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
            <span className="text-sm text-white/60 font-medium">
              500+ destinos · Sin formularios · IA nativa en español
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-slide-up text-5xl sm:text-6xl md:text-7xl font-extrabold text-white text-center max-w-4xl leading-[1.08] mb-6 text-balance">
            El vuelo perfecto para{" "}
            <span className="text-gradient-amber">cualquier destino</span>
            {" "}del mundo
          </h1>

          <p className="animate-fade-in text-lg sm:text-xl text-white/50 text-center max-w-2xl mb-12 leading-relaxed text-balance">
            Escribe el viaje en español, como le hablarías a un amigo.
            La IA entiende, busca y propone en menos de 10 segundos.
          </p>

          {/* Search */}
          <div className="animate-fade-in w-full max-w-3xl">
            <AITravelSearch
              onResults={handleResults}
              onError={handleError}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Destination showcase */}
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            {DESTINATIONS_SHOWCASE.map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-sm text-white/60 hover:text-white/90 hover:bg-white/10 transition-all cursor-pointer"
              >
                <span className="text-base">{d.flag}</span>
                <span className="font-medium">{d.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/8 text-white/40">{d.tag}</span>
              </div>
            ))}
          </div>

          {!results && !isLoading && (
            <div className="mt-16 flex flex-col items-center gap-2 text-white/20 animate-float">
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Stats bar */}
        {!results && !isLoading && !error && (
          <div className="relative border-t border-white/5 bg-white/2 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <p className="text-2xl font-extrabold text-gradient-amber">{stat.value}</p>
                  <p className="text-xs text-white/35 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ─── RESULTS ───────────────────────────────────────────────────────── */}
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

                {hasResults && (
                  <ProposalPanel
                    parsedRequest={results.parsedRequest}
                    flights={results.flights}
                  />
                )}

                {hasResults && (
                  <div>
                    {/* Tab navigation */}
                    <div className="flex gap-1 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm mb-5">
                      {[
                        { id: "flights" as ResultTab, label: "Vuelos", icon: Plane, count: results.flights.length },
                        { id: "hotels" as ResultTab, label: "Hoteles", icon: Hotel, count: results.hotels?.length },
                        { id: "plan" as ResultTab, label: "Plan de viaje", icon: Map, count: null },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all ${
                            activeTab === tab.id
                              ? "bg-slate-900 text-white shadow-sm"
                              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <tab.icon className="h-4 w-4" />
                          {tab.label}
                          {tab.count != null && tab.count > 0 && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                              activeTab === tab.id
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}>
                              {tab.count}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {activeTab === "flights" && (
                      <FlightResultsList flights={results.flights} />
                    )}

                    {activeTab === "hotels" && (
                      results.hotels && results.hotels.length > 0 ? (
                        <HotelResultsList
                          hotels={results.hotels}
                          nights={results.parsedRequest.durationDays ?? 3}
                        />
                      ) : (
                        <div className="text-center text-slate-400 py-12 text-sm">
                          No hay hoteles disponibles para este destino.
                        </div>
                      )
                    )}

                    {activeTab === "plan" && (
                      results.tripPlan ? (
                        <TripPlanPanel plan={results.tripPlan} />
                      ) : (
                        <div className="text-center text-slate-400 py-12 text-sm">
                          Indica un destino concreto para ver el plan de viaje.
                        </div>
                      )
                    )}
                  </div>
                )}

                {hasNoFlights && <EmptyState />}
              </>
            )}
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────────── */}
      {!results && !isLoading && !error && (
        <section id="how-it-works" className="py-24 sm:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100 mb-5">
                <Zap className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">Cómo funciona</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                De la petición a la propuesta
                <br />
                <span className="text-gradient-amber">en 3 pasos</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Diseñado para agencias y asesores que reciben peticiones de clientes a diario.
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

            {/* Destinations grid */}
            <div className="bg-slate-900 rounded-3xl p-10 text-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '32px 32px'}} />
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  Más de 500 destinos en todo el mundo
                </h3>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                  Europa, América, Asia, África, Oriente Medio y Oceanía. Busca por ciudad, país o región.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "🇫🇷 Francia", "🇮🇹 Italia", "🇩🇪 Alemania", "🇬🇷 Grecia",
                    "🇹🇷 Turquía", "🇪🇬 Egipto", "🇯🇵 Japón", "🇹🇭 Tailandia",
                    "🇧🇷 Brasil", "🇺🇸 EE.UU.", "🇦🇺 Australia", "🇿🇦 Sudáfrica",
                  ].map((d) => (
                    <span key={d} className="text-sm px-3.5 py-1.5 rounded-full bg-white/6 border border-white/8 text-white/60 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      {!results && !isLoading && (
        <footer className="bg-slate-950 border-t border-white/5 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center">
                <Plane className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-extrabold text-white">
                Fly<span className="text-green-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-white/25">
              © 2025 FlyAI · Herramienta de búsqueda con inteligencia artificial
            </p>
            <div className="flex items-center gap-1 text-xs text-white/25">
              <Globe className="h-3 w-3" />
              <span>Español</span>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
