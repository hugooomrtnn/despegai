import type { TripPlan, TripDay, TripType, ParsedTravelRequest } from "@/types/travel";

// Plantillas de actividades por tipo de destino
const TEMPLATES: Record<string, { morning: string; afternoon: string; evening: string; tip: string }[]> = {
  beach: [
    { morning: "Llegada y check-in en el hotel. Primera visita a la playa más cercana.", afternoon: "Paseo por el paseo marítimo y primeras compras locales.", evening: "Cena en restaurante de mariscos con vistas al mar.", tip: "Lleva protector solar desde el primer día." },
    { morning: "Día de playa. Baño y relax en la arena.", afternoon: "Actividades acuáticas: snorkel, kayak o paddleboard.", evening: "Cóctel al atardecer y cena en chiringuito local.", tip: "Las horas de menor afluencia en la playa son antes de las 10h y después de las 17h." },
    { morning: "Explorar calas y playas menos conocidas de la zona.", afternoon: "Visita al mercado local y compra de productos típicos.", evening: "Cena de despedida y paseo nocturno.", tip: "Pregunta en el hotel por las playas secretas de los locales." },
  ],
  city: [
    { morning: "Llegada. Recorrido por el casco histórico y monumentos principales.", afternoon: "Visita a museos imprescindibles. Reserva con antelación.", evening: "Cena en restaurante del barrio más auténtico de la ciudad.", tip: "Compra los tickets de museos online para evitar colas." },
    { morning: "Mercados locales y gastronomía callejera.", afternoon: "Barrios alternativos y street art. Tiendas de diseño local.", evening: "Ruta de bares y tapas/pintxos/cicchetti según la ciudad.", tip: "El transporte público es siempre más económico que el taxi." },
    { morning: "Excursión de medio día a los alrededores.", afternoon: "Tiempo libre para compras o visitas pendientes.", evening: "Cena de despedida en restaurante con buenas vistas.", tip: "Guarda las últimas horas para pasear sin agenda." },
  ],
  romantic: [
    { morning: "Desayuno en la habitación o en café con encanto. Paseo tranquilo.", afternoon: "Visita a monumentos icónicos juntos. Foto en el mirador más famoso.", evening: "Cena romántica en restaurante con reserva previa.", tip: "Reserva mesa con antelación en los mejores restaurantes." },
    { morning: "Día de spa o masajes en el hotel.", afternoon: "Paseo en barco o visita a jardines históricos.", evening: "Espectáculo o concierto local. Cocktail bar de autor.", tip: "Muchos hoteles ofrecen paquetes románticos, pídelo al hacer el check-in." },
    { morning: "Mercado de artesanía y recuerdos especiales.", afternoon: "Tarde libre: playa, piscina o explorar a vuestro ritmo.", evening: "Última cena especial. Brindis por el viaje.", tip: "Compra algo que recuerde el viaje, no una postal." },
  ],
  adventure: [
    { morning: "Senderismo o ruta de montaña temprano (mejor luz y menos calor).", afternoon: "Actividades de aventura: escalada, rafting, parapente o similar.", evening: "Cena abundante para recuperar energía. Descanso.", tip: "Revisa el tiempo antes de cada actividad outdoor." },
    { morning: "Ruta en bicicleta o quad por los alrededores.", afternoon: "Visita a parques naturales o reservas protegidas.", evening: "Barbacoa o cena en alojamiento rural.", tip: "Lleva siempre agua y snacks para las rutas largas." },
    { morning: "Actividad acuática o aérea según el destino.", afternoon: "Senderismo a punto panorámico. Fotos desde lo alto.", evening: "Cena con locales o tour gastronómico de la región.", tip: "Contrata guías locales para rutas que no conoces." },
  ],
  culture: [
    { morning: "Visita a museos y galerías de arte principales.", afternoon: "Recorrido histórico guiado por el casco antiguo.", evening: "Espectáculo cultural: ópera, flamenco, teatro o música local.", tip: "Los museos suelen tener entrada gratuita algún día de la semana." },
    { morning: "Arquitectura: edificios históricos y modernos emblemáticos.", afternoon: "Mercado de antigüedades y artesanía local.", evening: "Cena en restaurante con historia. Pide la especialidad local.", tip: "Descarga la app de Google Arts & Culture antes de ir." },
    { morning: "Excursión a yacimiento arqueológico o monumento patrimonio UNESCO.", afternoon: "Visita a barrios con historia: judería, árabe, medieval.", evening: "Concierto o actuación en sala histórica.", tip: "Lee sobre la historia del destino antes de llegar. Disfrutarás más." },
  ],
  relax: [
    { morning: "Desayuno sin prisa. Paseo matinal tranquilo.", afternoon: "Tarde de piscina, spa o simplemente no hacer nada.", evening: "Cena tranquila. Nada de turismo agresivo.", tip: "Desconecta el móvil al menos medio día." },
    { morning: "Yoga o meditación si el hotel lo ofrece. Lectura.", afternoon: "Paseo por la naturaleza cercana. Sin agenda.", evening: "Cena ligera. Madrugada temprana si quieres.", tip: "No llenes el día de actividades. El descanso es el objetivo." },
    { morning: "Último día tranquilo. Paseo de despedida.", afternoon: "Compras de última hora. Preparar maleta sin estrés.", evening: "Cena de despedida. Brindis por el descanso conseguido.", tip: "Lleva a casa solo lo que de verdad quieras recordar." },
  ],
  party: [
    { morning: "Descanso. Desayuno tardío. El día empieza despacio.", afternoon: "Playa o piscina para cargar energía.", evening: "Pre-cena, bares de copas, clubs. La noche es larga.", tip: "Come bien antes de salir. Bebe agua entre copa y copa." },
    { morning: "Brunch. Recuperación activa: playa o paseo.", afternoon: "Visita rápida a lo más icónico. Tarde libre.", evening: "Noche de fiesta en el barrio más animado.", tip: "Las mejores fiestas empiezan tarde. No llegues el primero." },
    { morning: "Último día tranquilo. Recuerdos y fotos.", afternoon: "Comida especial. Despedida de la ciudad.", evening: "Noche de cierre si quedan fuerzas.", tip: "Guarda el vuelo de vuelta para el mediodía, no para las 6am." },
  ],
  unknown: [
    { morning: "Llegada y orientación. Paseo por el centro.", afternoon: "Visita a los puntos de interés principales.", evening: "Cena en restaurante local recomendado.", tip: "Pregunta al personal del hotel qué hacer según tus gustos." },
    { morning: "Explorar el destino a tu ritmo.", afternoon: "Actividades según el tipo de viaje.", evening: "Cena y ocio nocturno.", tip: "Consulta guías locales en Tripadvisor o Google Maps." },
    { morning: "Día libre para lo que quede por ver.", afternoon: "Compras, paseos, últimas visitas.", evening: "Despedida del destino.", tip: "Deja siempre tiempo libre sin planificar." },
  ],
};

