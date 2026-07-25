export interface GuideSection {
  title: string;
  items: { name: string; description: string }[];
}

// Campos comunes a cualquier guía, venga de la lista estática o del generador
// bajo demanda — es lo único que necesita <GuideView> para pintar la guía.
export interface GuideContent {
  destination: string;
  country: string;
  intro: string;
  bestTime: string;
  mustSee: GuideSection;
  food: GuideSection;
  tips: string[];
  budget: string;
  gettingThere: string;
}

export interface DestinationGuide extends GuideContent {
  slug: string;
  flag: string;
}

// Guías escritas a mano, con información específica y verificable — no genéricas
// ni generadas en el momento. Sirven de contenido estático real para /guias y de
// base para los enlaces cruzados con el buscador de vuelos.
export const STATIC_GUIDES: DestinationGuide[] = [
  {
    slug: "paris",
    destination: "París", country: "Francia", flag: "🇫🇷",
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
      ],
    },
    food: {
      title: "Gastronomía parisina",
      items: [
        { name: "Croissant y café au lait", description: "El desayuno parisino por excelencia. Pruébalo en una boulangerie del barrio, lejos de las zonas turísticas." },
        { name: "Steak frites", description: "Bistec con patatas fritas, el plato estrella de los bistros parisinos. Sencillo, económico y delicioso." },
        { name: "Crêpes y galettes", description: "Dulces o saladas, las crêpes bretonas son un snack perfecto para comer mientras paseas." },
        { name: "Quesos y vino", description: "Francia tiene más de 300 variedades de queso. Visita un fromagerie y acompáñalos con un buen Bordeaux." },
      ],
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
  {
    slug: "roma",
    destination: "Roma", country: "Italia", flag: "🇮🇹",
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
      ],
    },
    food: {
      title: "Gastronomía romana",
      items: [
        { name: "Cacio e pepe", description: "El plato más romano: pasta con queso Pecorino Romano y pimienta negra. Aparentemente sencillo, técnicamente exigente. Pruébalo en una trattoria del Trastevere." },
        { name: "Supplì", description: "Croquetas de arroz con tomate y mozzarella, el street food romano por excelencia. Las mejores, junto a las pizzerías del centro histórico." },
        { name: "Gelato artesanal", description: "Busca las heladerías donde el gelato se guarda en contenedores tapados (no expuesto en montañas coloridas) — señal de calidad." },
        { name: "Carbonara auténtica", description: "Sin nata: solo huevo, guanciale (papada de cerdo), Pecorino y pimienta. La versión con nata es una invención para turistas." },
      ],
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
  {
    slug: "londres",
    destination: "Londres", country: "Reino Unido", flag: "🇬🇧",
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
      ],
    },
    food: {
      title: "Gastronomía londinense",
      items: [
        { name: "Fish and chips", description: "El plato nacional, aunque de origen controvertido. Las mejores versiones están en los pubs tradicionales y las fish & chip shops alejadas del centro." },
        { name: "Full English Breakfast", description: "El desayuno inglés completo: huevos, beicon, salchichas, judías, tomate y tostadas. Contundente y perfecto para un día de turismo intenso." },
        { name: "Afternoon tea", description: "La tradición inglesa por excelencia: sándwiches de pepino, scones con clotted cream y pastelitos, todo acompañado de té. Una experiencia única, aunque cara en los hoteles de lujo." },
        { name: "Cocina internacional", description: "Londres es una de las mejores ciudades del mundo para comer comida internacional: curry en Brick Lane, dim sum en Chinatown, comida etíope en Brixton..." },
      ],
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
  {
    slug: "lisboa",
    destination: "Lisboa", country: "Portugal", flag: "🇵🇹",
    intro: "Lisboa se despliega sobre siete colinas junto al Tajo, con tranvías amarillos escalando calles empedradas, azulejos cubriendo fachadas centenarias y un ambiente relajado que contrasta con el bullicio de otras capitales europeas. Es una de las ciudades con mejor relación calidad-precio de Europa Occidental y un destino perfecto para una escapada corta desde España.",
    bestTime: "Marzo a mayo y septiembre a octubre ofrecen temperaturas suaves (18-24°C) sin las aglomeraciones ni el calor extremo del verano. Julio y agosto son muy calurosos y concentran la mayor afluencia de turistas. El invierno es templado comparado con el resto de Europa, ideal para escapadas de fin de semana.",
    mustSee: {
      title: "Qué ver en Lisboa",
      items: [
        { name: "Torre de Belém y Monasterio de los Jerónimos", description: "Los dos monumentos más emblemáticos de la era de los descubrimientos portugueses, declarados Patrimonio de la Humanidad. Visítalos a primera hora para evitar colas." },
        { name: "Barrio de Alfama", description: "El barrio más antiguo de Lisboa, con calles empinadas y laberínticas que sobrevivieron al terremoto de 1755. Aquí nació el fado." },
        { name: "Miradouro da Senhora do Monte", description: "El mirador con las mejores vistas panorámicas de la ciudad y el castillo de San Jorge, especialmente al atardecer." },
        { name: "Tranvía 28", description: "La ruta de tranvía histórica que atraviesa los barrios más pintorescos. Súbete temprano por la mañana para evitar las aglomeraciones de turistas." },
        { name: "LX Factory", description: "Antiguo complejo industrial reconvertido en zona de galerías, tiendas de diseño y restaurantes, bajo el puente 25 de Abril." },
      ],
    },
    food: {
      title: "Gastronomía lisboeta",
      items: [
        { name: "Pastel de nata", description: "El dulce más famoso de Portugal. La receta original se sirve en la Antiga Confeitaria de Belém desde 1837, aunque hay excelentes versiones por toda la ciudad." },
        { name: "Bacalhau", description: "Portugal presume de tener 365 formas de cocinar el bacalao, una por cada día del año. El bacalhau à Brás (con patatas y huevo) es uno de los más populares." },
        { name: "Marisco fresco", description: "Lisboa está junto al mar y su marisco es excepcional y asequible comparado con España. Prueba las gambas al ajillo o el marisco a la plancha en Cascais." },
        { name: "Ginjinha", description: "Licor de guindas típico de Lisboa, se toma en pequeños vasos de chocolate en bares tradicionales del centro por apenas 1-2€." },
      ],
    },
    tips: [
      "Las colinas de Lisboa son pronunciadas — lleva calzado cómodo o usa los tranvías y funiculares (elevadores) para subirlas.",
      "La tarjeta Lisboa Card incluye transporte ilimitado y entrada gratuita o con descuento a los principales monumentos.",
      "Evita cambiar dinero en el aeropuerto; los cajeros automáticos (Multibanco) ofrecen mejor cambio.",
      "El barrio de Belém es grande y disperso — dedica media jornada completa solo a esa zona.",
      "Muchos restaurantes turísticos cobran un 'couvert' (pan, aceitunas) que no has pedido — puedes rechazarlo si no lo quieres.",
    ],
    budget: "Uno de los destinos más económicos de Europa Occidental: viaje económico 50-70€/día, estándar 90-130€/día. Una cerveza cuesta 2-3€ y un menú del día ronda los 10-12€.",
    gettingThere: "Vuelos directos desde toda España en 1-1,5 horas con TAP Portugal, Vueling, Iberia y Ryanair, desde 30€ ida. El aeropuerto Humberto Delgado está a solo 7 km del centro, conectado por metro (línea roja) en unos 20 minutos.",
  },
  {
    slug: "amsterdam",
    destination: "Ámsterdam", country: "Países Bajos", flag: "🇳🇱",
    intro: "Ámsterdam es una ciudad construida sobre canales, con casas estrechas del Siglo de Oro holandés reflejadas en el agua y miles de bicicletas como principal medio de transporte. Museos de primer nivel mundial, una vida nocturna liberal y un tamaño perfecto para recorrer a pie o en bici la convierten en un destino de escapada muy popular desde España.",
    bestTime: "Abril y mayo son ideales gracias a los tulipanes en flor (los campos de Keukenhof abren de marzo a mayo). El verano (junio-agosto) tiene el mejor clima pero más turistas y precios más altos. Evita el invierno si no te gusta el frío húmedo, aunque los mercados navideños compensan.",
    mustSee: {
      title: "Qué ver en Ámsterdam",
      items: [
        { name: "Museo Van Gogh", description: "La mayor colección de obras de Van Gogh del mundo. Compra la entrada online con antelación — se agota semanas antes en temporada alta." },
        { name: "Rijksmuseum", description: "El gran museo nacional holandés, con obras de Rembrandt y Vermeer, incluida 'La ronda de noche'. Dedica al menos 3 horas." },
        { name: "Casa de Ana Frank", description: "El escondite donde Ana Frank escribió su diario durante la ocupación nazi. Las entradas se venden online con semanas de antelación." },
        { name: "Paseo en barco por los canales", description: "La mejor forma de entender la estructura de la ciudad y ver las casas del Siglo de Oro desde el agua. Muchas rutas salen cerca de la Estación Central." },
        { name: "Barrio de Jordaan", description: "Antiguo barrio obrero convertido en una de las zonas más bonitas y de moda, con canales tranquilos, tiendas vintage y cafés con encanto." },
      ],
    },
    food: {
      title: "Gastronomía holandesa",
      items: [
        { name: "Stroopwafel", description: "Dos finas obleas con sirope de caramelo entre medias. Cómpralo recién hecho en un mercado — se derrite ligeramente y sabe mucho mejor que el envasado." },
        { name: "Bitterballen", description: "Croquetas de ternera rebozadas, el snack de cerveza por excelencia en cualquier café holandés (bruin café)." },
        { name: "Arenque crudo (haring)", description: "Un clásico local: arenque crudo marinado, tradicionalmente comido sujetándolo por la cola. Se vende en puestos callejeros por toda la ciudad." },
        { name: "Queso holandés", description: "Visita un mercado de quesos o una quesería especializada para probar variedades de Gouda y Edam curadas, mucho más intensas que las versiones de exportación." },
      ],
    },
    tips: [
      "Alquila una bicicleta — es la forma más auténtica y rápida de moverte, pero respeta los carriles bici, son una prioridad absoluta en la ciudad.",
      "Reserva con semanas de antelación las entradas a Van Gogh y Ana Frank; se agotan con facilidad.",
      "El I Amsterdam City Card incluye transporte, entrada a museos y un crucero por los canales.",
      "El barrio rojo (De Wallen) es una zona turística más, pero evita hacer fotos a las trabajadoras sexuales — está prohibido y se sanciona.",
      "Muchos museos cierran los lunes o tienen horario reducido — comprueba los horarios antes de planificar el día.",
    ],
    budget: "Económico: 80-100€/día. Estándar: 140-180€/día. Las entradas a los grandes museos rondan los 20-22€ cada una; el transporte público cuesta unos 8€/día.",
    gettingThere: "Vuelos directos desde todos los aeropuertos españoles principales con KLM, Iberia, Vueling y EasyJet, en unas 2,5 horas. Precios desde 40€ ida. El aeropuerto de Schiphol está conectado con la Estación Central en tren en solo 15-20 minutos.",
  },
  {
    slug: "nueva-york",
    destination: "Nueva York", country: "Estados Unidos", flag: "🇺🇸",
    intro: "Nueva York es la ciudad que nunca duerme: rascacielos icónicos, Broadway, Central Park y una diversidad cultural inigualable en cada uno de sus cinco distritos. Es una de las escapadas transatlánticas más populares desde España gracias a los vuelos directos y ofrece experiencias para todos los gustos, desde el arte de clase mundial hasta la gastronomía callejera.",
    bestTime: "Abril-junio y septiembre-noviembre ofrecen clima agradable (15-24°C) y son las temporadas favoritas de los neoyorquinos. El otoño, con el follaje de Central Park, es especialmente fotogénico. Diciembre tiene el mejor ambiente navideño (Rockefeller Center, escaparates de la Quinta Avenida) pero hace mucho frío.",
    mustSee: {
      title: "Qué ver en Nueva York",
      items: [
        { name: "Central Park", description: "340 hectáreas de verde en pleno Manhattan. Alquila una bici o simplemente pasea por Bethesda Terrace y Bow Bridge." },
        { name: "Estatua de la Libertad y Ellis Island", description: "Toma el ferry desde Battery Park — reserva con antelación si quieres subir a la corona. El ferry gratuito de Staten Island ofrece vistas similares sin coste." },
        { name: "Times Square y Broadway", description: "El corazón comercial y teatral de la ciudad. Compra entradas de Broadway con descuento en el TKTS Booth el mismo día de la función." },
        { name: "Museo Metropolitano de Arte (The Met)", description: "Uno de los museos más grandes del mundo. El precio de entrada es sugerido (pay-what-you-wish) para residentes del estado de Nueva York, fijo para el resto." },
        { name: "Top of the Rock / Empire State", description: "Las mejores vistas panorámicas de Manhattan. Top of the Rock incluye vistas del Empire State, que no se ve a sí mismo." },
      ],
    },
    food: {
      title: "Gastronomía neoyorquina",
      items: [
        { name: "Pizza al corte (NY slice)", description: "La porción de pizza neoyorquina, fina y grande, se dobla por la mitad para comer de pie. Prueba sitios clásicos como Joe's Pizza en Greenwich Village." },
        { name: "Bagel con lox", description: "Bagel con salmón ahumado y queso crema, herencia de la comunidad judía de la ciudad. Russ & Daughters es una institución centenaria." },
        { name: "Food trucks y halal carts", description: "Los puestos callejeros de comida halal (arroz, pollo, cordero) son rápidos, baratos y muy populares entre oficinistas neoyorquinos." },
        { name: "Delis y pastrami sandwich", description: "El sándwich de pastrami con centeno de las delicatessen judías, como Katz's Delicatessen en el Lower East Side, es toda una institución." },
      ],
    },
    tips: [
      "Compra la MetroCard o usa el pago contactless (OMNY) para el metro — funciona 24 horas y es la forma más rápida de moverte.",
      "Necesitas el ESTA (autorización electrónica de viaje) para entrar sin visado; solicítalo con antelación, no en el aeropuerto.",
      "Las propinas son obligatorias por costumbre: 18-20% en restaurantes con servicio en mesa.",
      "Manhattan se organiza en cuadrícula (calles y avenidas numeradas), lo que hace muy fácil orientarse sin mapa.",
      "Muchos museos y atracciones tienen descuentos si compras pases combinados como el New York CityPASS.",
    ],
    budget: "Ciudad cara: económico 100-130€/día, estándar 200-280€/día. El alojamiento es el mayor gasto en Manhattan; considera Brooklyn o Queens para precios más bajos con buena conexión de metro.",
    gettingThere: "Vuelos directos desde Madrid y Barcelona en 8-9 horas con Iberia, Air Europa, Delta y United, desde 350€ ida y vuelta en temporada baja. Nueva York tiene tres aeropuertos: JFK (el principal para vuelos internacionales), Newark y LaGuardia.",
  },
  {
    slug: "bangkok",
    destination: "Bangkok", country: "Tailandia", flag: "🇹🇭",
    intro: "Bangkok es una explosión sensorial: templos dorados junto a rascacielos futuristas, mercados flotantes, tuk-tuks esquivando el tráfico y una de las mejores gastronomías callejeras del mundo. Es la puerta de entrada habitual al sudeste asiático y combina un coste de vida muy bajo con una oferta turística de primer nivel.",
    bestTime: "Noviembre a febrero es la temporada seca y fresca (por estándares tropicales, 25-32°C), la mejor época para visitar. Marzo-mayo es muy caluroso (hasta 40°C) y junio-octubre es la temporada de monzones con lluvias intensas pero cortas.",
    mustSee: {
      title: "Qué ver en Bangkok",
      items: [
        { name: "Gran Palacio y Wat Phra Kaew", description: "El templo del Buda de Esmeralda, dentro del recinto del antiguo palacio real. Exige vestimenta que cubra hombros y rodillas para entrar." },
        { name: "Wat Arun (Templo del Amanecer)", description: "Espectacular templo junto al río Chao Phraya, especialmente bonito al atardecer visto desde la otra orilla." },
        { name: "Mercado flotante de Damnoen Saduak", description: "Excursión clásica de medio día para ver comerciantes vendiendo fruta y comida desde barcas de madera por los canales." },
        { name: "Chinatown (Yaowarat)", description: "El barrio chino más grande del sudeste asiático, con puestos de comida callejera activos hasta la madrugada." },
        { name: "Mercado de Chatuchak", description: "Uno de los mercados al aire libre más grandes del mundo, con más de 8.000 puestos de ropa, artesanía y comida. Abierto solo fines de semana." },
      ],
    },
    food: {
      title: "Gastronomía tailandesa",
      items: [
        { name: "Pad thai", description: "El plato tailandés más internacional: fideos de arroz salteados con gambas, tofu, huevo y cacahuetes. Los mejores puestos callejeros lo bordan por menos de 2€." },
        { name: "Tom yum goong", description: "Sopa agripicante de gambas con hierba limón, galanga y chile, el sabor más representativo de la cocina tailandesa." },
        { name: "Mango sticky rice", description: "Postre de arroz glutinoso con leche de coco y mango fresco, ligero y perfecto para el calor tropical." },
        { name: "Street food en Sukhumvit", description: "Los puestos callejeros de la zona de Sukhumvit ofrecen desde satay hasta insectos fritos — una experiencia gastronómica en sí misma." },
      ],
    },
    tips: [
      "Regatea en mercados y con los tuk-tuks, pero usa siempre el taxímetro en los taxis oficiales para evitar que te cobren de más.",
      "Vístete con respeto para visitar templos: hombros y rodillas cubiertas, y descálzate antes de entrar a las zonas sagradas.",
      "Bebe siempre agua embotellada, aunque la comida callejera bien cocinada es generalmente segura y deliciosa.",
      "Usa la app Grab (el Uber del sudeste asiático) para moverte con precios fijos y sin regateo.",
      "El BTS Skytrain y el MRT (metro) son rápidos y baratos, y evitan el tráfico notoriamente denso de la ciudad.",
    ],
    budget: "Uno de los destinos más económicos del mundo: viaje económico 25-35€/día, estándar 50-80€/día. Una comida callejera cuesta 1,50-3€ y una habitación de hotel de 3 estrellas ronda los 25-40€/noche.",
    gettingThere: "No hay vuelos directos desde España; se vuela con una escala (Doha, Estambul, Ámsterdam...) con Qatar Airways, Turkish Airlines o Emirates, en un total de 13-16 horas. Precios desde 500€ ida y vuelta en temporada baja. El aeropuerto Suvarnabhumi conecta con el centro en tren (Airport Rail Link) en unos 30 minutos.",
  },
  {
    slug: "tokio",
    destination: "Tokio", country: "Japón", flag: "🇯🇵",
    intro: "Tokio es una megalópolis donde la tradición y el futuro conviven sin fricción: templos centenarios junto a cruces peatonales hipnóticos, gastronomía con más estrellas Michelin que ninguna otra ciudad del mundo y un nivel de limpieza y organización que sorprende a cualquier visitante. Es uno de los destinos de larga distancia más deseados por los viajeros españoles.",
    bestTime: "Marzo-mayo (temporada de los cerezos en flor, sakura) y octubre-noviembre (follaje otoñal) son las épocas más bonitas y concurridas. El verano es muy húmedo y caluroso; el invierno es frío pero seco y con menos turistas.",
    mustSee: {
      title: "Qué ver en Tokio",
      items: [
        { name: "Cruce de Shibuya", description: "El paso de peatones más transitado del mundo, con hasta 3.000 personas cruzando a la vez. Míralo desde el Starbucks del segundo piso del Tsutaya cercano." },
        { name: "Templo Senso-ji en Asakusa", description: "El templo budista más antiguo de Tokio, con la calle comercial Nakamise-dori llena de puestos tradicionales hasta la entrada." },
        { name: "Barrio de Akihabara", description: "El epicentro de la cultura otaku: tiendas de electrónica, manga, anime y videojuegos en varias plantas." },
        { name: "Mercado de Tsukiji (exterior)", description: "Aunque la subasta de pescado se trasladó a Toyosu, la zona exterior de Tsukiji sigue llena de puestos de sushi y marisco fresquísimo para desayunar." },
        { name: "Shinjuku Gyoen", description: "Uno de los jardines más bellos de Tokio, que combina estilos japonés, francés e inglés — un respiro de calma en medio de la ciudad." },
      ],
    },
    food: {
      title: "Gastronomía tokiota",
      items: [
        { name: "Sushi de calidad", description: "Desde puestos de pie económicos hasta restaurantes con estrella Michelin. El desayuno de sushi en Tsukiji es una experiencia imprescindible." },
        { name: "Ramen", description: "Cada barrio tiene su propia tienda de ramen de culto, con colas incluidas. Prueba variantes como el shoyu, miso o tonkotsu." },
        { name: "Izakaya", description: "Los bares-restaurante tradicionales japoneses, perfectos para probar pequeños platos (yakitori, edamame, tempura) acompañados de sake o cerveza." },
        { name: "Konbini (tiendas de conveniencia)", description: "7-Eleven, Lawson y FamilyMart tienen comida de calidad sorprendentemente buena y barata: onigiri, sándwiches y bentos perfectos para cualquier hora." },
      ],
    },
    tips: [
      "Compra una tarjeta IC (Suica o Pasmo) nada más llegar — funciona en metro, tren, bus e incluso en máquinas expendedoras y konbinis.",
      "El JR Pass puede compensar si vas a viajar también a otras ciudades japonesas en tren bala; calcula si te sale rentable antes de comprarlo.",
      "Lleva efectivo: aunque está cambiando, muchos locales pequeños todavía no aceptan tarjeta.",
      "No se dan propinas en Japón — puede considerarse hasta ofensivo insistir en dejarla.",
      "Descarga Google Maps y Google Translate con el japonés offline antes de llegar; muchas señales solo están en japonés fuera del centro.",
    ],
    budget: "Más asequible de lo que se cree: económico 60-80€/día, estándar 110-160€/día. Una comida de ramen cuesta 6-9€ y el transporte urbano es muy eficiente y razonable.",
    gettingThere: "No hay vuelos directos regulares desde España; se vuela con una escala (Ámsterdam, París, Doha, Estambul...) con KLM, Air France, Qatar Airways o Turkish Airlines, en un total de 14-16 horas. Precios desde 650€ ida y vuelta en temporada baja. El aeropuerto de Narita está a 1 hora del centro; Haneda, más cercano, a unos 30 minutos.",
  },
  {
    slug: "estambul",
    destination: "Estambul", country: "Turquía", flag: "🇹🇷",
    intro: "Estambul es la única ciudad del mundo que se extiende sobre dos continentes, separada por el estrecho del Bósforo. Capital de tres imperios (romano, bizantino y otomano), reúne mezquitas monumentales, bazares milenarios y una gastronomía excepcional a precios muy asequibles para el viajero español.",
    bestTime: "Abril-mayo y septiembre-octubre ofrecen el mejor clima (18-25°C) sin el calor sofocante del verano ni las lluvias del invierno. El verano (junio-agosto) es muy caluroso y concentra la mayor afluencia turística.",
    mustSee: {
      title: "Qué ver en Estambul",
      items: [
        { name: "Santa Sofía y Mezquita Azul", description: "Los dos monumentos más icónicos de la ciudad, uno frente al otro en la plaza Sultanahmet. Santa Sofía fue basílica, mezquita y museo antes de volver a ser mezquita." },
        { name: "Gran Bazar", description: "Uno de los mercados cubiertos más grandes y antiguos del mundo, con más de 4.000 tiendas. Regatea siempre — el precio inicial nunca es el real." },
        { name: "Palacio de Topkapi", description: "Residencia de los sultanes otomanos durante casi 400 años, con vistas espectaculares al Bósforo y una colección de joyas imperiales." },
        { name: "Crucero por el Bósforo", description: "La mejor forma de ver ambos continentes y los palacios junto al agua. Hay opciones desde ferries públicos baratos hasta cruceros turísticos privados." },
        { name: "Barrio de Karaköy y Galata", description: "Zona moderna con la Torre de Gálata, galerías de arte, cafés de tercera ola y las mejores vistas del Cuerno de Oro." },
      ],
    },
    food: {
      title: "Gastronomía turca",
      items: [
        { name: "Kebab y döner", description: "Mucho más variado que su versión europea: adana kebab, iskender kebab o şiş kebab, siempre acompañados de pan recién hecho." },
        { name: "Meze", description: "Pequeños platos para compartir (hummus, berenjena ahumada, dolma) típicos antes del plato principal, ideales para probar variedad." },
        { name: "Baklava", description: "El dulce turco por excelencia: capas de pasta filo con nueces o pistachos y almíbar. Karaköy Güllüoğlu es una referencia histórica." },
        { name: "Té turco", description: "Se sirve en pequeños vasos con forma de tulipán durante todo el día, en cualquier tienda o restaurante — rechazar una invitación a té puede considerarse descortés." },
      ],
    },
    tips: [
      "Regatea en el Gran Bazar y el Bazar de las Especias; empieza ofreciendo un 40-50% del precio inicial.",
      "Los ciudadanos españoles necesitan visado electrónico (e-Visa) para entrar, que se solicita online en pocos minutos antes del viaje.",
      "Usa el tranvía T1 para moverte entre los principales monumentos de la zona histórica — es rápido y económico.",
      "Cubre hombros, brazos y piernas para entrar en las mezquitas, y lleva un pañuelo para cubrirte el pelo si eres mujer.",
      "Cambia dinero en oficinas de cambio (döviz) del centro, que suelen ofrecer mejor tipo que los bancos.",
    ],
    budget: "Destino muy económico: viaje económico 35-50€/día, estándar 70-100€/día. Un kebab callejero cuesta 3-5€ y un hotel de 3 estrellas céntrico ronda los 35-50€/noche.",
    gettingThere: "Vuelos directos desde Madrid y Barcelona en unas 4 horas con Turkish Airlines, Pegasus e Iberia, desde 100€ ida y vuelta. El aeropuerto de Estambul (IST) conecta con el centro mediante el metro M11 y autobuses Havaist en unos 40-50 minutos.",
  },
  {
    slug: "marrakech",
    destination: "Marrakech", country: "Marruecos", flag: "🇲🇦",
    intro: "Marrakech, la 'ciudad roja', combina el bullicio de la plaza Jemaa el-Fna, el laberinto de callejuelas de la medina y los jardines de palmeras con las montañas del Atlas nevadas al fondo. A menos de 3 horas de vuelo desde España, ofrece una inmersión cultural completa sin necesidad de un viaje largo.",
    bestTime: "Marzo-mayo y septiembre-noviembre son las mejores épocas: temperaturas agradables (20-28°C) sin el calor extremo del verano, que puede superar los 40°C. El invierno es templado de día pero puede refrescar mucho por la noche.",
    mustSee: {
      title: "Qué ver en Marrakech",
      items: [
        { name: "Jemaa el-Fna", description: "La plaza más famosa de África, con encantadores de serpientes, música tradicional y decenas de puestos de comida al atardecer. Vuelve de noche, se transforma por completo." },
        { name: "Medina y zocos", description: "El laberinto de mercados cubiertos donde se venden especias, cuero, textiles y artesanía. Fácil perderse — parte de la experiencia." },
        { name: "Jardín Majorelle", description: "Jardín botánico de estilo art déco creado por el pintor Jacques Majorelle y restaurado por Yves Saint Laurent, con su icónico azul cobalto." },
        { name: "Palacio de la Bahía", description: "Palacio del siglo XIX con patios decorados con azulejos zellige, techos tallados y jardines interiores." },
        { name: "Excursión a las Montañas del Atlas", description: "A solo una hora de la ciudad, los valles de Ourika o Imlil ofrecen paisajes bereberes y rutas de senderismo de un día." },
      ],
    },
    food: {
      title: "Gastronomía marroquí",
      items: [
        { name: "Tagine", description: "Guiso cocinado lentamente en el recipiente de barro cónico que le da nombre, en versiones de cordero, pollo con limón encurtido o verduras." },
        { name: "Cuscús", description: "Plato tradicional del viernes en muchas familias marroquíes, servido con verduras y carne sobre sémola de trigo al vapor." },
        { name: "Pastilla", description: "Empanada dulce-salada de hojaldre rellena de pichón o pollo, almendras y canela — una combinación de sabores única." },
        { name: "Té de menta", description: "El símbolo de la hospitalidad marroquí, servido en vasos pequeños desde una altura considerable para generar espuma." },
      ],
    },
    tips: [
      "Regatea siempre en los zocos — es parte de la cultura y se espera que lo hagas, empieza por un tercio del precio ofrecido.",
      "Contrata un guía local para la medina si es tu primera visita; es fácil perderse y ayuda a evitar a los 'guías' no oficiales insistentes.",
      "Vístete con moderación fuera de los riads y hoteles, especialmente las mujeres, por respeto cultural.",
      "El viernes muchos comercios cierran a mediodía por la oración semanal.",
      "Aloja en un riad dentro de la medina para una experiencia más auténtica que en los hoteles modernos de la Ville Nouvelle.",
    ],
    budget: "Destino muy económico: viaje económico 30-45€/día, estándar 60-90€/día. Una comida en un restaurante local cuesta 5-8€ y un riad con encanto puede costar desde 30€/noche.",
    gettingThere: "Vuelos directos desde Madrid, Barcelona y otras ciudades españolas en 2-2,5 horas con Ryanair, Vueling e Iberia, desde 40€ ida y vuelta. El aeropuerto Marrakech Menara está a solo 15 minutos del centro en taxi.",
  },
  {
    slug: "buenos-aires",
    destination: "Buenos Aires", country: "Argentina", flag: "🇦🇷",
    intro: "Buenos Aires es la 'París de Sudamérica': avenidas monumentales, arquitectura europea, tango en las milongas de San Telmo y una vida cultural intensísima. Comparte idioma con España, lo que facilita mucho la experiencia, y ofrece uno de los mejores niveles de vida a precios sudamericanos gracias al cambio de divisa.",
    bestTime: "Marzo-mayo (otoño austral) y septiembre-noviembre (primavera) ofrecen el clima más agradable, con temperaturas de 15-25°C. Diciembre-febrero es verano, caluroso y húmedo; junio-agosto es invierno, frío pero sin nieve.",
    mustSee: {
      title: "Qué ver en Buenos Aires",
      items: [
        { name: "Barrio de La Boca y Caminito", description: "El barrio portuario de casas de colores que inspiró a artistas como Quinquela Martín. Ambiente de tango callejero, aunque conviene visitarlo solo de día." },
        { name: "San Telmo", description: "El barrio más antiguo de la ciudad, con calles adoquinadas, anticuarios y la famosa feria dominical a lo largo de la calle Defensa." },
        { name: "Recoleta y su cementerio", description: "El cementerio más elegante de Sudamérica, con mausoleos monumentales, entre ellos el de Eva Perón. El barrio circundante es el más exclusivo de la ciudad." },
        { name: "Teatro Colón", description: "Uno de los teatros de ópera con mejor acústica del mundo. Las visitas guiadas recorren la sala principal, los talleres y los salones." },
        { name: "Puerto Madero", description: "El barrio más moderno de la ciudad, con rascacielos, el Puente de la Mujer y un paseo junto al río muy popular al atardecer." },
      ],
    },
    food: {
      title: "Gastronomía porteña",
      items: [
        { name: "Asado", description: "Mucho más que una barbacoa: es un ritual social. Prueba el asado de tira, el vacío o el bife de chorizo en una parrilla tradicional." },
        { name: "Empanadas", description: "Cada región argentina tiene su variante; en Buenos Aires son habituales las de carne, jamón y queso, o humita, siempre horneadas o fritas." },
        { name: "Alfajores", description: "Dos galletas rellenas de dulce de leche, a menudo bañadas en chocolate. Havanna es la marca más conocida, pero las versiones artesanales son aún mejores." },
        { name: "Mate", description: "Más una costumbre social que una bebida: los porteños lo comparten en grupo con bombilla, y verlo en parques y plazas es parte del paisaje cotidiano." },
      ],
    },
    tips: [
      "Lleva dólares o euros en efectivo — el cambio informal ('dólar blue') suele ser mucho mejor que el oficial, aunque conviene informarse de la situación actual antes de viajar.",
      "San Telmo y La Boca son seguros de día pero conviene tener cuidado por la noche; pregunta en tu alojamiento por las zonas a evitar.",
      "El subte (metro) es la forma más rápida de moverse, aunque no cubre toda la ciudad — combínalo con taxis o apps de transporte.",
      "Las propinas (10%) no son obligatorias pero sí habituales en restaurantes.",
      "Reserva entradas para una milonga de tango con antelación si quieres ver un espectáculo de calidad en San Telmo o Puerto Madero.",
    ],
    budget: "Con el cambio de divisa favorable, es un destino muy económico: viaje económico 30-45€/día, estándar 60-100€/día. Un asado completo en una parrilla puede costar 12-18€.",
    gettingThere: "Vuelos directos desde Madrid en unas 12-13 horas con Iberia, Aerolíneas Argentinas y Air Europa, desde 600€ ida y vuelta en temporada baja. El aeropuerto de Ezeiza está a unos 40 minutos del centro en autobús o remís (taxi privado).",
  },
  {
    slug: "sidney",
    destination: "Sídney", country: "Australia", flag: "🇦🇺",
    intro: "Sídney combina una de las bahías más bellas del mundo con playas urbanas de nivel mundial, como Bondi Beach, a solo minutos del centro. La Ópera y el puente del puerto son iconos reconocibles al instante, pero la ciudad ofrece mucho más: barrios multiculturales, senderos costeros espectaculares y una calidad de vida excepcional.",
    bestTime: "Marzo-mayo (otoño austral) y septiembre-noviembre (primavera) ofrecen clima templado sin las temperaturas extremas del verano. Diciembre-febrero es verano, caluroso y con más aglomeraciones en las playas; junio-agosto es invierno suave, raramente por debajo de los 10°C.",
    mustSee: {
      title: "Qué ver en Sídney",
      items: [
        { name: "Ópera de Sídney y Circular Quay", description: "El edificio más fotografiado de Australia. Puedes hacer una visita guiada por dentro o simplemente disfrutar las vistas desde los jardines botánicos cercanos." },
        { name: "Puente de la Bahía (Harbour Bridge)", description: "Cruza a pie de forma gratuita o contrata el BridgeClimb para escalar hasta la cima con vistas de 360° sobre toda la ciudad." },
        { name: "Bondi a Coogee coastal walk", description: "Sendero costero de 6 km entre acantilados y playas, con Bondi Beach como punto de partida — uno de los paseos urbanos más bonitos del mundo." },
        { name: "The Rocks", description: "El barrio histórico más antiguo de la ciudad, con calles empedradas, mercados de fin de semana y las mejores vistas del puente." },
        { name: "Taronga Zoo", description: "Zoo con vistas espectaculares a la bahía y el skyline, accesible en un corto trayecto en ferry desde Circular Quay." },
      ],
    },
    food: {
      title: "Gastronomía en Sídney",
      items: [
        { name: "Brunch australiano", description: "Sídney es cuna de la cultura del brunch: aguacate en tostada, huevos benedictinos y café de especialidad de primer nivel en cualquier barrio." },
        { name: "Marisco fresco", description: "Los mercados de pescado de Sídney (Sydney Fish Market) ofrecen ostras, gambas y pescado fresquísimo a precios razonables para comer junto al agua." },
        { name: "Meat pie", description: "El pastel de carne australiano, un tentempié callejero clásico que se encuentra en cualquier panadería o kiosco." },
        { name: "Cocina asiática", description: "Gracias a su diversidad, Sídney tiene una escena de cocina asiática excepcional, especialmente en barrios como Chinatown y Cabramatta." },
      ],
    },
    tips: [
      "Los ciudadanos españoles necesitan visado electrónico (eVisitor) antes de viajar, gratuito y fácil de tramitar online.",
      "El sol australiano es muy fuerte incluso en días nublados — usa protector solar aunque no lo parezca necesario.",
      "La tarjeta Opal cubre trenes, buses y ferris, y tiene un tope diario de gasto que la hace muy rentable para varios trayectos.",
      "Las playas tienen banderas de seguridad y socorristas — nada siempre entre ellas, las corrientes pueden ser peligrosas.",
      "Al ser en el hemisferio sur, las estaciones están invertidas: diciembre es verano y julio es invierno.",
    ],
    budget: "Destino caro: económico 90-110€/día, estándar 150-200€/día. El transporte y la comida fuera son más caros que en Europa; los brunchs rondan los 15-20€.",
    gettingThere: "No hay vuelos directos desde España; se vuela con una o dos escalas (Dubái, Singapur, Doha...) con Emirates, Qatar Airways o Singapore Airlines, en un total de 22-26 horas de viaje. Precios desde 900€ ida y vuelta en temporada baja. El aeropuerto Kingsford Smith está a solo 8 km del centro, conectado por tren en 13 minutos.",
  },
];

export function getGuideBySlug(slug: string): DestinationGuide | undefined {
  return STATIC_GUIDES.find((g) => g.slug === slug);
}
