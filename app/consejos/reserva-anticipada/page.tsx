import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Con cuánta antelación reservar vuelos — Consejos Despegai",
  description: "La guía definitiva sobre cuándo reservar vuelos y hoteles para cada tipo de destino y temporada.",
};

export default function ReservaAnticipadaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/consejos" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-500 mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a consejos
        </Link>

        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-5">
          <Clock className="h-6 w-6 text-white" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Con cuánta antelación reservar</h1>
        <p className="text-slate-400 text-sm mb-8">3 minutos de lectura · Actualizado junio 2026</p>

        <article className="space-y-6 text-slate-700 leading-relaxed">

          <p className="text-lg text-slate-600">
            Una de las preguntas más frecuentes entre viajeros: ¿cuándo reservar para pagar menos? La respuesta varía según el tipo de vuelo, el destino y la temporada, pero hay unas reglas generales que funcionan la mayoría de las veces.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">La regla de la antelación por tipo de vuelo</h2>

          <div className="space-y-3">
            {[
              { type: "Vuelos europeos (temporada baja)", time: "3 a 6 semanas", detail: "En temporada baja, reservar demasiado pronto puede salirte más caro que esperar. Las aerolíneas ponen más asientos baratos disponibles a medida que se acerca la fecha." },
              { type: "Vuelos europeos (verano / festivos)", time: "2 a 4 meses", detail: "En Semana Santa, julio y agosto los precios suben rápido. Reserva con 2-4 meses si quieres asegurarte de encontrar buenas opciones." },
              { type: "Vuelos intercontinentales", time: "3 a 6 meses", detail: "Para América, Asia o Australia, el precio óptimo suele estar entre 3 y 6 meses antes. Esperar menos de 4 semanas puede suponer pagar el doble." },
              { type: "Vuelos de última hora", time: "1 a 2 semanas", detail: "Contrario al mito, los vuelos de última hora raramente son más baratos. Solo merece la pena si hay plazas sin ocupar y la aerolínea decide bajar el precio para no volar con asientos vacíos." },
            ].map(item => (
              <div key={item.type} className="card-premium rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-bold text-slate-800 text-sm">{item.type}</h3>
                  <span className="text-xs bg-sky-100 text-sky-700 font-bold px-2 py-0.5 rounded-full flex-shrink-0">{item.time}</span>
                </div>
                <p className="text-sm text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">¿Y los hoteles?</h2>
          <p>Los hoteles siguen una lógica diferente a los vuelos. En destinos muy populares en temporada alta (Santorini en agosto, por ejemplo) conviene reservar con 4-6 meses de antelación, o incluso antes. En destinos urbanos, puedes encontrar buenos precios con 3-4 semanas de antelación, especialmente en noches de lunes a jueves.</p>
          <p>Las plataformas como Booking.com permiten reservar con cancelación gratuita — aprovéchalo para bloquear un precio bueno cuando lo veas y poder cancelar si encuentras algo mejor.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Las alertas de precio son tu mejor herramienta</h2>
          <p>En lugar de revisar los precios manualmente cada día, usa las alertas de precio de Google Flights o Skyscanner. Cuando el precio baje por debajo del umbral que hayas marcado, recibes un email automático. Es la forma más eficiente de no perderse una oferta.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">El mito del martes por la tarde</h2>
          <p>Durante años circuló el rumor de que las aerolíneas publicaban sus ofertas los martes por la tarde y convenía buscar en ese momento. Hoy, con los algoritmos de pricing dinámico que cambian los precios cientos de veces al día, este truco ya no funciona. Lo que sí sigue siendo cierto es que <strong>los martes y miércoles son los días más baratos para volar</strong> (no para buscar).</p>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mt-8">
            <p className="font-bold text-slate-800 mb-2">Empieza a buscar ahora</p>
            <p className="text-sm text-slate-600 mb-3">Cuéntale a Despegai qué tipo de viaje tienes en mente y la IA te muestra las opciones más baratas organizadas por fechas.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
              Buscar vuelos →
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}
