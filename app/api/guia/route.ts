import { NextRequest, NextResponse } from "next/server";

const GUIDES: Record<string, object> = {
  paris: {
    destination: "París", country: "Francia",
    intro: "París es una de las ciudades más visitadas del mundo y por buena razón: su arquitectura monumental, su gastronomía refinada y su inigualable ambiente cultural la convierten en un destino imprescindible. Desde los bulevares del Marais hasta los cafés de Montmartre, cada rincón de la capital francesa cuenta una historia.",
    bestTime: "La primavera (abril-junio) y el otoño (septiembre-octubre) son las épocas ideales: clima agradable, menos turistas que en verano y precios más razonables. Julio y agosto son los meses más masificados; diciembre tiene un encanto especial por las luces navideñas.",
    mustSee: {
      title: "Qué ver en París",
      items: [
        { name: "Torre Eiffel", description: "El icono de París. Ve al atardecer para ver cómo se ilumina. Reserva la subida con antelación para evitar colas." },
        { name: "Museo del Louvre", description: "Uno de los museos más grandes del mundo. Dedica al menos medio día y prioriza: la Mona Lisa, la Venus de Milo y las antigüedades egipcias." },
        { name: "Montmartre y Sacré-Cœur", description: "El barrio bohemio de París, con vistas panorámicas desde la basílica y el encanto de sus callejuelas de artistas." },
        { name: "Museo d'Orsay", description: "La mejor colección de arte impresionista del mundo, en un edificio que fue estación de tren. Imprescindible para amantes del arte." },
        { name: "Los Campos Elíseos", description: "El bulevar más famoso de París, desde la Plaza de la Concordia hasta el Arco del Triunfo. Ideal para pasear al atardecer." },
      ]
    },
    food: {
      title: "Gastronomía parisina",
      items: [
        { name: "Croissant y café au lait", description: "El desayuno parisino por excelencia. Pruébalo en una boulangerie del barrio, lejos de las zonas turísticas." },
        { name: "Steak frites", description: "Bistec con patatas fritas, el plato estrella de los bistros parisinos. Sencillo, económico y delicioso." },
        { name: "Crêpes y galettes", description: "Dulces o saladas, las crêpes bretonas son un snack perfecto para comer mientras paseas." },
        { name: "Quesos y vino", description: "Francia tiene más de 300 variedades de queso. Visita un fromagerie y acompáñalos con un buen Bordeaux." },
      ]
    },
    tips: [
      "Compra el Paris Museum Pass si vas a visitar más de 3 museos — amortizas el precio fácilmente.",
      "El metro es la forma más rápida de moverse. Un carnet de 10 viajes es más económico que los billetes individuales.",
      "Los restaurantes cerca de los monumentos principales suelen ser caros y mediocres. Aléjate una o dos calles para encontrar opciones auténticas.",
      "El agua del grifo es potable en toda París. Lleva una botella reutilizable.",
      "Muchos museos estatales son gratuitos el primer domingo de cada mes.",
    ],
    budget: "Viaje económico: 80-100€/día. Viaje estándar: 150-200€/día. El alojamiento es el mayor gasto; los hostels en zonas céntricas cuestan desde 30€/noche.",
    gettingThere: "Desde Madrid hay vuelos directos en unas 2 horas con Iberia, Vueling y Air France. El precio medio oscila entre 50 y 200€ ida dependiendo de la antelación. Desde el aeropuerto Charles de Gaulle, el RER B te lleva al centro en 35 minutos.",
  },
  roma: {
    destination: "Roma", country: "Italia",
    intro: "Roma es la ciudad eterna, una superposición de 2.700 años de historia visible en cada esquina. El Coliseo, el Vaticano, el Panteón y las plazas barrocas conviven con una vida cotidiana vibrante, una gastronomía excepcional y una energía única que la distingue de cualquier otra capital europea.",
    bestTime: "Primavera (marzo-mayo) y otoño (septiembre-noviembre) son perfectos: temperaturas agradables de 15-25°C y menos aglomeraciones que en verano. Julio y agosto son muy calurosos (35°C+) y masificados. Diciembre es frío pero con ambiente navideño encantador.",
    mustSee: {
      title: "Qué ver en Roma",
      items: [
        { name: "Coliseo y Foro Romano", description: "El anfiteatro más grande del mundo antiguo. Reserva entrada con acceso al Foro Romano incluido para entender el contexto histórico." },
        { name: "Ciudad del Vaticano", description: "La Basílica de San Pedro, los Museos Vaticanos y la Capilla Sixtina. Reserva los museos online — las colas sin reserva pueden superar las 3 horas." },
        { name: "Fontana di Trevi", description: "La fuente más famosa del mundo. Ve de madrugada para verla sin multitudes y lanza tu moneda para volver a Roma." },
        { name: "Panteón", description: "El edificio antiguo mejor conservado del mundo, construido en el año 125 d.C. La entrada es gratuita para menores de 18 años." },
        { name: "Piazza Navona", description: "La plaza barroca más bella de Roma, con la Fuente de los Cuatro Ríos de Bernini. Perfecta para tomar un gelato y observar el ambiente." },
      ]
    },
    food: {
      title: "Gastronomía romana",
      items: [
        { name: "Cacio e pepe", description: "El plato más romano: pasta con queso Pecorino Romano y pimienta negra. Aparentemente sencillo, técnicamente exigente. Pruébalo en una trattoria del Trastevere." },
        { name: "Supplì", description: "Croquetas de arroz con tomate y mozzarella, el street food romano por excelencia. Las mejores, junto a las pizzerías del centro histórico." },
        { name: "Gelato artesanal", description: "Busca las heladerías donde el gelato se guarda en contenedores tapados (no expuesto en montañas coloridas) — señal de calidad." },
        { name: "Carbonara auténtica", description: "Sin nata: solo huevo, guanciale (papada de cerdo), Pecorino y pimienta. La versión con nata es una invención para turistas." },
      ]
    },
    tips: [
      "Lleva ropa que cubra hombros y rodillas para entrar a iglesias y el Vaticano.",
      "Las fuentes de agua potable gratuitas (nasoni) están por toda la ciudad — lleva botella.",
      "Evita los restaurantes con menú turístico en inglés junto a los monumentos principales.",
      "La tarjeta Roma Pass incluye transporte ilimitado y entrada a museos con descuento.",
      "El Trastevere es el barrio más auténtico para cenar; reserva mesa con antelación en temporada alta.",
    ],
    budget: "Económico: 70-90€/día. Estándar: 130-170€/día. Los museos del Vaticano cuestan 17€; el Coliseo 16€. El transporte público es barato: 1,50€ por viaje.",
    gettingThere: "Vuelos directos desde Madrid, Barcelona y Valencia en unas 2-2,5 horas con Iberia, Vueling, Ryanair y Volotea. Precios desde 40€ ida. Roma tiene dos aeropuertos: Fiumicino (Leonardo da Vinci, el principal) y Ciampino (low cost). El tren Leonardo Express conecta Fiumicino con la Estación Termini en 32 minutos.",
  },
  londres: {
    destination: "Londres", country: "Reino Unido",
    intro: "Londres es una de las ciudades más cosmopolitas y dinámicas del mundo. Capital del Reino Unido y antigua metrópoli de un imperio global, hoy es un crisol de culturas donde conviven museos de clase mundial (la mayoría gratuitos), una escena gastronómica extraordinaria, parques inmensos y una historia que se puede tocar en cada edificio.",
    bestTime: "Junio y julio ofrecen los mejores días, con hasta 16 horas de luz y temperaturas de 20-25°C. Septiembre y octubre son ideales para turismo cultural con menos aglomeraciones. El invierno londinense es gris y húmedo pero tiene encanto navideño y precios más bajos.",
    mustSee: {
      title: "Qué ver en Londres",
      items: [
        { name: "British Museum", description: "Uno de los mejores museos del mundo, con entrada gratuita. La Piedra Rosetta, las momias egipcias y los mármoles del Partenón son imprescindibles." },
        { name: "Torre de Londres", description: "Fortaleza medieval que alberga las Joyas de la Corona. Reserva con antelación — es una de las atracciones más visitadas del país." },
        { name: "Tate Modern", description: "Arte contemporáneo en una antigua central eléctrica junto al Támesis. Colección permanente gratuita. Las vistas desde la terraza son espectaculares." },
        { name: "Borough Market", description: "El mercado gastronómico más famoso de Londres, junto al Puente de Londres. Ideal para desayunar o almorzar con productos artesanos de toda Europa." },
        { name: "Hyde Park y Kensington Gardens", description: "950 acres de verde en el corazón de la ciudad. Visita el Speakers' Corner, el lago Serpentine y el Palacio de Kensington." },
      ]
    },
    food: {
      title: "Gastronomía londinense",
      items: [
        { name: "Fish and chips", description: "El plato nacional, aunque de origen controvertido. Las mejores versiones están en los pubs tradicionales y las fish & chip shops alejadas del centro." },
        { name: "Full English Breakfast", description: "El desayuno inglés completo: huevos, beicon, salchichas, judías, tomate y tostadas. Contundente y perfecto para un día de turismo intenso." },
        { name: "Afternoon tea", description: "La tradición inglesa por excelencia: sándwiches de pepino, scones con clotted cream y pastelitos, todo acompañado de té. Una experiencia única, aunque cara en los hoteles de lujo." },
        { name: "Cocina internacional", description: "Londres es una de las mejores ciudades del mundo para comer comida internacional: curry en Brick Lane, dim sum en Chinatown, comida etíope en Brixton..." },
      ]
    },
    tips: [
      "La Oyster Card o el pago contactless son imprescindibles para el transporte; los billetes de papel cuestan el doble.",
      "La mayoría de los grandes museos son gratuitos: British Museum, Natural History Museum, Victoria & Albert, Tate Modern...",
      "Camina por los barrios: Shoreditch, Notting Hill, Camden y Brixton son más auténticos que el centro turístico.",
      "Las libras esterlinas (GBP) se usan aunque el Reino Unido no esté en la eurozona. Cambia dinero en el banco, no en los puestos del aeropuerto.",
      "El Uber es más barato que los famosos taxis negros (black cabs), aunque ambos son caros respecto a otros países.",
    ],
    budget: "Londres es cara: económico 100-120€/día, estándar 180-250€/día. El alojamiento es el mayor gasto; hostels desde 35€/noche. El transporte público cuesta unos 7-10€/día con Oyster Card.",
    gettingThere: "Vuelos directos desde casi todos los aeropuertos españoles con Iberia, Vueling, British Airways, Ryanair y EasyJet. Desde Madrid, unas 2h15min. Precios desde 30€ ida en low cost. Londres tiene 6 aeropuertos; Heathrow (el más céntrico en metro) y Gatwick (tren directo) son los principales.",
  },
};

