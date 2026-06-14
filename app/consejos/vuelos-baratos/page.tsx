import Link from "next/link";
import { TrendingDown, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo encontrar vuelos baratos — Consejos Despegai",
  description: "Las mejores estrategias para pagar menos en vuelos: cuándo reservar, qué días volar, cómo usar alertas de precio y mucho más.",
};

export default function VuelosBaratosPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/consejos" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-500 mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a consejos
        </Link>

        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center mb-5">
          <TrendingDown className="h-6 w-6 text-white" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Cómo encontrar vuelos baratos</h1>
        <p className="text-slate-400 text-sm mb-8">5 minutos de lectura · Actualizado junio 2026</p>

        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">

          <p className="text-lg text-slate-600">
            Encontrar vuelos baratos no es cuestión de suerte, sino de estrategia. Con unas pocas reglas básicas puedes ahorrar entre un 30% y un 60% en tus vuelos respecto a lo que pagarías reservando sin planificación.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">1. El momento de reserva importa mucho</h2>
          <p>La relación entre antelación y precio no es lineal: ni reservar con un año de antelación ni esperar al último momento es siempre la mejor opción. El punto dulce para vuelos europeos suele estar entre <strong>6 y 10 semanas antes</strong> del vuelo. Para vuelos intercontinentales, la ventana óptima es de <strong>3 a 5 meses</strong>.</p>
          <p>Las aerolíneas suben los precios progresivamente a medida que se llena el avión, pero también hacen bajadas puntuales para rellenar asientos vacíos. Por eso las alertas de precio son tan útiles.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">2. Los martes y miércoles son los días más baratos para volar</h2>
          <p>Los vuelos de viernes y domingo son los más caros porque concentran la mayor demanda. Los martes, miércoles y jueves por la mañana suelen ser significativamente más baratos, a veces un 20-30% menos que el mismo vuelo en fin de semana.</p>
          <p>Si tu trabajo te lo permite, ajustar la fecha de salida o regreso a mitad de semana puede suponer un ahorro importante, especialmente en rutas populares como Madrid-Londres o Barcelona-Roma.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">3. Sé flexible con el aeropuerto de origen</h2>
          <p>En España, Ryanair opera principalmente desde aeropuertos secundarios como Girona, Reus o Jerez. Un vuelo desde Girona a Berlín puede ser 80€ más barato que desde El Prat, y el coste del bus Barcelona-Girona (unos 15€) deja un margen de ahorro muy interesante.</p>
          <p>Lo mismo aplica para el destino: volar a Milán Bérgamo en lugar de Milán Malpensa, o a Londres Stansted en lugar de Heathrow, puede ahorrar mucho dinero si estás dispuesto a usar el transporte terrestre de llegada.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">4. Las fechas flexibles son tu mejor aliado</h2>
          <p>Si puedes viajar &quot;cualquier semana de agosto&quot; en lugar de &quot;el 15 de agosto exactamente&quot;, tienes una ventaja enorme. Las herramientas que muestran precios por calendario —como el comparador de fechas de Despegai— permiten identificar de un vistazo qué semanas del mes son más baratas.</p>
          <p>En general, la primera y última semana de los meses de verano suelen ser más baratas que el pico de julio y agosto. Volar el 1 de julio o el 28 de agosto puede ser 30-40% más económico que volar el 20 de julio.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">5. Compara siempre en varios comparadores</h2>
          <p>Ningún comparador tiene todos los precios. Google Flights es excelente para tener una visión general; Skyscanner muestra bien las opciones low cost; Kayak combina ambos. Y para rutas europeas, siempre vale la pena consultar directamente la web de Ryanair, Vueling e Iberia porque a veces tienen ofertas exclusivas en canal directo.</p>
          <p>Con Despegai puedes hacer esta búsqueda en lenguaje natural: escribe &quot;vuelos baratos a Londres en septiembre&quot; y la IA te muestra directamente las opciones en todas las aerolíneas relevantes.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">6. El equipaje de mano marca la diferencia</h2>
          <p>Las aerolíneas low cost como Ryanair y Vueling ofrecen precios muy bajos en el billete base, pero los añaden en extras: equipaje facturado, selección de asiento, cambio de vuelo. Si vuelas solo con equipaje de mano (máximo 10kg en muchas aerolíneas), el precio final puede ser hasta 60€ más barato por trayecto.</p>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mt-8">
            <p className="font-bold text-slate-800 mb-2">Prueba Despegai para tu próxima búsqueda</p>
            <p className="text-sm text-slate-600 mb-3">Escribe en lenguaje natural lo que buscas — &quot;vuelos baratos a Roma en octubre&quot; — y la IA encuentra y compara las mejores opciones por fecha al instante.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
              Buscar vuelos baratos →
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}