const DAY_TITLES: Record<string, string[]> = {
  beach: ["Llegada y primera playa", "Día de playa y aventura", "Playas secretas y mercados", "Último amanecer en la costa"],
  city: ["Llegada y primer contacto", "Museos y gastronomía", "Barrios y vida local", "Últimos rincones"],
  romantic: ["Llegada para dos", "Día especial", "Momentos únicos", "Despedida memorable"],
  adventure: ["Llegada y primera ruta", "Adrenalina al máximo", "Naturaleza salvaje", "Último desafío"],
  culture: ["Arte e historia", "Patrimonio vivo", "Cultura profunda", "Últimas joyas"],
  relax: ["Llegada sin prisa", "Desconexión total", "Calma absoluta", "Despedida tranquila"],
  party: ["Llegada y primer contacto", "Día y noche", "La mejor noche", "Recuperación activa"],
  unknown: ["Día 1", "Día 2", "Día 3", "Día 4"],
};

const GENERAL_TIPS: Record<string, string[]> = {
  beach: ["Reserva actividades acuáticas con antelación en temporada alta", "Usa transporte público o bicicleta para llegar a las playas más alejadas", "Prueba siempre la gastronomía local del mar"],
  city: ["La mayoría de los museos son gratuitos 1-2 días a la semana", "Alójate en el centro histórico para ir a pie a todo", "Madruga para evitar colas en los monumentos más populares"],
  romantic: ["Reserva restaurantes con antelación, especialmente en fines de semana", "Pide habitación con vistas al hacer la reserva", "Lleva efectivo para mercados y pequeños establecimientos"],
  adventure: ["Contrata seguros de actividades de aventura", "Revisa el tiempo cada mañana antes de salir", "Lleva siempre más agua de la que crees que necesitas"],
  culture: ["Descarga las apps de museos antes de llegar", "Contrata visitas guiadas para enriquecer la experiencia", "Lee algo sobre la historia del destino antes del viaje"],
  relax: ["Evita tener la agenda llena — el descanso es el objetivo", "Elige alojamiento con spa o piscina", "Desconecta el trabajo desde el primer día"],
  party: ["Descansa la primera tarde para aguantar el ritmo nocturno", "Investiga los mejores clubs o bares con antelación", "Ten cuidado con tus pertenencias en zonas muy concurridas"],
  unknown: ["Pregunta al personal del hotel por recomendaciones locales", "Descarga Google Maps offline del destino", "Lleva siempre efectivo para pequeños comercios"],
};

