import Link from "next/link";
import { Luggage, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guía del equipaje de mano — Consejos Despegai",
  description: "Todo sobre el equipaje de mano: medidas por aerolínea, qué llevar, cómo organizar la maleta y ahorrar en tasas de equipaje.",
};

export default function EquipajeManoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/consejos" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-500 mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a consejos
        </Link>

        <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-5">
          <Luggage className="h-6 w-6 text-white" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Guía completa del equipaje de mano</h1>
        <p className="text-slate-400 text-sm mb-8">4 minutos de lectura · Actualizado junio 2026</p>

        <article className="space-y-6 text-slate-700 leading-relaxed">

          <p className="text-lg text-slate-600">
            Volar solo con equipaje de mano es la forma más inteligente de ahorrar en vuelos low cost. Pero las normas varían entre aerolíneas y los errores pueden costar caro en el aeropuerto. Esta guía te explica todo lo que necesitas saber.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Medidas permitidas por aerolínea (2026)</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-3 py-2 font-bold text-slate-700 rounded-tl-lg">Aerolínea</th>
                  <th className="text-left px-3 py-2 font-bold text-slate-700">Dimensiones</th>
                  <th className="text-left px-3 py-2 font-bold text-slate-700 rounded-tr-lg">Peso máximo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Iberia", "56 × 45 × 25 cm", "10 kg"],
                  ["Vueling", "55 × 40 × 20 cm", "10 kg"],
                  ["Ryanair", "40 × 20 × 25 cm (pequeña gratis) / 55 × 40 × 20 cm (de pago)", "10 kg"],
                  ["EasyJet", "56 × 45 × 25 cm", "15 kg"],
                  ["Air Europa", "56 × 45 × 25 cm", "10 kg"],
                  ["Volotea", "55 × 40 × 20 cm", "10 kg"],
                ].map(([airline, dims, weight]) => (
                  <tr key={airline} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-semibold text-slate-800">{airline}</td>
                    <td className="px-3 py-2.5 text-slate-600">{dims}</td>
                    <td className="px-3 py-2.5 text-slate-600">{weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">Verifica siempre las medidas actualizadas en la web de la aerolínea antes de viajar.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Lo que no puede ir en el equipaje de mano</h2>
          <p>La normativa de seguridad aeroportuaria (AENA y equivalentes europeos) prohíbe llevar en cabina:</p>
          <ul className="space-y-1.5 text-sm">
            {[
              "Líquidos en recipientes de más de 100 ml (perfumes, champú, cremas…)",
              "Navajas, tijeras con hoja mayor de 6 cm o herramientas punzantes",
              "Mecheros y aerosoles de más de 100 ml",
              "Baterías externas de más de 100 Wh en bodega (en cabina sí)",
              "Alimentos líquidos como mermeladas, miel o aceite en más de 100 ml",
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span className="text-red-400 font-bold">✗</span>
                {item}
              </li>
            ))}
          </ul>
          <p>Los líquidos permitidos (hasta 100 ml cada envase) deben ir en una bolsa de plástico transparente de un litro, una por pasajero.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Cómo empacar para una semana en equipaje de mano</h2>
          <p>Viajar una semana con solo 10 kg es perfectamente posible con la técnica correcta:</p>
          <ul className="space-y-2 text-sm">
            {[
              "Usa cubos organizadores (packing cubes) para maximizar el espacio y encontrar la ropa fácilmente.",
              "Lleva ropa de colores neutros que combinen entre sí para multiplicar los conjuntos con menos prendas.",
              "Opta por ropa de secado rápido — puedes lavar en el hotel y tener ropa seca en pocas horas.",
              "Lleva los zapatos puestos al volar; ocupa demasiado espacio en la maleta. Máximo 2 pares.",
              "Los cosméticos en formato sólido (champú sólido, pasta de dientes en pastillas) ahorran mucho espacio y evitan problemas en el control.",
              "La chaqueta o abrigo puédeslo llevar puesto en el avión, no ocupa espacio en la maleta.",
            ].map(tip => (
              <li key={tip} className="flex gap-2">
                <span className="text-sky-400 font-bold">·</span>
                {tip}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Cuánto ahorras yendo solo con equipaje de mano</h2>
          <p>Las tasas de equipaje facturado varían pero los números son claros:</p>
          <ul className="space-y-1.5 text-sm">
            <li className="flex gap-2"><span className="text-sky-400 font-bold">·</span><strong>Ryanair:</strong> 25-40€ por trayecto con equipaje facturado</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold">·</span><strong>Vueling:</strong> 20-45€ por trayecto</li>
            <li className="flex gap-2"><span className="text-sky-400 font-bold">·</span><strong>EasyJet:</strong> 15-35€ por trayecto</li>
          </ul>
          <p>En un viaje de ida y vuelta con Ryanair puedes ahorrar hasta <strong>80€</strong> viajando solo con maleta de cabina. Suficiente para una noche de hotel extra.</p>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mt-8">
            <p className="font-bold text-slate-800 mb-2">¿Ya tienes el equipaje listo?</p>
            <p className="text-sm text-slate-600 mb-3">Busca el vuelo más barato para tu próximo destino con Despegai — sin formularios, solo describiendo tu viaje.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
              Buscar vuelos →
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}
