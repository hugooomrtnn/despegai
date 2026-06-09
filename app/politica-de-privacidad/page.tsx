import type { Metadata } from "next";
import Link from "next/link";
import { Plane } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad — Despegai",
  description: "Política de privacidad y protección de datos de Despegai.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header simple */}
      <div className="border-b border-slate-100 py-4 px-6">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
            <Plane className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-extrabold text-slate-900">Despeg<span className="text-orange-400">ai</span></span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-slate-400 mb-10">Última actualización: junio de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recogidos a través de <strong>despegai.vercel.app</strong> (en adelante, "Despegai") es el titular del sitio web, con domicilio en España.
              Para cualquier consulta relacionada con la privacidad, puede contactar en: <a href="mailto:hugo.moya.martin@gmail.com" className="text-orange-500 hover:underline">hugo.moya.martin@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Datos que recopilamos</h2>
            <p>Despegai recopila únicamente los datos mínimos necesarios para prestar el servicio:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Consultas de búsqueda:</strong> el texto que introduces en el buscador para procesar tu solicitud de viaje mediante inteligencia artificial.</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, recogidos de forma anónima mediante cookies técnicas y de análisis.</li>
              <li><strong>Cookies de afiliación:</strong> identificadores de sesión gestionados por Travelpayouts para el seguimiento de reservas realizadas a través de enlaces de afiliado.</li>
            </ul>
            <p className="mt-3">No recopilamos nombres, apellidos, DNI, tarjetas de crédito ni ningún otro dato personal sensible.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Finalidad del tratamiento</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Procesar las búsquedas de viaje mediante la API de Anthropic (inteligencia artificial) para ofrecer recomendaciones de destinos y planes de viaje.</li>
              <li>Mostrar resultados de búsqueda de vuelos y alojamiento enlazando con plataformas externas (Jetradar, Skyscanner, Kayak, eDreams, Booking.com, Airbnb).</li>
              <li>Gestionar el programa de afiliados de Travelpayouts para el seguimiento de comisiones.</li>
              <li>Mejorar el servicio mediante análisis estadístico anónimo del uso del sitio.</li>
              <li>Mostrar publicidad contextual a través de Google AdSense.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Base legal</h2>
            <p>El tratamiento de datos se basa en:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Ejecución del servicio</strong> (art. 6.1.b RGPD): para procesar las búsquedas solicitadas.</li>
              <li><strong>Consentimiento</strong> (art. 6.1.a RGPD): para el uso de cookies no esenciales y publicidad personalizada.</li>
              <li><strong>Interés legítimo</strong> (art. 6.1.f RGPD): para el análisis estadístico anónimo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Cookies</h2>
            <p>Despegai utiliza los siguientes tipos de cookies:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-3 border border-slate-200 font-semibold">Cookie</th>
                    <th className="text-left p-3 border border-slate-200 font-semibold">Proveedor</th>
                    <th className="text-left p-3 border border-slate-200 font-semibold">Finalidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200">Cookies técnicas</td>
                    <td className="p-3 border border-slate-200">Despegai / Vercel</td>
                    <td className="p-3 border border-slate-200">Funcionamiento básico del sitio</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200">_tp_marker</td>
                    <td className="p-3 border border-slate-200">Travelpayouts</td>
                    <td className="p-3 border border-slate-200">Seguimiento de reservas de afiliado</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200">_ga, _gid</td>
                    <td className="p-3 border border-slate-200">Google Analytics</td>
                    <td className="p-3 border border-slate-200">Análisis de uso anónimo</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200">IDE, DSID</td>
                    <td className="p-3 border border-slate-200">Google AdSense</td>
                    <td className="p-3 border border-slate-200">Publicidad personalizada</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Puedes gestionar o rechazar las cookies desde la configuración de tu navegador. Para más información sobre cómo Google utiliza los datos: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Terceros y transferencias internacionales</h2>
            <p>Despegai utiliza los siguientes servicios de terceros que pueden tratar datos personales:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Anthropic (EE.UU.):</strong> procesamiento de consultas mediante inteligencia artificial. <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Política de privacidad</a></li>
              <li><strong>Travelpayouts (internacional):</strong> programa de afiliados y seguimiento de reservas. <a href="https://www.travelpayouts.com/en/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Política de privacidad</a></li>
              <li><strong>Vercel (EE.UU.):</strong> alojamiento del sitio web. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Política de privacidad</a></li>
              <li><strong>Google AdSense (EE.UU.):</strong> publicidad. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Política de privacidad</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Conservación de datos</h2>
            <p>
              Los datos de las consultas de búsqueda no se almacenan de forma permanente en nuestros servidores. Los datos de navegación anónimos se conservan durante un máximo de 26 meses. Las cookies de afiliado tienen una duración de 30 días.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Tus derechos</h2>
            <p>De acuerdo con el RGPD y la LOPDGDD, tienes derecho a:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la supresión de tus datos</li>
              <li>Oponerte al tratamiento</li>
              <li>Solicitar la limitación del tratamiento</li>
              <li>Portabilidad de los datos</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, contacta en <a href="mailto:hugo.moya.martin@gmail.com" className="text-orange-500 hover:underline">hugo.moya.martin@gmail.com</a>. También puedes presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Agencia Española de Protección de Datos (AEPD)</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Cambios en esta política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios importantes serán notificados en el sitio web. La versión vigente siempre estará disponible en esta página.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <Link href="/" className="text-sm text-orange-500 hover:underline font-medium">← Volver al inicio</Link>
          <Link href="/terminos" className="text-sm text-slate-400 hover:text-slate-600">Términos y condiciones →</Link>
        </div>
      </div>
    </div>
  );
}
