"use client";

import { useState } from "react";
import {
  Plane, Brain, FileText, Sparkles, Globe, Zap,
  Star, ChevronDown, Clock,
} from "lucide-react";
import { AITravelSearch } from "@/components/travel/AITravelSearch";
import { ParsedRequestSummary } from "@/components/travel/ParsedRequestSummary";
import { DestinationRecommendations } from "@/components/travel/DestinationRecommendations";
import { FlightResultsList } from "@/components/travel/FlightResultsList";
import { ProposalPanel } from "@/components/travel/ProposalPanel";
import { LoadingState } from "@/components/travel/LoadingState";
import { ErrorState } from "@/components/travel/ErrorState";
import { EmptyState } from "@/components/travel/EmptyState";
import type { TravelSearchResponse } from "@/types/travel";

const HOW_IT_WORKS = [
  {
    icon: Brain,
    title: "Escribe la petición del cliente",
    description: "Tal como te la escribió por WhatsApp o email. Sin formularios ni filtros.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
  },
  {
    icon: Clock,
    title: "La IA interpreta y busca",
    description: "Extrae destino, fechas, presupuesto y preferencias. Devuelve opciones en segundos.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    icon: FileText,
    title: "Genera la propuesta",
    description: "Copia el resumen listo para enviar por WhatsApp, email o pegar en tu CRM.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
];

const STATS = [
  { value: "< 10s", label: "Por búsqueda" },
  { value: "100%", label: "En español" },
  { value: "0", label: "Formularios" },
  { value: "1 clic", label: "Para copiar propuesta" },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<TravelSearchResponse | null>(null);

  function handleResults(data: TravelSearchResponse) {
    setResults(data);
    setError(null);
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
      {/* Hero Section */}
      <section className="hero-gradient min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
          {/* Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-violet-100 shadow-sm mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            <span className="text-xs font-semibold text-violet-700">Para agencias y asesores de viaje · Demo</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 text-center max-w-3xl leading-tight mb-6 animate-slide-up text-balance">
            De la petición del cliente{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              a la propuesta en segundos
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 text-center max-w-xl mb-10 leading-relaxed animate-fade-in text-balance">
            Escribe lo que te pidió tu cliente y FlyAI interpreta la petición,
            busca opciones y genera una propuesta lista para enviar.
          </p>

          {/* Search */}
          <div className="w-full max-w-3xl animate-fade-in">
            <AITravelSearch
              onResults={handleResults}
              onError={handleError}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Scroll hint */}
          {!results && !isLoading && (
            <div className="mt-12 flex flex-col items-center gap-2 text-gray-400">
              <p className="text-xs">Ver cómo funciona</p>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </div>
          )}
        </div>

        {/* Stats bar */}
        {!results && !isLoading && !error && (
          <div className="border-t border-gray-100 bg-white/60 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Results Section */}
      {(isLoading || error || results) && (
        <section id="results" className="bg-gray-50/80 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
            {isLoading && <LoadingState />}

            {!isLoading && error && (
              <ErrorState message={error} onRetry={handleRetry} />
            )}

            {!isLoading && !error && results && (
              <>
                {/* Demo notice */}
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
                  <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>
                    <strong>Modo demo:</strong> resultados simulados para validar la experiencia.
                    La integración con proveedores reales está en desarrollo.
                  </span>
                </div>

                {/* AI summary */}
                <ParsedRequestSummary parsed={results.parsedRequest} />

                {/* Destination recommendations */}
                {results.destinationRecommendations.length > 0 && (
                  <DestinationRecommendations destinations={results.destinationRecommendations} />
                )}

                {/* Proposal panel — lo más importante para B2B */}
                {hasResults && (
                  <ProposalPanel
                    parsedRequest={results.parsedRequest}
                    flights={results.flights}
                  />
                )}

                {/* Flights */}
                {hasResults && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Plane className="h-5 w-5 text-violet-500" />
                      Opciones de vuelo
                    </h2>
                    <FlightResultsList flights={results.flights} />
                  </div>
                )}

                {hasNoFlights && <EmptyState />}
              </>
            )}
          </div>
        </section>
      )}

      {/* How it works */}
      {!results && !isLoading && !error && (
        <section id="how-it-works" className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 rounded-full border border-violet-100 mb-4">
                <Zap className="h-3.5 w-3.5 text-violet-500" />
                <span className="text-xs font-semibold text-violet-700">Diseñado para agencias</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Tres pasos para convertir la petición de tu cliente en una propuesta lista.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.title} className="text-center group">
                  <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                    <step.icon className="h-8 w-8 text-violet-600" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      {!results && !isLoading && (
        <footer className="border-t border-gray-100 py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-tr from-violet-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Plane className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-gray-900">
                Fly<span className="text-violet-600">AI</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 FlyAI · Herramienta para agencias y asesores de viaje
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Globe className="h-3 w-3" />
              <span>Español</span>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
