import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Las mejores épocas para viajar — Consejos Despegai",
  description: "Cuándo viajar a los destinos más populares desde España: clima, precios y temporadas mes a mes.",
};

const MONTHS = [
  { month: "Enero", destinations: ["Canarias", "Dubai", "Tailandia", "Vietnam", "Marruecos"], avoid: "Europa del Norte", note: "Temporada baja en Europa. Precios mínimos en vuelos y hoteles a destinos continentales." },
  { month: "Febrero", destinations: ["Carnaval de Venecia", "Madeira", "Egipto", "Japón (flor del cerezo temprana)"], avoid: "Escandinavia", note: "El mes más barato del año para volar. Ideal para ciudad europea con bajo presupuesto." },
  { month: "Marzo", destinations: ["Amsterdam (tulipanes)", "Praga", "Lisboa", "Jordania"], avoid: "Caribe (lluvias)", note: "Comienzan los precios de temporada media. Semana Santa puede encarecer las fechas." },
  { month: "Abril", destinations: ["Roma", "Barcelona", "Grecia (islas)", "Marruecos"], avoid: "Sudeste asiático (monzón)", note: "Primavera perfecta en el Mediterráneo. Semana Santa: precios altos y mucha demanda." },
  { month: "Mayo", destinations: ["París", "Croacia", "Portugal", "Irlanda"], avoid: "Zonas de monzón en Asia", note: "El mejor mes del año para Europa: buen tiempo, pocos turistas y precios razonables." },
  { month: "Junio", destinations: ["Grecia", "Italia", "Islandia", "Escandinavia"], avoid: "Egipto (calor extremo)", note: "Comienzo de temporada alta. Reserva con 2-3 meses de antelación mínimo." },
  { month: "Julio", destinations: ["Baleares", "Costa Dálmata", "Noruega", "Canadá"], avoid: "España interior (calor)", note: "Temporada alta máxima. Precios altos pero experiencia de verano plena." },
  { month: "Agosto", destinations: ["Canarias", "Turquía", "Grecia", "Montenegro"], avoid: "Europa central (masificada)", note: "El mes más caro del año en España. Considera destinos menos demandados para ahorrar." },
  { month: "Septiembre", destinations: ["Toscana", "Dubrovnik", "Japón", "Nueva York"], avoid: "Zonas de huracanes en Caribe", note: "El mes favorito de muchos viajeros: tiempo perfecto, menos turistas y precios bajando." },
  { month: "Octubre", destinations: ["Lisboa", "Praga", "Tokio", "Marrakech"], avoid: "Maldivas (final monzón)", note: "Otoño dorado en Europa. Excelente relación calidad-precio en casi todos los destinos." },
  { month: "Noviembre", destinations: ["Dubai", "Bali", "Costa Rica", "Cuba"], avoid: "Escandinavia (oscuridad)", note: "Temporada baja en Europa. Vuelos muy baratos a destinos mediterráneos y americanos." },
  { month: "Diciembre", destinations: ["Laponia", "Mercados de Navidad en Alemania/Austria", "Cancún", "Punta Cana"], avoid: "Nada en particular", note: "Navidad y Fin de Año encarecen mucho los precios. Puentes sin festivos son oportunidades." },
];

export default function CuandoViajarPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/consejos" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-500 mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a consejos
        </Link>

        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mb-5">
          <Calendar className="h-6 w-6 text-white" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Las mejores épocas para viajar</h1>
        <p className="text-slate-400 text-sm mb-8">6 minutos de lectura · Actualizado junio 2026</p>

        <article className="space-y-6 text-slate-700 leading-relaxed">

          <p className="text-lg text-slate-600">
            Saber cuándo viajar puede marcar la diferencia entre pagar el doble y encontrar una oferta excepcional. Esta guía mes a mes te ayuda a planificar cuándo ir a cada tipo de destino para obtener la mejor experiencia al mejor precio.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Calendario de viajes mes a mes</h2>

          <div className="space-y-4">
            {MONTHS.map(m => (
              <div key={m.month} className="card-premium rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-800">{m.month}</h3>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full flex-shrink-0">{m.note.split(".")[0]}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {m.destinations.map(d => (
                    <span key={d} className="text-xs bg-sky-50 text-sky-700 font-medium px-2 py-0.5 rounded-full">{d}</span>
                  ))}
                </div>
                <p className="text-xs text-slate-400">Evitar: {m.avoid}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">La regla de la temporada baja</h2>
          <p>En general, los precios de los vuelos siguen la demanda: cuando todo el mundo quiere ir a un sitio, los precios suben. La estrategia de la temporada baja consiste en viajar al mismo destino justo antes o después del pico de demanda:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-sky-400 font-bold">·</span>Grecia en mayo o septiembre en lugar de julio-agosto: mismo sol, menos turistas, precios un 40% más bajos.</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold">·</span>Roma en noviembre o febrero en lugar de Semana Santa o verano: museos sin colas, restaurantes con mesa libre, hoteles más baratos.</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold">·</span>Tailandia en octubre-noviembre (inicio de temporada seca) en lugar de diciembre-enero: precios más bajos y menos saturación.</li>
          </ul>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mt-8">
            <p className="font-bold text-slate-800 mb-2">Descubre los vuelos más baratos por fechas</p>
            <p className="text-sm text-slate-600 mb-3">Con Despegai puedes buscar &quot;vuelos baratos a Roma en octubre&quot; y ver automáticamente los precios de todas las semanas del mes para comparar.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
              Buscar vuelos por fecha →
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}
