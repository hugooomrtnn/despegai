import Link from "next/link";
import { MapPin, TrendingDown, Plane } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinos populares desde España — Despegai",
  description: "Los destinos más buscados desde España: Europa, América, Asia y más. Encuentra los vuelos más baratos con inteligencia artificial.",
};

const DESTINATIONS = [
  // Europa
  { name: "París", country: "Francia", code: "CDG", flag: "🇫🇷", price: "desde 40€", tags: ["cultura", "romántico"], category: "Europa" },
  { name: "Roma", country: "Italia", code: "FCO", flag: "🇮🇹", price: "desde 35€", tags: ["historia", "gastronomía"], category: "Europa" },
  { name: "Londres", country: "Reino Unido", code: "LHR", flag: "🇬🇧", price: "desde 30€", tags: ["ciudad", "cultura"], category: "Europa" },
  { name: "Ámsterdam", country: "Países Bajos", code: "AMS", flag: "🇳🇱", price: "desde 45€", tags: ["ciudad", "cultura"], category: "Europa" },
  { name: "Lisboa", country: "Portugal", code: "LIS", flag: "🇵🇹", price: "desde 25€", tags: ["ciudad", "gastronomía"], category: "Europa" },
  { name: "Berlín", country: "Alemania", code: "BER", flag: "🇩🇪", price: "desde 35€", tags: ["historia", "ciudad"], category: "Europa" },
  { name: "Praga", country: "República Checa", code: "PRG", flag: "🇨🇿", price: "desde 40€", tags: ["historia", "barato"], category: "Europa" },
  { name: "Viena", country: "Austria", code: "VIE", flag: "🇦🇹", price: "desde 50€", tags: ["cultura", "música"], category: "Europa" },
  { name: "Budapest", country: "Hungría", code: "BUD", flag: "🇭🇺", price: "desde 45€", tags: ["historia", "barato"], category: "Europa" },
  { name: "Dublín", country: "Irlanda", code: "DUB", flag: "🇮🇪", price: "desde 35€", tags: ["ciudad", "naturaleza"], category: "Europa" },
  { name: "Estocolmo", country: "Suecia", code: "ARN", flag: "🇸🇪", price: "desde 60€", tags: ["naturaleza", "diseño"], category: "Europa" },
  { name: "Atenas", country: "Grecia", code: "ATH", flag: "🇬🇷", price: "desde 55€", tags: ["historia", "playa"], category: "Europa" },
  // Mediterráneo / Islas
  { name: "Ibiza", country: "España", code: "IBZ", flag: "🇪🇸", price: "desde 40€", tags: ["playa", "fiesta"], category: "Islas" },
  { name: "Mallorca", country: "España", code: "PMI", flag: "🇪🇸", price: "desde 30€", tags: ["playa", "relax"], category: "Islas" },
  { name: "Tenerife", country: "España", code: "TFS", flag: "🇪🇸", price: "desde 50€", tags: ["playa", "naturaleza"], category: "Islas" },
  { name: "Gran Canaria", country: "España", code: "LPA", flag: "🇪🇸", price: "desde 55€", tags: ["playa", "relax"], category: "Islas" },
  { name: "Santorini", country: "Grecia", code: "JTR", flag: "🇬🇷", price: "desde 90€", tags: ["romántico", "playa"], category: "Islas" },
  { name: "Malta", country: "Malta", code: "MLA", flag: "🇲🇹", price: "desde 50€", tags: ["historia", "playa"], category: "Islas" },
  // África / Oriente Medio
  { name: "Marrakech", country: "Marruecos", code: "RAK", flag: "🇲🇦", price: "desde 40€", tags: ["cultura", "aventura"], category: "África" },
  { name: "El Cairo", country: "Egipto", code: "CAI", flag: "🇪🇬", price: "desde 120€", tags: ["historia", "cultura"], category: "África" },
  { name: "Dubái", country: "EAU", code: "DXB", flag: "🇦🇪", price: "desde 150€", tags: ["lujo", "moderno"], category: "Oriente Medio" },
  { name: "Estambul", country: "Turquía", code: "IST", flag: "🇹🇷", price: "desde 70€", tags: ["cultura", "gastronomía"], category: "Oriente Medio" },
  // América
  { name: "Nueva York", country: "EE.UU.", code: "JFK", flag: "🇺🇸", price: "desde 280€", tags: ["ciudad", "cultura"], category: "América" },
  { name: "Miami", country: "EE.UU.", code: "MIA", flag: "🇺🇸", price: "desde 300€", tags: ["playa", "fiesta"], category: "América" },
  { name: "Cancún", country: "México", code: "CUN", flag: "🇲🇽", price: "desde 350€", tags: ["playa", "relax"], category: "América" },
  { name: "Buenos Aires", country: "Argentina", code: "EZE", flag: "🇦🇷", price: "desde 500€", tags: ["ciudad", "cultura"], category: "América" },
  // Asia
  { name: "Tokio", country: "Japón", code: "NRT", flag: "🇯🇵", price: "desde 500€", tags: ["cultura", "gastronomía"], category: "Asia" },
  { name: "Bangkok", country: "Tailandia", code: "BKK", flag: "🇹🇭", price: "desde 400€", tags: ["cultura", "playa"], category: "Asia" },
  { name: "Bali", country: "Indonesia", code: "DPS", flag: "🇮🇩", price: "desde 450€", tags: ["playa", "relax"], category: "Asia" },
  { name: "Singapur", country: "Singapur", code: "SIN", flag: "🇸🇬", price: "desde 480€", tags: ["moderno", "gastronomía"], category: "Asia" },
];

const CATEGORIES = ["Europa", "Islas", "África", "Oriente Medio", "América", "Asia"];

const TAG_COLORS: Record<string, string> = {
  playa: "bg-blue-50 text-blue-600",
  cultura: "bg-violet-50 text-violet-600",
  historia: "bg-amber-50 text-amber-600",
  romántico: "bg-rose-50 text-rose-600",
  naturaleza: "bg-emerald-50 text-emerald-600",
  ciudad: "bg-slate-100 text-slate-600",
  gastronomía: "bg-orange-50 text-orange-600",
  barato: "bg-green-50 text-green-600",
  relax: "bg-teal-50 text-teal-600",
  fiesta: "bg-pink-50 text-pink-600",
  aventura: "bg-yellow-50 text-yellow-700",
  lujo: "bg-purple-50 text-purple-600",
  diseño: "bg-indigo-50 text-indigo-600",
  música: "bg-sky-50 text-sky-600",
  moderno: "bg-cyan-50 text-cyan-600",
};

export default function DestinosPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="hero-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <MapPin className="h-3.5 w-3.5" />
            Destinos populares desde España
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
        {CATEGORIES.map(cat => {
          const dests = DESTINATIONS.filter(d => d.category === cat);
          if (!dests.length) return null;
          return (
            <div key={cat}>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-sky-500 rounded-full inline-block" />
                {cat}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dests.map(dest => (
                  <Link
                    key={dest.code}
                    href={`/?q=${encodeURIComponent(`Vuelos baratos a ${dest.name}`)}`}
                    className="card-premium rounded-2xl p-4 hover:shadow-md transition-all hover:border-sky-200 group block"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{dest.flag}</span>
                        <div>
                          <p className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">{dest.name}</p>
                          <p className="text-xs text-slate-400">{dest.country}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex-shrink-0">
                        <TrendingDown className="h-3 w-3" />
                        {dest.price}
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {dest.tags.map(tag => (
                        <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] ?? "bg-slate-100 text-slate-500"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

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
