import type { Metadata } from "next";
import Link from "next/link";
import { Plane } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Despegai",
  description: "Términos y condiciones de uso de Despegai.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-slate-100 py-4 px-6">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
            <Plane className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-extrabold text-slate-900">Despeg<span className="text-orange-400">ai</span></span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Términos y Condiciones</h1>
        <p className="text-sm text-slate-400 mb-10">Última actualización: junio de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar <strong>Despegai</strong> (despegai.vercel.app), aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte, te pedimos que no utilices el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Descripción del servicio</h2>
            <p>
              Despegai es una herramienta de búsqueda e inspiración de viajes que utiliza inteligencia artificial para interpretar solicitudes en lenguaje natural y proporcionar:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Recomendaciones de destinos de viaje personalizadas.</li>
              <li>Planes de viaje orientativos generados por IA.</li>
              <li>Enlaces a plataformas externas de reserva de vuelos y alojamiento.</li>
            </ul>
            <p className="mt-3">
              <strong>Despegai no es una agencia de viajes ni un motor de reservas.</strong> No vendemos vuelos ni alojamiento directamente. Actuamos como intermediario informativo que redirige a plataformas especializadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Precios y disponibilidad</h2>
            <p>
              Los precios, horarios y disponibilidad mostrados en Despegai son <strong>orientativos</strong> y pueden no reflejar los precios actuales en las plataformas de reserva. Los precios reales se muestran en los sitios de terceros (Jetradar, Skyscanner, Kayak, eDreams, Booking.com, etc.) a los que enlazamos. Despegai no garantiza la exactitud de los precios mostrados ni la disponibilidad de plazas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Enlaces de afiliado</h2>
            <p>
              Algunos enlaces en Despegai son enlaces de afiliado de <strong>Travelpayouts</strong>. Esto significa que podemos recibir una comisión cuando realizas una reserva a través de dichos enlaces, sin coste adicional para ti. Esta comisión nos permite mantener el servicio gratuito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitación de responsabilidad</h2>
            <p>Despegai no se hace responsable de:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Discrepancias entre los precios mostrados y los precios reales en plataformas externas.</li>
              <li>Cancelaciones, cambios o problemas con reservas realizadas en plataformas de terceros.</li>
              <li>Inexactitudes en los planes de viaje generados por inteligencia artificial.</li>
              <li>Interrupciones del servicio debidas a mantenimiento o causas técnicas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Uso aceptable</h2>
            <p>El usuario se compromete a:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>No utilizar el servicio para fines ilegales o no autorizados.</li>
              <li>No intentar acceder de forma no autorizada a los sistemas de Despegai.</li>
              <li>No realizar un uso abusivo de las búsquedas que pueda afectar al rendimiento del servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Propiedad intelectual</h2>
            <p>
              El contenido, diseño y código de Despegai son propiedad de sus titulares y están protegidos por las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción total o parcial sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Legislación aplicable</h2>
            <p>
              Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales competentes de España.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos términos, contacta en: <a href="mailto:hugo.moya.martin@gmail.com" className="text-orange-500 hover:underline">hugo.moya.martin@gmail.com</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <Link href="/" className="text-sm text-orange-500 hover:underline font-medium">← Volver al inicio</Link>
          <Link href="/politica-de-privacidad" className="text-sm text-slate-400 hover:text-slate-600">Política de privacidad →</Link>
        </div>
      </div>
    </div>
  );
}