function generateGenericGuide(dest: string) {
  return {
    destination: dest,
    country: "Destino internacional",
    intro: `${dest} es un destino fascinante que ofrece una combinación única de cultura, gastronomía e historia. Cada año recibe millones de visitantes que vienen atraídos por su patrimonio, su gente y sus paisajes. Prepara bien tu viaje y descubrirás por qué es uno de los destinos más valorados por los viajeros españoles.`,
    bestTime: `La mejor época para visitar ${dest} depende de lo que busques. En general, la primavera y el otoño suelen ofrecer el mejor equilibrio entre clima agradable y menos turistas. El verano es la temporada alta con precios más altos y más aglomeraciones. Consulta el clima específico del destino antes de reservar.`,
    mustSee: {
      title: `Qué ver en ${dest}`,
      items: [
        { name: "Centro histórico", description: "El corazón cultural y arquitectónico de la ciudad, donde encontrarás los principales monumentos, plazas y edificios históricos." },
        { name: "Museos y galerías", description: "Dedica al menos medio día a los museos locales para entender la historia y cultura del lugar antes de explorar las calles." },
        { name: "Mercados locales", description: "Los mercados son la mejor ventana a la cultura local: gastronomía, artesanía y ambiente auténtico lejos de las zonas turísticas." },
        { name: "Naturaleza y alrededores", description: "Muchos destinos tienen excursiones de un día a parques naturales, pueblos o paisajes excepcionales que complementan la visita a la ciudad." },
        { name: "Barrios auténticos", description: "Alejarse de las zonas más turísticas y explorar los barrios donde vive la gente local ofrece una experiencia mucho más genuina." },
      ]
    },
    food: {
      title: `Gastronomía local`,
      items: [
        { name: "Platos típicos", description: "Investiga los platos tradicionales del destino antes de llegar y busca restaurantes locales donde los lugareños coman habitualmente." },
        { name: "Mercado gastronómico", description: "Los mercados de alimentación son perfectos para probar varios platos locales a precios razonables en un ambiente auténtico." },
        { name: "Postres y dulces", description: "Cada cultura tiene sus dulces y postres tradicionales — pregunta a los locales cuál es la pastelería o heladería más recomendada." },
        { name: "Bebidas locales", description: "Desde el café preparado de formas únicas hasta bebidas tradicionales, la bebida local siempre dice mucho de la cultura del lugar." },
      ]
    },
    tips: [
      "Investiga si necesitas visado antes de reservar — algunos destinos requieren visado para ciudadanos españoles.",
      "Contrata un seguro de viaje que cubra gastos médicos, cancelación y pérdida de equipaje.",
      "Cambia divisas en tu banco antes de salir de España para obtener el mejor tipo de cambio.",
      "Descarga los mapas offline de Google Maps del destino antes de llegar por si no tienes datos.",
      "Guarda los números de emergencia locales y la dirección de la embajada española en tu teléfono.",
      "Avisa a tu banco de que vas a viajar al extranjero para evitar que bloqueen tu tarjeta.",
    ],
    budget: `El presupuesto necesario para visitar ${dest} varía según el tipo de viaje. Un viaje económico puede costar entre 60 y 100€/día (alojamiento básico, transporte público, comida local). Un viaje estándar con hotel de 3-4 estrellas y restaurantes medios oscila entre 150 y 250€/día. Busca vuelos con 2-3 meses de antelación para obtener los mejores precios.`,
    gettingThere: `Desde España puedes llegar a ${dest} en avión desde los principales aeropuertos españoles (Madrid, Barcelona, Málaga, Valencia…). Compara precios en Despegai escribiendo tu búsqueda en lenguaje natural para encontrar las mejores opciones de vuelo. Las aerolineas low cost suelen ofrecer las tarifas más económicas si se reservan con suficiente antelación.`,
  };
}

function normalizeDestination(raw: string): string {
  return raw.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z\s]/g, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const { destination } = await request.json();
    if (!destination || typeof destination !== "string") {
      return NextResponse.json({ error: "Destino no válido" }, { status: 400 });
    }

    const key = normalizeDestination(destination);
    const guide = GUIDES[key] ?? generateGenericGuide(destination.trim());

    return NextResponse.json(guide);
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
