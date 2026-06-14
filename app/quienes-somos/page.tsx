import Link from "next/link";
import { Plane, Brain, Shield, Zap, Globe, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiénes somos — Despegai",
  description: "Despegai es el primer buscador de vuelos en español que entiende lenguaje natural. Conoce nuestra misión y cómo funciona nuestra tecnología.",
};

const VALUES = [
  {
    icon: Brain,
    color: "from-sky-400 to-blue-600",
    title: "Inteligencia artificial real",
    description: "No somos un comparador más. Despegai usa IA para entender lo que buscas en lenguaje natural y traducirlo en resultados de vuelos concretos, sin que tengas que rellenar ningún formulario.",
  },
  {
    icon: Shield,
    color: "from-emerald-400 to-teal-600",
    title: "Transparencia total",
    description: "No vendemos vuelos directamente ni cobramos comisiones ocultas. Te llevamos siempre al sitio oficial de la aerolínea o plataforma para que completes tu reserva con total seguridad.",
  },
  {
    icon: Globe,
    color: "from-violet-400 to-indigo-600",
    title: "En español, de verdad",
    description: "Diseñado desde el principio para usuarios hispanohablantes. Puedes escribir como hablas, con expresiones coloquiales, y la IA lo entiende: 'algo barato para el puente de mayo' o 'me sorprende un destino de playa'.",
  },
  {
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    title: "Rapidez ante todo",
    description: "En menos de 10 segundos tienes resultados reales de vuelos organizados por fechas. Sin esperas, sin anuncios bloqueando la búsqueda, sin pasos innecesarios.",
  },
];

export default function QuienesSomosPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="hero-dark py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Plane className="h-3.5 w-3.5" />
            Quiénes somos
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            Buscar vuelos debería ser<br />
            <span className="text-sky-400">tan fácil como contárselo a un amigo</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Despegai nació de una idea sencilla: los buscadores de vuelos actuales son complicados, lentos y están pensados para quien ya sabe exactamente lo que quiere. Nosotros hemos dado la vuelta a eso.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-14">

        {/* Misión */}
        <div className="card-premium rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Nuestra misión</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Hacer que encontrar un vuelo barato sea tan sencillo como describirlo en voz alta. Sin formularios, sin calendarios interminables, sin comparar pestaña a pestaña.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Despegai conecta la inteligencia artificial con los principales buscadores y aerolíneas del mundo para darte resultados reales en segundos. Tú describes tu viaje — el destino, las fechas aproximadas, cuántos sois, qué presupuesto tenéis — y la IA lo entiende, busca y organiza las opciones por fecha para que puedas comparar fácilmente cuál sale más barata.
          </p>
          <p className="text-slate-600 leading-relaxed">
            No importa si sabes exactamente a dónde quieres ir o si todavía estás buscando inspiración. Despegai funciona igual de bien con búsquedas concretas (&ldquo;vuelos Madrid-Tokio en septiembre para 2 personas&rdquo;) que con peticiones abiertas (&ldquo;sorpréndeme con un destino de playa barato para este verano&rdquo;).
          </p>
        </div>

        {/* Valores */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Cómo nos diferenciamos</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card-premium rounded-2xl p-6">
                  <div className={`w-10 h-10 bg-gradient-to-br ${v.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cómo funciona brevemente */}
        <div className="card-premium rounded-3xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-5">Cómo funciona Despegai</h2>
          <ol className="space-y-4">
            {[
              { n: "1", t: "Describes tu viaje en lenguaje natural", d: "Escribe lo que buscas como si se lo contaras a un amigo. La IA entiende destinos, fechas aproximadas, número de viajeros, presupuesto y preferencias." },
              { n: "2", t: "La IA interpreta y organiza los resultados", d: "Extrae automáticamente toda la información relevante y muestra vuelos reales organizados por fechas. Si pediste un mes entero, ves varias semanas para comparar precios." },
              { n: "3", t: "Comparas opciones y eliges aerolínea", d: "Cada sección de fechas muestra vuelos reales con precios actuales. Cuando encuentras el que te encaja, eliges si comprarlo en Iberia, Vueling, Ryanair, Google Flights, Skyscanner o Kayak." },
              { n: "4", t: "Completas la reserva en el sitio oficial", d: "Te llevamos directamente a la web oficial de la aerolínea o plataforma. Ningún intermediario, ninguna comisión oculta. La reserva es 100% segura." },
            ].map(step => (
              <li key={step.n} className="flex gap-4">
                <span className="w-7 h-7 bg-sky-500 text-white text-xs font-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">{step.n}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{step.t}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">¿Listo para probarlo?</h2>
          <p className="text-sky-100 mb-6">Describe tu próximo viaje y la IA encuentra los vuelos más baratos al instante.</p>
          <Link href="/"
            className="inline-flex items-center gap-2 bg-white text-sky-600 font-bold px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors">
            <Plane className="h-4 w-4" />
            Buscar vuelos ahora
          </Link>
        </div>

      </div>
    </main>
  );
}