const BEST_TIME: Record<string, string> = {
  beach: "Mayo a septiembre para mejor clima y playas. Julio-agosto es temporada alta y más caro.",
  city: "Primavera (abril-mayo) y otoño (septiembre-octubre) para evitar masificación y calor.",
  romantic: "Evita festivos y puentes para tener más intimidad en restaurantes y lugares.",
  adventure: "Depende de la actividad. Consulta condiciones locales antes de reservar.",
  culture: "Fuera de temporada alta para disfrutar sin colas y con precios más bajos.",
  relax: "Temporada media para mejores precios y menos gente. Evita agosto en Europa.",
  party: "Verano para destinos de playa. Fines de semana especiales para ciudades.",
  unknown: "Primavera u otoño suelen ser las mejores épocas para la mayoría de destinos.",
};

const DAILY_BUDGET: Record<string, string> = {
  beach: "50-80€/persona (sin alojamiento). Incluye comida, actividades y transporte local.",
  city: "60-100€/persona. Los museos y restaurantes en ciudades grandes encarecen el día.",
  romantic: "80-150€/persona. Cenas especiales y actividades premium pueden subir el coste.",
  adventure: "70-120€/persona. Las actividades de aventura son el mayor gasto del día.",
  culture: "40-70€/persona. Muchos museos tienen opciones gratuitas.",
  relax: "40-80€/persona. El spa del hotel puede ser el mayor extra.",
  party: "60-120€/persona. Las copas son el mayor gasto. Presupuesta bien la noche.",
  unknown: "50-90€/persona como referencia general para destinos europeos.",
};

export function buildTripPlan(request: ParsedTravelRequest): TripPlan | null {
  const destination = request.destination;
  if (!destination) return null;

  const tripType: TripType = request.tripType ?? "unknown";
  const durationDays = request.durationDays ?? 3;
  const clampedDays = Math.min(durationDays, 7); // máximo 7 días en el plan

  const templates = TEMPLATES[tripType] ?? TEMPLATES.unknown;
  const titles = DAY_TITLES[tripType] ?? DAY_TITLES.unknown;

  const days: TripDay[] = Array.from({ length: clampedDays }, (_, i) => {
    const t = templates[i % templates.length];
    return {
      day: i + 1,
      title: titles[i % titles.length],
      morning: t.morning,
      afternoon: t.afternoon,
      evening: t.evening,
      tip: t.tip,
    };
  });

  return {
    destination,
    durationDays: clampedDays,
    tripType,
    days,
    generalTips: GENERAL_TIPS[tripType] ?? GENERAL_TIPS.unknown,
    bestTimeToVisit: BEST_TIME[tripType] ?? BEST_TIME.unknown,
    estimatedDailyBudget: DAILY_BUDGET[tripType] ?? DAILY_BUDGET.unknown,
  };
}
