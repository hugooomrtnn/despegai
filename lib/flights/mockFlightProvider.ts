import type { FlightResult, ParsedTravelRequest, DestinationRecommendation } from "@/types/travel";
import type { FlightProvider } from "./types";
import { buildRecommendationReason } from "./scoreFlight";
import { roundPrice } from "@/lib/data/destinationMeta";

const AIRLINES = [
  "Vueling", "Ryanair", "Iberia Express", "EasyJet", "Wizz Air",
  "Iberia", "Air Europa", "Transavia", "Volotea", "Norwegian",
  "British Airways", "Lufthansa", "Air France", "KLM",
  "EgyptAir", "Emirates", "Qatar Airways", "Turkish Airlines",
  "Ethiopian Airlines", "Kenya Airways", "Etihad Airways",
  "Singapore Airlines", "Cathay Pacific", "Korean Air",
  "Japan Airlines", "Air Canada", "Delta", "United Airlines",
  "LATAM Airlines", "Avianca", "Air New Zealand", "Qantas",
];

// ─── Catálogo completo de destinos ──────────────────────────────────────────
export const DESTINATIONS_CATALOG: DestinationRecommendation[] = [
  // España – nacional
  {
    city: "Palma de Mallorca", country: "España", airportCode: "PMI",
    reason: "Playa de calidad a un paso, vuelos muy baratos y sin necesidad de pasaporte.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "party"], matchScore: 91,
  },
  {
    city: "Ibiza", country: "España", airportCode: "IBZ",
    reason: "La isla más vibrante del Mediterráneo con playas espectaculares.",
    estimatedPriceLevel: "medium", tags: ["beach", "party", "relax"], matchScore: 86,
  },
  {
    city: "Menorca", country: "España", airportCode: "MAH",
    reason: "La joya tranquila de las Baleares, calas vírgenes sin masificación.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "nature"], matchScore: 84,
  },
  {
    city: "Tenerife", country: "España", airportCode: "TFS",
    reason: "Clima perfecto todo el año, volcán Teide y playas negras únicas.",
    estimatedPriceLevel: "low", tags: ["beach", "nature", "relax"], matchScore: 88,
  },
  {
    city: "Gran Canaria", country: "España", airportCode: "LPA",
    reason: "Dunas de Maspalomas y playas kilométricas con sol garantizado.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "nature"], matchScore: 87,
  },
  {
    city: "Lanzarote", country: "España", airportCode: "ACE",
    reason: "Paisajes volcánicos únicos, playas doradas y excelente gastronomía.",
    estimatedPriceLevel: "low", tags: ["beach", "nature", "culture"], matchScore: 85,
  },
  {
    city: "Fuerteventura", country: "España", airportCode: "FUE",
    reason: "Las mejores playas de España, paraíso del surf y el windsurf.",
    estimatedPriceLevel: "low", tags: ["beach", "adventure", "relax"], matchScore: 83,
  },
  {
    city: "Málaga", country: "España", airportCode: "AGP",
    reason: "Costa del Sol accesible, playa garantizada y ambiente andaluz único.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "culture"], matchScore: 88,
  },
  {
    city: "Sevilla", country: "España", airportCode: "SVQ",
    reason: "La ciudad más vibrante de Andalucía, flamenco, tapas y Semana Santa.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy"], matchScore: 86,
  },
  {
    city: "Granada", country: "España", airportCode: "GRX",
    reason: "La Alhambra, tapas gratis y Sierra Nevada a media hora.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 85,
  },
  {
    city: "Santiago de Compostela", country: "España", airportCode: "SCQ",
    reason: "Ciudad mística, Catedral impresionante y gastronomía gallega sin igual.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "relax"], matchScore: 83,
  },
  {
    city: "Oviedo (Asturias)", country: "España", airportCode: "OVD",
    reason: "El paraíso natural de España: sidra, fabada, Picos de Europa y costa verde.",
    estimatedPriceLevel: "low", tags: ["nature", "relax", "culture", "gastronomy"], matchScore: 84,
  },
  {
    city: "Santander", country: "España", airportCode: "SDR",
    reason: "Cantabria verde, playas del Sardinero y arquitectura modernista.",
    estimatedPriceLevel: "low", tags: ["beach", "nature", "relax"], matchScore: 81,
  },
  {
    city: "San Sebastián", country: "España", airportCode: "EAS",
    reason: "La mejor gastronomía del mundo por metro cuadrado, playas urbanas únicas.",
    estimatedPriceLevel: "medium", tags: ["city", "gastronomy", "beach", "culture"], matchScore: 90,
  },
  {
    city: "Bilbao", country: "España", airportCode: "BIO",
    reason: "Guggenheim, pintxos y una ciudad reinventada que enamora.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 85,
  },

  // Portugal
  {
    city: "Lisboa", country: "Portugal", airportCode: "LIS",
    reason: "A 2h de Madrid, ciudad encantadora con precios muy asequibles y buena gastronomía.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy"], matchScore: 92,
  },
  {
    city: "Oporto", country: "Portugal", airportCode: "OPO",
    reason: "Ciudad costera con viñedos, arquitectura única y vuelos directos muy baratos.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "beach"], matchScore: 88,
  },
  {
    city: "Faro", country: "Portugal", airportCode: "FAO",
    reason: "Puerta del Algarve, playas doradas y precio de vida bajísimo.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "nature"], matchScore: 85,
  },

  // Marruecos
  {
    city: "Marrakech", country: "Marruecos", airportCode: "RAK",
    reason: "Destino exótico a precio europeo, mercados únicos y clima cálido.",
    estimatedPriceLevel: "low", tags: ["adventure", "culture", "exotic"], matchScore: 85,
  },
  {
    city: "Casablanca", country: "Marruecos", airportCode: "CMN",
    reason: "La ciudad cosmopolita de Marruecos, mezcla fascinante de culturas.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "exotic"], matchScore: 78,
  },

  // Europa – ciudades
  {
    city: "Budapest", country: "Hungría", airportCode: "BUD",
    reason: "Una de las ciudades más bonitas de Europa con precios muy por debajo de la media.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "party"], matchScore: 87,
  },
  {
    city: "Praga", country: "República Checa", airportCode: "PRG",
    reason: "Ciudad histórica con precios bajos y una oferta cultural extraordinaria.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 84,
  },
  {
    city: "Cracovia", country: "Polonia", airportCode: "KRK",
    reason: "Joya medieval de Europa del Este, muy económica y llena de historia.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 82,
  },
  {
    city: "Varsovia", country: "Polonia", airportCode: "WAW",
    reason: "Capital polaca moderna y dinámica, excelente gastronomía a bajo coste.",
    estimatedPriceLevel: "low", tags: ["city", "culture"], matchScore: 79,
  },
  {
    city: "Dubrovnik", country: "Croacia", airportCode: "DBV",
    reason: "La joya del Adriático, muros medievales y mar cristalino.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "history"], matchScore: 88,
  },
  {
    city: "Split", country: "Croacia", airportCode: "SPU",
    reason: "Palacio de Diocleciano y playas croatas impresionantes.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "history"], matchScore: 86,
  },
  {
    city: "Roma", country: "Italia", airportCode: "FCO",
    reason: "La Ciudad Eterna con vuelos económicos desde muchas ciudades españolas.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history", "gastronomy"], matchScore: 89,
  },
  {
    city: "Milán", country: "Italia", airportCode: "MXP",
    reason: "Capital de la moda y el diseño con conexiones frecuentes y económicas.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "shopping"], matchScore: 82,
  },
  {
    city: "Venecia", country: "Italia", airportCode: "VCE",
    reason: "Única en el mundo, canales y góndolas en una ciudad flotante.",
    estimatedPriceLevel: "medium", tags: ["city", "romantic", "culture"], matchScore: 87,
  },
  {
    city: "Florencia", country: "Italia", airportCode: "FLR",
    reason: "Cuna del Renacimiento, arte y gastronomía toscana inigualable.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "romantic"], matchScore: 88,
  },
  {
    city: "Nápoles", country: "Italia", airportCode: "NAP",
    reason: "La pizza original, el Vesubio y la auténtica Italia del sur.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy"], matchScore: 83,
  },
  {
    city: "Cagliari", country: "Italia", airportCode: "CAG",
    reason: "Cerdeña sin masificación, playas paradisíacas y precios razonables.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "nature"], matchScore: 80,
  },
  {
    city: "Palermo", country: "Italia", airportCode: "PMO",
    reason: "Sicilia auténtica, historia griega y árabe, gastronomía explosiva.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy", "beach"], matchScore: 81,
  },
  {
    city: "Bruselas", country: "Bélgica", airportCode: "BRU",
    reason: "Capital de Europa con museos, chocolate y cervezas artesanas únicas.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 79,
  },
  {
    city: "Ámsterdam", country: "Países Bajos", airportCode: "AMS",
    reason: "Ciudad de canales, museos y vida nocturna con vuelos directos frecuentes.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "party"], matchScore: 85,
  },
  {
    city: "Berlín", country: "Alemania", airportCode: "BER",
    reason: "La capital más cool de Europa, historia, arte urbano y vida nocturna.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "party"], matchScore: 86,
  },
  {
    city: "Múnich", country: "Alemania", airportCode: "MUC",
    reason: "La capital bávara, Oktoberfest, museos de clase mundial y los Alpes al alcance.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 84,
  },
  {
    city: "Frankfurt", country: "Alemania", airportCode: "FRA",
    reason: "Hub financiero europeo, museos del Meno y puerta a la región del Rin.",
    estimatedPriceLevel: "medium", tags: ["city", "culture"], matchScore: 78,
  },
  {
    city: "Hamburgo", country: "Alemania", airportCode: "HAM",
    reason: "La ciudad portuaria más grande de Alemania, Elbphilharmonie y barrio Speicherstadt.",
    estimatedPriceLevel: "medium", tags: ["city", "culture"], matchScore: 80,
  },
  {
    city: "París", country: "Francia", airportCode: "CDG",
    reason: "La ciudad más romántica del mundo, accesible en vuelo directo.",
    estimatedPriceLevel: "medium", tags: ["city", "romantic", "culture", "gastronomy"], matchScore: 87,
  },
  {
    city: "Niza", country: "Francia", airportCode: "NCE",
    reason: "Costa Azul francesa: glamour, sol mediterráneo y Mónaco a un paso.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "city"], matchScore: 84,
  },
  {
    city: "Lyon", country: "Francia", airportCode: "LYS",
    reason: "Capital gastronómica de Francia, bouchons, mercados y arquitectura romana.",
    estimatedPriceLevel: "medium", tags: ["city", "gastronomy", "culture"], matchScore: 80,
  },
  {
    city: "Marsella", country: "Francia", airportCode: "MRS",
    reason: "Puerto mediterráneo auténtico, Calanques y bouillabaisse original.",
    estimatedPriceLevel: "low", tags: ["city", "beach", "culture"], matchScore: 78,
  },
  {
    city: "Viena", country: "Austria", airportCode: "VIE",
    reason: "La ciudad imperial de los cafés, la ópera y el arte clásico.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "romantic"], matchScore: 85,
  },
  {
    city: "Dublín", country: "Irlanda", airportCode: "DUB",
    reason: "Pubs históricos, música en directo y la isla esmeralda esperando.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "party"], matchScore: 80,
  },
  {
    city: "Edimburgo", country: "Reino Unido", airportCode: "EDI",
    reason: "El castillo más dramático de Europa, whisky y Highlands cercanos.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure"], matchScore: 82,
  },
  {
    city: "Londres", country: "Reino Unido", airportCode: "LHR",
    reason: "La metrópolis cultural del mundo, museos gratuitos y vida cosmopolita.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "shopping"], matchScore: 86,
  },
  {
    city: "Manchester", country: "Reino Unido", airportCode: "MAN",
    reason: "Ciudad musical, fútbol y cultura del norte de Inglaterra con vuelos directos.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "party"], matchScore: 76,
  },
  {
    city: "Glasgow", country: "Reino Unido", airportCode: "GLA",
    reason: "La ciudad más vibrante de Escocia, whisky y arquitectura victoriana.",
    estimatedPriceLevel: "medium", tags: ["city", "culture"], matchScore: 74,
  },
  {
    city: "Estambul", country: "Turquía", airportCode: "IST",
    reason: "Puente entre Europa y Asia, mezquitas impresionantes y bazar histórico.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "exotic", "gastronomy"], matchScore: 87,
  },
  {
    city: "Antalya", country: "Turquía", airportCode: "AYT",
    reason: "Turquía de sol y playa, todo incluido muy económico.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "culture"], matchScore: 82,
  },
  {
    city: "Bodrum", country: "Turquía", airportCode: "BJV",
    reason: "La Riviera turca: casco antiguo medieval, playas exclusivas y ambiente cosmopolita.",
    estimatedPriceLevel: "medium", tags: ["beach", "relax", "city"], matchScore: 80,
  },
  {
    city: "Izmir", country: "Turquía", airportCode: "ADB",
    reason: "Ciudad costera vibrante, Éfeso a 70 km y gastronomía del Egeo turco.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "beach"], matchScore: 78,
  },
  {
    city: "Malta", country: "Malta", airportCode: "MLA",
    reason: "Isla mediterránea poco masificada, aguas cristalinas y rica historia.",
    estimatedPriceLevel: "low", tags: ["beach", "culture", "relax"], matchScore: 83,
  },
  {
    city: "Atenas", country: "Grecia", airportCode: "ATH",
    reason: "Cuna de la civilización occidental con playas cercanas y gastronomía increíble.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "history"], matchScore: 88,
  },
  {
    city: "Santorini", country: "Grecia", airportCode: "JTR",
    reason: "Las casas blancas más instagrameadas del mundo y atardeceres épicos.",
    estimatedPriceLevel: "high", tags: ["beach", "romantic", "relax"], matchScore: 90,
  },
  {
    city: "Mykonos", country: "Grecia", airportCode: "JMK",
    reason: "La isla del party chic de Europa, playas exclusivas y ambiente único.",
    estimatedPriceLevel: "high", tags: ["beach", "party"], matchScore: 85,
  },
  {
    city: "Creta", country: "Grecia", airportCode: "HER",
    reason: "La isla más grande de Grecia, historia minoica y playas increíbles.",
    estimatedPriceLevel: "low", tags: ["beach", "culture", "relax"], matchScore: 86,
  },
  {
    city: "Copenhague", country: "Dinamarca", airportCode: "CPH",
    reason: "La capital más feliz del mundo, diseño escandinavo y New Nordic cuisine.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy"], matchScore: 82,
  },
  {
    city: "Estocolmo", country: "Suecia", airportCode: "ARN",
    reason: "Ciudad sobre islas, ABBA Museum y la mejor gastronomía nórdica.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "nature"], matchScore: 81,
  },

  // Egipto
  {
    city: "El Cairo", country: "Egipto", airportCode: "CAI",
    reason: "El río Nilo, las pirámides de Giza y el Museo Egipcio en una sola ciudad. Historia milenaria al alcance.",
    estimatedPriceLevel: "medium", tags: ["culture", "history", "adventure"], matchScore: 90,
  },
  {
    city: "Hurghada", country: "Egipto", airportCode: "HRG",
    reason: "Mar Rojo cristalino, arrecifes de coral y resorts todo incluido a buen precio.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "adventure"], matchScore: 87,
  },
  {
    city: "Sharm el-Sheij", country: "Egipto", airportCode: "SSH",
    reason: "Snorkel y buceo de primer nivel en el Mar Rojo, sol garantizado.",
    estimatedPriceLevel: "low", tags: ["beach", "adventure", "relax"], matchScore: 85,
  },
  {
    city: "Luxor", country: "Egipto", airportCode: "LXR",
    reason: "La ciudad museo al aire libre más grande del mundo. Karnak, Valle de los Reyes.",
    estimatedPriceLevel: "low", tags: ["culture", "history"], matchScore: 88,
  },
  // Oriente Medio
  {
    city: "Doha", country: "Catar", airportCode: "DOH",
    reason: "La perla del Golfo Pérsico, museos de clase mundial y lujo a precio competitivo.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "adventure"], matchScore: 82,
  },
  {
    city: "Tel Aviv", country: "Israel", airportCode: "TLV",
    reason: "Ciudad vibrante junto al mar, gastronomía excepcional e historia milenaria.",
    estimatedPriceLevel: "high", tags: ["city", "beach", "culture"], matchScore: 83,
  },
  {
    city: "Amán", country: "Jordania", airportCode: "AMM",
    reason: "Petra, Wadi Rum y el Mar Muerto en un mismo viaje. Joya oculta de Oriente Medio.",
    estimatedPriceLevel: "medium", tags: ["culture", "history", "adventure"], matchScore: 86,
  },
  // África popular
  {
    city: "Nairobi", country: "Kenia", airportCode: "NBO",
    reason: "Safari en el Masái Mara, leopardos, leones y elefantes en su hábitat natural.",
    estimatedPriceLevel: "high", tags: ["adventure", "nature"], matchScore: 89,
  },
  {
    city: "Zanzíbar", country: "Tanzania", airportCode: "ZNZ",
    reason: "Playas blancas perfectas, ciudad histórica de Stone Town y aguas turquesa.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "relax"], matchScore: 88,
  },
  {
    city: "Túnez", country: "Túnez", airportCode: "TUN",
    reason: "Mediterráneo africano a precio muy bajo, medinas, ruinas romanas y playas.",
    estimatedPriceLevel: "low", tags: ["culture", "beach", "history"], matchScore: 82,
  },
  {
    city: "Ciudad del Cabo", country: "Sudáfrica", airportCode: "CPT",
    reason: "Table Mountain, vinos de Stellenbosch y el encuentro de dos océanos.",
    estimatedPriceLevel: "medium", tags: ["city", "nature", "adventure"], matchScore: 87,
  },
  // Asia popular
  {
    city: "Seúl", country: "Corea del Sur", airportCode: "ICN",
    reason: "K-pop, gastronomía coreana, palacios históricos y tecnología de vanguardia.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 87,
  },
  {
    city: "Kuala Lumpur", country: "Malasia", airportCode: "KUL",
    reason: "Torres Petronas, gastronomía multicultural y hub perfecto para Sudeste Asiático.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure"], matchScore: 82,
  },
  {
    city: "Pekín", country: "China", airportCode: "PEK",
    reason: "La Gran Muralla, la Ciudad Prohibida y el Temple of Heaven en una misma ciudad.",
    estimatedPriceLevel: "medium", tags: ["culture", "history", "city"], matchScore: 88,
  },
  {
    city: "Shanghái", country: "China", airportCode: "PVG",
    reason: "El horizonte más futurista del mundo, gastronomía y mezcla de culturas única.",
    estimatedPriceLevel: "medium", tags: ["city", "culture"], matchScore: 84,
  },
  {
    city: "Siem Reap", country: "Camboya", airportCode: "REP",
    reason: "Angkor Wat, uno de los templos más impresionantes del mundo. Precio de vida muy bajo.",
    estimatedPriceLevel: "low", tags: ["culture", "history", "adventure"], matchScore: 86,
  },
  {
    city: "Katmandú", country: "Nepal", airportCode: "KTM",
    reason: "Puerta del Himalaya, trekking al Everest y templos budistas únicos.",
    estimatedPriceLevel: "low", tags: ["adventure", "culture", "nature"], matchScore: 87,
  },
  {
    city: "Colombo", country: "Sri Lanka", airportCode: "CMB",
    reason: "Isla tropical con playas, templos budistas, té de Ceilán y fauna salvaje.",
    estimatedPriceLevel: "low", tags: ["beach", "culture", "nature"], matchScore: 84,
  },
  // América
  {
    city: "Lima", country: "Perú", airportCode: "LIM",
    reason: "Gastronomía top mundial, puerta a Machu Picchu y el lago Titicaca.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy", "adventure"], matchScore: 88,
  },
  {
    city: "Punta Cana", country: "República Dominicana", airportCode: "PUJ",
    reason: "Playas de arena blanca y aguas turquesa. Caribe accesible con todo incluido.",
    estimatedPriceLevel: "medium", tags: ["beach", "relax", "party"], matchScore: 87,
  },
  {
    city: "Toronto", country: "Canadá", airportCode: "YYZ",
    reason: "Ciudad multicultural con Niagara Falls a una hora y una escena gastronómica increíble.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "nature"], matchScore: 82,
  },
  // Oceanía
  {
    city: "Sídney", country: "Australia", airportCode: "SYD",
    reason: "Opera House, Bondi Beach y la Gran Barrera de Coral al alcance. Destino icónico.",
    estimatedPriceLevel: "high", tags: ["city", "beach", "adventure", "nature"], matchScore: 90,
  },

  // Largo radio
  {
    city: "Tokio", country: "Japón", airportCode: "NRT",
    reason: "La metrópolis del futuro, única en cultura, gastronomía y tecnología.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "adventure", "exotic"], matchScore: 94,
  },
  {
    city: "Osaka", country: "Japón", airportCode: "KIX",
    reason: "La capital gastronómica de Japón, más auténtica y accesible que Tokio.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy", "exotic"], matchScore: 90,
  },
  {
    city: "Hong Kong", country: "China", airportCode: "HKG",
    reason: "Skyline espectacular, dim sum increíble y mezcla única de culturas.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy"], matchScore: 87,
  },
  {
    city: "Bangkok", country: "Tailandia", airportCode: "BKK",
    reason: "Ciudad vibrante con templos, mercados nocturnos y precio de vida muy bajo.",
    estimatedPriceLevel: "medium", tags: ["adventure", "culture", "exotic", "beach"], matchScore: 88,
  },
  {
    city: "Bali", country: "Indonesia", airportCode: "DPS",
    reason: "El paraíso espiritual: arrozales, templos y playas de ensueño.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "relax", "adventure"], matchScore: 89,
  },
  {
    city: "Dubái", country: "Emiratos Árabes", airportCode: "DXB",
    reason: "Lujo extremo, desierto y rascacielos en el cruce del mundo.",
    estimatedPriceLevel: "high", tags: ["city", "adventure", "exotic"], matchScore: 84,
  },
  {
    city: "Nueva York", country: "Estados Unidos", airportCode: "JFK",
    reason: "La ciudad que nunca duerme, Broadway, Central Park y la Estatua de la Libertad.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "adventure"], matchScore: 91,
  },
  {
    city: "Miami", country: "Estados Unidos", airportCode: "MIA",
    reason: "Playas de South Beach, vida nocturna latina y clima tropical todo el año.",
    estimatedPriceLevel: "high", tags: ["beach", "party", "city"], matchScore: 86,
  },
  {
    city: "Los Ángeles", country: "Estados Unidos", airportCode: "LAX",
    reason: "Hollywood, Venice Beach y la capital del entretenimiento mundial.",
    estimatedPriceLevel: "high", tags: ["city", "beach", "culture"], matchScore: 84,
  },
  {
    city: "Cancún", country: "México", airportCode: "CUN",
    reason: "El Caribe mexicano: playas turquesa, ruinas mayas y todo incluido.",
    estimatedPriceLevel: "high", tags: ["beach", "culture", "party"], matchScore: 87,
  },
  {
    city: "Ciudad de México", country: "México", airportCode: "MEX",
    reason: "Megalópolis con gastronomía top mundial, museos y arquitectura azteca.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 84,
  },

  // España – nacional adicional
  {
    city: "Valencia", country: "España", airportCode: "VLC",
    reason: "La paella original, Ciudad de las Artes y las Ciencias, 300 días de sol y playa a 20 minutos.",
    estimatedPriceLevel: "low", tags: ["city", "beach", "gastronomy", "culture"], matchScore: 87,
  },
  {
    city: "Alicante", country: "España", airportCode: "ALC",
    reason: "Costa Blanca soleada, Castillo de Santa Bárbara y vuelos muy baratos desde toda España.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "city"], matchScore: 83,
  },
  {
    city: "Zaragoza", country: "España", airportCode: "ZAZ",
    reason: "La Basílica del Pilar, gastronomía aragonesa única y posición estratégica en el centro de España.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy"], matchScore: 78,
  },
  {
    city: "Murcia", country: "España", airportCode: "RMU",
    reason: "La huerta de Europa, gastronomía excepcional con el mejor pisto y el Mar Menor a un paso.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy", "beach"], matchScore: 76,
  },
  {
    city: "Vigo", country: "España", airportCode: "VGO",
    reason: "Ría de Vigo, el mejor marisco de España y la costa más atlántica del país.",
    estimatedPriceLevel: "low", tags: ["city", "gastronomy", "nature", "beach"], matchScore: 79,
  },
  {
    city: "A Coruña", country: "España", airportCode: "LCG",
    reason: "Torre de Hércules, Paseo Marítimo y la gastronomía gallega más auténtica frente al Atlántico.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy", "beach"], matchScore: 77,
  },
  {
    city: "Valladolid", country: "España", airportCode: "VLL",
    reason: "Capital del vino castellano, Semana Santa de Interés Internacional y patrimonio renacentista único.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy"], matchScore: 75,
  },

  // Alemania adicional
  {
    city: "Düsseldorf", country: "Alemania", airportCode: "DUS",
    reason: "Capital de la moda alemana, Altstadt con más bares por km² de Europa y arquitectura vanguardista.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "party"], matchScore: 79,
  },
  {
    city: "Stuttgart", country: "Alemania", airportCode: "STR",
    reason: "Cuna de Mercedes y Porsche, viñedos en plena ciudad y acceso a la Selva Negra.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "nature"], matchScore: 76,
  },
  {
    city: "Colonia", country: "Alemania", airportCode: "CGN",
    reason: "La catedral gótica más impresionante de Alemania y el Carnaval más famoso del país.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history", "party"], matchScore: 78,
  },

  // Países Nórdicos adicionales
  {
    city: "Oslo", country: "Noruega", airportCode: "OSL",
    reason: "Fiordos a un paso, Museo Vikingo y la capital más dinámica de Escandinavia.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "nature", "adventure"], matchScore: 84,
  },
  {
    city: "Helsinki", country: "Finlandia", airportCode: "HEL",
    reason: "Diseño escandinavo, saunas en la orilla del mar y la puerta perfecta hacia la aurora boreal.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "nature"], matchScore: 80,
  },
  {
    city: "Bergen", country: "Noruega", airportCode: "BGO",
    reason: "Puerta de los fiordos noruegos, Bryggen Patrimonio UNESCO y naturaleza de escala épica.",
    estimatedPriceLevel: "high", tags: ["nature", "adventure", "culture"], matchScore: 83,
  },

  // Países Bálticos
  {
    city: "Riga", country: "Letonia", airportCode: "RIX",
    reason: "La capital del Art Nouveau de Europa, muy económica, bohemia y llena de vida nocturna.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history", "party"], matchScore: 80,
  },
  {
    city: "Tallin", country: "Estonia", airportCode: "TLL",
    reason: "Ciudad medieval perfectamente conservada, digitalizada e inesperadamente animada.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 81,
  },
  {
    city: "Vilna", country: "Lituania", airportCode: "VNO",
    reason: "Casco antiguo Patrimonio UNESCO, murales de arte urbano y precio de vida de los más bajos de Europa.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 78,
  },

  // Balcanes y Europa del Este adicional
  {
    city: "Liubliana", country: "Eslovenia", airportCode: "LJU",
    reason: "La capital más verde de Europa, castillo en la colina y puerta al lago Bled y los Alpes.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "nature", "relax"], matchScore: 82,
  },
  {
    city: "Sofía", country: "Bulgaria", airportCode: "SOF",
    reason: "La capital más barata de Europa, mezquitas, iglesias ortodoxas y la montaña Vitosha de fondo.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 77,
  },
  {
    city: "Bucarest", country: "Rumanía", airportCode: "OTP",
    reason: "El París del Este, palacios enormes y los Cárpatos con castillos de Drácula a un paso.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history", "adventure"], matchScore: 78,
  },
  {
    city: "Zadar", country: "Croacia", airportCode: "ZAD",
    reason: "Ciudad romana junto al Adriático, el único órgano de mar del mundo y archipiélago increíble.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "history", "relax"], matchScore: 83,
  },

  // Grecia adicional
  {
    city: "Rodas", country: "Grecia", airportCode: "RHO",
    reason: "Ciudad medieval amurallada Patrimonio UNESCO, Palacio de los Caballeros y playas turquesa del Egeo.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "history"], matchScore: 86,
  },
  {
    city: "Corfú", country: "Grecia", airportCode: "CFU",
    reason: "La isla más verde de Grecia, costa interminable, esplendor veneciano y aguas cristalinas.",
    estimatedPriceLevel: "medium", tags: ["beach", "nature", "relax", "culture"], matchScore: 84,
  },
  {
    city: "Tesalónica", country: "Grecia", airportCode: "SKG",
    reason: "La segunda ciudad griega, capital gastronómica del país, historia romana y ambiente universitario.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy", "history"], matchScore: 80,
  },
  {
    city: "Chania", country: "Grecia", airportCode: "CHQ",
    reason: "La perla de Creta, puerto veneciano espectacular y acceso a las playas de Balos y Elafonisi.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "relax", "history"], matchScore: 85,
  },

  // Islandia y Suiza
  {
    city: "Reikiavik", country: "Islandia", airportCode: "KEF",
    reason: "Aurora boreal garantizada en invierno, géiseres, cascadas, termas Blue Lagoon y naturaleza pura.",
    estimatedPriceLevel: "high", tags: ["nature", "adventure", "relax"], matchScore: 90,
  },
  {
    city: "Zúrich", country: "Suiza", airportCode: "ZRH",
    reason: "Lagos alpinos, calidad de vida inigualable, chocolate y acceso directo a los Alpes suizos.",
    estimatedPriceLevel: "high", tags: ["city", "nature", "culture"], matchScore: 81,
  },
  {
    city: "Ginebra", country: "Suiza", airportCode: "GVA",
    reason: "Lago Lemán, surtidor de agua icónico, Alpes suizos y la ciudad más internacional del planeta.",
    estimatedPriceLevel: "high", tags: ["city", "nature", "culture"], matchScore: 80,
  },

  // Cáucaso
  {
    city: "Tiflis", country: "Georgia", airportCode: "TBS",
    reason: "El destino secreto del momento: arquitectura única, vino natural ancestral y gastronomía increíble a precio muy bajo.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy", "adventure"], matchScore: 87,
  },
  {
    city: "Ereván", country: "Armenia", airportCode: "EVN",
    reason: "La ciudad rosa, brandy armenio premiado, lago Sevan y el Monte Ararat de fondo.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history", "gastronomy"], matchScore: 82,
  },
  {
    city: "Bakú", country: "Azerbaiyán", airportCode: "GYD",
    reason: "Modernidad extrema junto a una ciudad medieval amurallada, llamas eternas y el Mar Caspio.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure", "exotic"], matchScore: 80,
  },

  // India
  {
    city: "Delhi", country: "India", airportCode: "DEL",
    reason: "La Puerta de India, el Taj Mahal a 3h, historia mogola y una gastronomía explosiva sin igual.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history", "exotic"], matchScore: 88,
  },
  {
    city: "Mumbai", country: "India", airportCode: "BOM",
    reason: "La ciudad de Bollywood, mercados caóticos, costa del Mar Arábigo y gastronomía india de primer nivel.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "exotic"], matchScore: 84,
  },
  {
    city: "Goa", country: "India", airportCode: "GOI",
    reason: "Las playas tropicales de la India, herencia portuguesa única, ambiente relajado y cocina de fusión.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "culture", "exotic"], matchScore: 85,
  },

  // Vietnam
  {
    city: "Hanói", country: "Vietnam", airportCode: "HAN",
    reason: "Capital milenaria, Bahía de Halong a 3 horas, gastronomía con el pho más auténtico y precio de vida ínfimo.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure", "exotic"], matchScore: 87,
  },
  {
    city: "Ho Chi Minh", country: "Vietnam", airportCode: "SGN",
    reason: "La Saigón vibrante, mercados nocturnos, Delta del Mekong y gastronomía callejera excepcional.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "exotic", "adventure"], matchScore: 85,
  },

  // Resto Asia
  {
    city: "Singapur", country: "Singapur", airportCode: "SIN",
    reason: "El hub del mundo: Marina Bay Sands, Gardens by the Bay y gastronomía multicultural sin igual en hawker centres.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy", "exotic"], matchScore: 91,
  },
  {
    city: "Manila", country: "Filipinas", airportCode: "MNL",
    reason: "Puerta a 7.000 islas: playas paradisíacas de Palawan y Boracay al alcance de un vuelo doméstico.",
    estimatedPriceLevel: "medium", tags: ["beach", "adventure", "culture", "nature"], matchScore: 83,
  },
  {
    city: "Taipéi", country: "Taiwán", airportCode: "TPE",
    reason: "Rascacielos y templos milenarios, dim sum de madrugada en los night markets y el icónico Taipei 101.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy", "exotic"], matchScore: 85,
  },
  {
    city: "Phnom Penh", country: "Camboya", airportCode: "PNH",
    reason: "Capital que renació de las cenizas, Palacio Real fascinante, precio de vida muy bajo.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history", "adventure"], matchScore: 79,
  },
  {
    city: "Rangún", country: "Myanmar", airportCode: "RGN",
    reason: "La Shwedagon Pagoda dorada, budismo vivo en cada calle y un destino aún virgen al turismo masivo.",
    estimatedPriceLevel: "low", tags: ["culture", "history", "adventure", "exotic"], matchScore: 80,
  },

  // Oriente Medio adicional
  {
    city: "Mascate", country: "Omán", airportCode: "MCT",
    reason: "El Oriente Medio más auténtico y seguro: desierto Wahiba, fiordos de Musandam y palacios impresionantes.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure", "nature"], matchScore: 83,
  },
  {
    city: "Beirut", country: "Líbano", airportCode: "BEY",
    reason: "La París del Medio Oriente: gastronomía libanesa excepcional, vida nocturna legendaria e historia.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy", "party"], matchScore: 78,
  },
  {
    city: "Kuwait City", country: "Kuwait", airportCode: "KWI",
    reason: "Ciudad moderna en el desierto, souks tradicionales, dhow harbor y hospitalidad árabe genuina.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "exotic"], matchScore: 72,
  },
  {
    city: "Manama", country: "Baréin", airportCode: "BAH",
    reason: "El Baréin cosmopolita, Grand Prix de F1, Mezquita Al-Fateh y mezcla única de tradición y modernidad.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "adventure"], matchScore: 74,
  },

  // África adicional
  {
    city: "Johannesburgo", country: "Sudáfrica", airportCode: "JNB",
    reason: "Puerta al Parque Kruger, historia del apartheid en Soweto y vibrante escena gastronómica y cultural.",
    estimatedPriceLevel: "medium", tags: ["city", "adventure", "nature", "culture"], matchScore: 83,
  },
  {
    city: "Dar es Salaam", country: "Tanzania", airportCode: "DAR",
    reason: "Puerta al Serengueti, el Kilimanjaro y Zanzíbar, con cultura swahili vibrante y mercados únicos.",
    estimatedPriceLevel: "medium", tags: ["adventure", "nature", "culture", "beach"], matchScore: 82,
  },
  {
    city: "Adís Abeba", country: "Etiopía", airportCode: "ADD",
    reason: "El corazón de África: café en su tierra de origen, iglesias de Lalibela y el Gran Valle del Rift.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure", "history"], matchScore: 79,
  },
  {
    city: "Djerba", country: "Túnez", airportCode: "DJE",
    reason: "La isla mágica de Túnez: playas blancas increíbles, medinas coloridas y precio muy asequible.",
    estimatedPriceLevel: "low", tags: ["beach", "culture", "relax", "history"], matchScore: 81,
  },
  {
    city: "Argel", country: "Argelia", airportCode: "ALG",
    reason: "La ciudad blanca del Mediterráneo africano, casbah histórica y mezcla fascinante arabo-francesa.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 72,
  },
  {
    city: "Acra", country: "Ghana", airportCode: "ACC",
    reason: "La capital del África Occidental, playas, música highlife y rica historia colonial.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "beach", "adventure"], matchScore: 74,
  },
  {
    city: "Dakar", country: "Senegal", airportCode: "DKR",
    reason: "El ritmo del África Occidental, música mbalax en vivo, Isla de Gorée y playas atlánticas.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "beach", "history"], matchScore: 76,
  },
  {
    city: "Mauricio", country: "Mauricio", airportCode: "MRU",
    reason: "Paraíso tropical del Índico: playas de arena blanca, lagunas turquesa y snorkel de primer nivel.",
    estimatedPriceLevel: "high", tags: ["beach", "relax", "nature"], matchScore: 89,
  },
  {
    city: "Victoria", country: "Seychelles", airportCode: "SEZ",
    reason: "Las islas más espectaculares del mundo, rocas de granito únicas en lugar de coral y fauna endémica.",
    estimatedPriceLevel: "high", tags: ["beach", "relax", "nature"], matchScore: 88,
  },

  // Caribe adicional
  {
    city: "La Habana", country: "Cuba", airportCode: "HAV",
    reason: "Coches de los años 50, salsa en cada esquina, ron, puros y la ciudad más fotogénica del Caribe.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "exotic", "beach", "party"], matchScore: 89,
  },
  {
    city: "Santo Domingo", country: "República Dominicana", airportCode: "SDQ",
    reason: "Primera ciudad fundada en el Nuevo Mundo, zona colonial Patrimonio UNESCO y playas caribeñas.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "beach", "history"], matchScore: 80,
  },
  {
    city: "Montego Bay", country: "Jamaica", airportCode: "MBJ",
    reason: "Jamaica auténtica: reggae en directo, Dunn's River Falls y playas de arena blanca exóticas.",
    estimatedPriceLevel: "medium", tags: ["beach", "relax", "culture", "party"], matchScore: 82,
  },
  {
    city: "San Juan", country: "Puerto Rico", airportCode: "SJU",
    reason: "El Caribe con acento latino: Old San Juan amurallado, playas paradisíacas y gastronomía boricua.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "city", "history"], matchScore: 83,
  },
  {
    city: "Nassau", country: "Bahamas", airportCode: "NAS",
    reason: "Las Bahamas accesibles: aguas cristalinas, cerdos nadadores y paraíso del buceo caribeño.",
    estimatedPriceLevel: "high", tags: ["beach", "relax", "adventure"], matchScore: 84,
  },
  {
    city: "Bridgetown", country: "Barbados", airportCode: "BGI",
    reason: "La joya del Caribe inglés: Ron, cricket, playas de surf y la aristocracia isleña de las Antillas.",
    estimatedPriceLevel: "high", tags: ["beach", "relax", "culture"], matchScore: 80,
  },

  // Sudamérica
  {
    city: "Buenos Aires", country: "Argentina", airportCode: "EZE",
    reason: "La París del sur: tango en las milongas, asados, fútbol y una metrópolis con alma profundamente europea.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy", "party"], matchScore: 90,
  },
  {
    city: "Río de Janeiro", country: "Brasil", airportCode: "GIG",
    reason: "Cristo Redentor, Copacabana e Ipanema, Carnaval legendario y la naturaleza más exuberante del mundo.",
    estimatedPriceLevel: "medium", tags: ["city", "beach", "culture", "party", "nature"], matchScore: 91,
  },
  {
    city: "São Paulo", country: "Brasil", airportCode: "GRU",
    reason: "La megametrópolis de América del Sur, gastronomía de clase mundial y escena cultural y artística única.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 84,
  },
  {
    city: "Santiago de Chile", country: "Chile", airportCode: "SCL",
    reason: "Capital andina con la cordillera de fondo, vinos excepcionales y puerta a la Patagonia chilena.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure", "nature"], matchScore: 85,
  },
  {
    city: "Bogotá", country: "Colombia", airportCode: "BOG",
    reason: "La capital de la eterna primavera, café de origen excepcional, arte urbano y transformación increíble.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure", "gastronomy"], matchScore: 82,
  },
  {
    city: "Quito", country: "Ecuador", airportCode: "UIO",
    reason: "Capital Patrimonio UNESCO en la mitad del mundo, volcanes nevados y puerta a las Islas Galápagos.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure", "nature"], matchScore: 83,
  },
  {
    city: "Montevideo", country: "Uruguay", airportCode: "MVD",
    reason: "La ciudad más tranquila de América, Rambla costera, tango auténtico y altísima calidad de vida.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "relax", "beach"], matchScore: 79,
  },
  {
    city: "Asunción", country: "Paraguay", airportCode: "ASU",
    reason: "La capital más antigua de Sudamérica, hospitalidad sin igual y el guaraní en estado puro.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 70,
  },
  {
    city: "La Paz", country: "Bolivia", airportCode: "LPB",
    reason: "La capital más alta del mundo, mercado de las brujas, lago Titicaca y el Salar de Uyuni cercano.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure", "nature"], matchScore: 80,
  },
  {
    city: "Caracas", country: "Venezuela", airportCode: "CCS",
    reason: "El Ávila sobre la ciudad, playas del Caribe a 1 hora y la cultura venezolana más auténtica.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure"], matchScore: 68,
  },

  // Centroamérica
  {
    city: "San José", country: "Costa Rica", airportCode: "SJO",
    reason: "Puerta a la pura vida costarricense: selvas, volcanes activos, monos y biodiversidad sin igual.",
    estimatedPriceLevel: "medium", tags: ["nature", "adventure", "relax"], matchScore: 84,
  },
  {
    city: "Ciudad de Panamá", country: "Panamá", airportCode: "PTY",
    reason: "El Canal de Panamá, hub aéreo de Latinoamérica y rascacielos modernos junto a selva tropical.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure", "nature"], matchScore: 79,
  },
  {
    city: "Ciudad de Guatemala", country: "Guatemala", airportCode: "GUA",
    reason: "Volcanes, Antigua colonial UNESCO, lago Atitlán y la cultura maya más viva del continente.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure", "history"], matchScore: 78,
  },

  // Norteamérica adicional
  {
    city: "Chicago", country: "Estados Unidos", airportCode: "ORD",
    reason: "La Ciudad del Viento: arquitectura más icónica de América, blues, jazz y gastronomía excepcional.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy", "adventure"], matchScore: 83,
  },
  {
    city: "Vancouver", country: "Canadá", airportCode: "YVR",
    reason: "La ciudad más bella de Norteamérica: montañas nevadas, océano Pacífico y rica cultura asiática.",
    estimatedPriceLevel: "high", tags: ["city", "nature", "adventure", "culture"], matchScore: 85,
  },
  {
    city: "Montreal", country: "Canadá", airportCode: "YUL",
    reason: "La ciudad más francesa fuera de Francia: jazz en cada esquina, gastronomía y Old Montreal encantador.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy", "party"], matchScore: 83,
  },

  // Oceanía adicional
  {
    city: "Melbourne", country: "Australia", airportCode: "MEL",
    reason: "La capital cultural de Australia: café de especialidad, street art, Gran Premio de F1 y vida cosmopolita.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy", "adventure"], matchScore: 88,
  },
  {
    city: "Auckland", country: "Nueva Zelanda", airportCode: "AKL",
    reason: "La Ciudad de las Velas, puerta a los fiordos y a los paisajes épicos de El Señor de los Anillos.",
    estimatedPriceLevel: "high", tags: ["city", "nature", "adventure"], matchScore: 87,
  },
  {
    city: "Nadi", country: "Fiyi", airportCode: "NAN",
    reason: "Paraíso del Pacífico Sur: arrecifes de coral vírgenes, overwater bungalows y la hospitalidad bula.",
    estimatedPriceLevel: "high", tags: ["beach", "relax", "nature"], matchScore: 88,
  },

  // ─── España adicional ────────────────────────────────────────────────────────
  {
    city: "Reus / Costa Daurada", country: "España", airportCode: "REU",
    reason: "Puerta a la Costa Daurada, Port Aventura a 10 min y Tarragona romana a 15 km.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "culture"], matchScore: 78,
  },
  {
    city: "Girona / Costa Brava", country: "España", airportCode: "GRO",
    reason: "La Costa Brava más auténtica, calas escondidas y la Girona medieval de Juego de Tronos.",
    estimatedPriceLevel: "low", tags: ["beach", "culture", "nature"], matchScore: 80,
  },
  {
    city: "Almería", country: "España", airportCode: "LEI",
    reason: "El secreto mejor guardado de Andalucía: Cabo de Gata virgen, Tabernas y 3.000 horas de sol.",
    estimatedPriceLevel: "low", tags: ["beach", "nature", "relax"], matchScore: 79,
  },
  {
    city: "Jerez de la Frontera", country: "España", airportCode: "XRY",
    reason: "Cuna del flamenco, del sherry y del caballo español. La Andalucía más pura.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy"], matchScore: 77,
  },

  // ─── Portugal adicional ──────────────────────────────────────────────────────
  {
    city: "Funchal", country: "Portugal (Madeira)", airportCode: "FNC",
    reason: "La isla eterna de la primavera: levadas, poncha, picos volcánicos y flores en cada esquina.",
    estimatedPriceLevel: "low", tags: ["nature", "relax", "culture", "adventure"], matchScore: 88,
  },
  {
    city: "Ponta Delgada", country: "Portugal (Azores)", airportCode: "PDL",
    reason: "Isla de São Miguel: calderas volcánicas, aguas termales naturales y un paisaje de otro planeta.",
    estimatedPriceLevel: "medium", tags: ["nature", "adventure", "relax"], matchScore: 87,
  },

  // ─── Marruecos adicional ─────────────────────────────────────────────────────
  {
    city: "Agadir", country: "Marruecos", airportCode: "AGA",
    reason: "El Marruecos de sol y playa: 300 días soleados, surf y resort a precio muy bajo.",
    estimatedPriceLevel: "low", tags: ["beach", "relax", "culture"], matchScore: 83,
  },
  {
    city: "Fez", country: "Marruecos", airportCode: "FEZ",
    reason: "La medina medieval mejor conservada del mundo, artesanía única y gastronomía marroquí auténtica.",
    estimatedPriceLevel: "low", tags: ["culture", "history", "exotic"], matchScore: 84,
  },
  {
    city: "Tánger", country: "Marruecos", airportCode: "TNG",
    reason: "Puerta de África a solo 35 km de España, kasbah histórica y mezcla de culturas única.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 79,
  },

  // ─── Italia adicional ────────────────────────────────────────────────────────
  {
    city: "Turín", country: "Italia", airportCode: "TRN",
    reason: "La capital del Piamonte: Mole Antonelliana, chocolate y trufas, y los Alpes nevados de fondo.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 82,
  },
  {
    city: "Bolonia", country: "Italia", airportCode: "BLQ",
    reason: "La ciudad universitaria más antigua de Europa, la mejor gastronomía de Italia y porticados únicos.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 84,
  },
  {
    city: "Catania", country: "Italia", airportCode: "CTA",
    reason: "Puerta al Etna, la Sicilia más auténtica, barrio barroco y granitas de limón incomparables.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure", "beach"], matchScore: 83,
  },
  {
    city: "Bari", country: "Italia", airportCode: "BRI",
    reason: "La Puglia en estado puro: orecchiette, trulli de Alberobello y el Adriático cristalino.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "gastronomy", "beach"], matchScore: 82,
  },
  {
    city: "Verona", country: "Italia", airportCode: "VRN",
    reason: "La ciudad de Romeo y Julieta, arena romana perfecta y la entrada al lago di Garda.",
    estimatedPriceLevel: "medium", tags: ["city", "romantic", "culture", "history"], matchScore: 83,
  },
  {
    city: "Bérgamo", country: "Italia", airportCode: "BGY",
    reason: "Ciudad alta medieval impresionante, vuelos low cost muy baratos y Milán a 45 minutos.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 80,
  },
  {
    city: "Pisa", country: "Italia", airportCode: "PSA",
    reason: "La Torre, claro, pero también la Toscana a tiro de piedra: Lucca, Florencia, costa etrusca.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 79,
  },
  {
    city: "Brindisi", country: "Italia", airportCode: "BDS",
    reason: "Puerta del Mediterráneo, Puglia auténtica, trulli y el sabor del sur de Italia.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "beach"], matchScore: 77,
  },
  {
    city: "Lamezia Terme", country: "Italia", airportCode: "SUF",
    reason: "Puerta a Calabria y Costa de los Dioses: playas de arena blanca entre montañas y mar cristalino.",
    estimatedPriceLevel: "low", tags: ["beach", "nature", "relax"], matchScore: 76,
  },
  {
    city: "Trapani", country: "Italia", airportCode: "TPS",
    reason: "La Sicilia más barata y salvaje: Erice medieval, las Egadi y sal rosada en las salinas.",
    estimatedPriceLevel: "low", tags: ["beach", "culture", "nature", "history"], matchScore: 78,
  },
  {
    city: "Trieste", country: "Italia", airportCode: "TRS",
    reason: "Ciudad de café y literatura, antigua capital del Imperio, frontera entre Italia y los Balcanes.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history"], matchScore: 77,
  },
  {
    city: "Ancona", country: "Italia", airportCode: "AOI",
    reason: "Puerta a Las Marcas: playas del Adriático, Urbino renacentista y Frasassi entre montañas.",
    estimatedPriceLevel: "low", tags: ["beach", "culture", "nature"], matchScore: 74,
  },

  // ─── Francia adicional ───────────────────────────────────────────────────────
  {
    city: "Burdeos", country: "Francia", airportCode: "BOD",
    reason: "La capital mundial del vino: chateaux, dunes de Pilat y la más elegante arquitectura clásica.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 83,
  },
  {
    city: "Toulouse", country: "Francia", airportCode: "TLS",
    reason: "La ciudad rosa, Airbus, el Canal du Midi y puerta a los Pirineos y Carcassonne medieval.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "adventure"], matchScore: 80,
  },
  {
    city: "Nantes", country: "Francia", airportCode: "NTE",
    reason: "Ciudad de arte contemporáneo, Château des ducs y puerta al Valle del Loira Patrimonio UNESCO.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history"], matchScore: 78,
  },
  {
    city: "Montpellier", country: "Francia", airportCode: "MPL",
    reason: "Ciudad universitaria mediterránea, playa a 15 min, Camargue y Languedoc a un paso.",
    estimatedPriceLevel: "medium", tags: ["city", "beach", "culture"], matchScore: 79,
  },
  {
    city: "Estrasburgo", country: "Francia", airportCode: "SXB",
    reason: "La capital de Europa, catedral impresionante, casas alsacianas de cuento y Navidad mágica.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history"], matchScore: 80,
  },

  // ─── Alemania adicional ──────────────────────────────────────────────────────
  {
    city: "Dresde", country: "Alemania", airportCode: "DRS",
    reason: "El Florencia del Elba: Frauenkirche reconstruida, ópera barroca y la Sajonia más bella.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history"], matchScore: 80,
  },
  {
    city: "Núremberg", country: "Alemania", airportCode: "NUE",
    reason: "Ciudad imperial medieval, lebkuchen, el Mercado de Navidad más famoso de Alemania.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history"], matchScore: 78,
  },
  {
    city: "Bremen", country: "Alemania", airportCode: "BRE",
    reason: "Ayuntamiento Patrimonio UNESCO, los músicos de Bremen y el barrio Böttcherstrasse Art Nouveau.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "history"], matchScore: 75,
  },
  {
    city: "Leipzig", country: "Alemania", airportCode: "LEJ",
    reason: "La ciudad de Bach, escena musical y artística vibrante y precios muy por debajo de Berlín.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "party"], matchScore: 77,
  },

  // ─── Reino Unido adicional ───────────────────────────────────────────────────
  {
    city: "Bristol", country: "Reino Unido", airportCode: "BRS",
    reason: "Arte de Banksy en cada pared, Clifton Suspension Bridge y la escena musical más viva de UK.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "party"], matchScore: 78,
  },
  {
    city: "Birmingham", country: "Reino Unido", airportCode: "BHX",
    reason: "Segunda ciudad de UK, gastronomía del balti, Cadbury World y los Peaky Blinders.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "gastronomy"], matchScore: 74,
  },
  {
    city: "Newcastle", country: "Reino Unido", airportCode: "NCL",
    reason: "Geordie Shore, Millennium Bridge, Hadrian's Wall y la noche más famosa del norte de Inglaterra.",
    estimatedPriceLevel: "medium", tags: ["city", "culture", "party"], matchScore: 73,
  },

  // ─── Grecia – islas adicionales ──────────────────────────────────────────────
  {
    city: "Kos", country: "Grecia", airportCode: "KGS",
    reason: "Isla de Hipócrates, vuelos low cost desde España, playas perfectas y ambiente joven y festivo.",
    estimatedPriceLevel: "low", tags: ["beach", "party", "culture", "relax"], matchScore: 83,
  },
  {
    city: "Zakynthos", country: "Grecia", airportCode: "ZTH",
    reason: "Navagio Shipwreck Beach, la playa más fotografiada de Grecia, aguas turquesa de ensueño.",
    estimatedPriceLevel: "medium", tags: ["beach", "nature", "relax"], matchScore: 85,
  },
  {
    city: "Cefalonia", country: "Grecia", airportCode: "EFL",
    reason: "La isla más salvaje del Jónico, playas de Myrtos y Antisamos de película.",
    estimatedPriceLevel: "medium", tags: ["beach", "nature", "relax"], matchScore: 83,
  },
  {
    city: "Skiathos", country: "Grecia", airportCode: "JSI",
    reason: "La isla más verde de las Espóradas: 60 playas, pinos hasta el mar y Koukounaries entre las mejores de Europa.",
    estimatedPriceLevel: "medium", tags: ["beach", "relax", "nature"], matchScore: 82,
  },

  // ─── Europa del Este adicional ───────────────────────────────────────────────
  {
    city: "Belgrado", country: "Serbia", airportCode: "BEG",
    reason: "La capital europea con la noche más larga: clubs en barcazas, precios ínfimos y alma balcánica.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "party", "history"], matchScore: 82,
  },
  {
    city: "Zagreb", country: "Croacia", airportCode: "ZAG",
    reason: "La capital croata más auténtica: mercado Dolac, café terraza y puerta a los Lagos de Plitvice.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "nature"], matchScore: 80,
  },
  {
    city: "Bratislava", country: "Eslovaquia", airportCode: "BTS",
    reason: "La capital más pequeña de la UE, casco antiguo encantador y Viena a solo 60 km.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 77,
  },
  {
    city: "Wrocław", country: "Polonia", airportCode: "WRO",
    reason: "La ciudad de los gnomos: islas unidas por puentes, arquitectura gótica y vida nocturna increíble.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "party", "history"], matchScore: 80,
  },
  {
    city: "Gdansk", country: "Polonia", airportCode: "GDN",
    reason: "Ciudad hanseática en el Báltico, Solidarność, ámbar y un casco antiguo perfectamente restaurado.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history", "beach"], matchScore: 79,
  },
  {
    city: "Sarajevo", country: "Bosnia y Herzegovina", airportCode: "SJJ",
    reason: "La Jerusalén de Europa: mezquitas, iglesias y sinagogas en la misma calle. Historia impactante.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history", "adventure"], matchScore: 80,
  },
  {
    city: "Skopje", country: "Macedonia del Norte", airportCode: "SKP",
    reason: "Capital extravagante, estatuas por todas partes, bazar otomano vivo y precio de vida bajísimo.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "history"], matchScore: 73,
  },
  {
    city: "Tirana", country: "Albania", airportCode: "TIA",
    reason: "El último destino auténtico de Europa: montañas, playas vírgenes y hospitalidad sin igual.",
    estimatedPriceLevel: "low", tags: ["city", "culture", "adventure", "beach"], matchScore: 76,
  },
  {
    city: "Tivat", country: "Montenegro", airportCode: "TIV",
    reason: "Bahía de Kotor, Porto Montenegro, Adriático cristalino y la pequeña costa más bella de los Balcanes.",
    estimatedPriceLevel: "medium", tags: ["beach", "nature", "culture", "relax"], matchScore: 83,
  },
  {
    city: "Podgorica", country: "Montenegro", airportCode: "TGD",
    reason: "Puerta al lago Shkodër, el cañón del Tara y la naturaleza más salvaje de los Balcanes.",
    estimatedPriceLevel: "low", tags: ["city", "adventure", "nature"], matchScore: 72,
  },

  // ─── Chipre ──────────────────────────────────────────────────────────────────
  {
    city: "Lárnaca", country: "Chipre", airportCode: "LCA",
    reason: "Isla mediterránea con 340 días de sol, playas azul turquesa y una rica mezcla de culturas.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "relax", "history"], matchScore: 84,
  },
  {
    city: "Pafos", country: "Chipre", airportCode: "PFO",
    reason: "Tierra natal de Afrodita, mosaicos romanos Patrimonio UNESCO y playas exclusivas del oeste.",
    estimatedPriceLevel: "medium", tags: ["beach", "culture", "history", "relax"], matchScore: 83,
  },

  // ─── Turquía costera adicional ───────────────────────────────────────────────
  {
    city: "Dalaman / Costa Turquesa", country: "Turquía", airportCode: "DLM",
    reason: "Ölüdeniz, la Laguna Azul más famosa del Mediterráneo, Fethiye y ruinas licio bajo el mar.",
    estimatedPriceLevel: "low", tags: ["beach", "adventure", "nature", "culture"], matchScore: 86,
  },

  // ─── Países Nórdicos adicional ───────────────────────────────────────────────
  {
    city: "Gotemburgo", country: "Suecia", airportCode: "GOT",
    reason: "La ciudad más cool de Suecia: Liseberg, canales, marisco fresco y arquitectura escandinava.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "gastronomy", "nature"], matchScore: 78,
  },
  {
    city: "Tromsø", country: "Noruega", airportCode: "TOS",
    reason: "La capital mundial de la aurora boreal: ballenas, perros de trineo y el Ártico al alcance.",
    estimatedPriceLevel: "high", tags: ["nature", "adventure", "relax"], matchScore: 88,
  },
  {
    city: "Aarhus", country: "Dinamarca", airportCode: "AAR",
    reason: "La ciudad más joven de Dinamarca, ARoS Kunstmuseum y arquitectura nordicade primera.",
    estimatedPriceLevel: "high", tags: ["city", "culture"], matchScore: 74,
  },
];

// ─── Tabla de duración en minutos desde España (aprox.) ─────────────────────
export const FLIGHT_DURATIONS: Record<string, number> = {
  // Nacional
  PMI: 55, IBZ: 60, MAH: 65, TFS: 170, LPA: 165, ACE: 175, FUE: 180,
  AGP: 70, SVQ: 75, GRX: 80, SCQ: 90, OVD: 85, SDR: 80, EAS: 65,
  BIO: 60, VGO: 80, LCG: 90,
  VLC: 60, ALC: 55, ZAZ: 55, RMU: 65, VLL: 55,
  REU: 80, GRO: 75, LEI: 70, XRY: 70,
  // Portugal
  LIS: 75, OPO: 80, FAO: 80, FNC: 190, PDL: 210,
  // Marruecos
  RAK: 180, CMN: 170, AGA: 175, FEZ: 175, TNG: 155,
  // Europa próxima
  CDG: 140, NCE: 130, LYS: 145, MRS: 130, BOD: 120, TLS: 125, NTE: 135, MPL: 120, SXB: 160,
  MXP: 140, FCO: 155, VCE: 155, FLR: 160, NAP: 155, CAG: 90, PMO: 115,
  TRN: 140, BLQ: 155, CTA: 125, BRI: 130, VRN: 155, BGY: 140, PSA: 150,
  BDS: 130, SUF: 120, TPS: 110, TRS: 160, AOI: 150,
  BRU: 160, AMS: 155,
  BER: 175, MUC: 170, FRA: 175, HAM: 185, DUS: 175, STR: 170, CGN: 170,
  DRS: 185, NUE: 175, BRE: 185, LEJ: 180,
  VIE: 175, PRG: 185, BUD: 175,
  LHR: 155, MAN: 160, EDI: 175, DUB: 165, GLA: 180, BRS: 165, BHX: 160, NCL: 175,
  ATH: 220, MLA: 200,
  KRK: 185, WAW: 190, IST: 205, AYT: 215, ADB: 215, BJV: 210,
  BEG: 185, ZAG: 165, BTS: 175, WRO: 185, GDN: 195, SJJ: 190, SKP: 205, TIA: 195,
  TIV: 195, TGD: 200,
  DBV: 195, SPU: 195, ZAD: 190, JTR: 220, JMK: 215, HER: 230, RHO: 210, CFU: 200,
  SKG: 210, CHQ: 235, KGS: 210, ZTH: 215, EFL: 205, JSI: 215,
  LCA: 220, PFO: 220, DLM: 215,
  CPH: 195, ARN: 205, OSL: 210, HEL: 225, BGO: 210, GOT: 190, TOS: 230, AAR: 185,
  LJU: 170, SOF: 195, OTP: 200, KIV: 210,
  RIX: 220, TLL: 230, VNO: 215, ZRH: 155, GVA: 150, KEF: 250,
  // Largo radio - Asia
  NRT: 720, BKK: 660, DPS: 750, DXB: 360, JFK: 480, CUN: 600, SIN: 720,
  KIX: 720, PEK: 660, PVG: 670, HKG: 680, ICN: 700, MNL: 720, KUL: 720,
  REP: 700, PNH: 710, RGN: 700, KTM: 600, CMB: 640, TPE: 700,
  GYD: 290, TBS: 300, EVN: 290, TAS: 420, ALA: 420,
  DEL: 660, BOM: 660, GOI: 680, HAN: 660, SGN: 660,
  // Oriente Medio
  CAI: 360, HRG: 360, SSH: 370, LXR: 400, ASW: 420,
  AMM: 330, TLV: 340, DOH: 400, MCT: 440, KWI: 390,
  BAH: 400, RUH: 420, BEY: 340, IKA: 420, BGW: 390,
  // África
  CPT: 660, JNB: 620, NBO: 540, ZNZ: 570, DAR: 560,
  ADD: 540, TUN: 180, DJE: 190, ALG: 170, ACC: 540,
  LOS: 600, DKR: 360, MRU: 720, SEZ: 720, RUN: 720,
  TNR: 660, MPM: 630, LAD: 600,
  // América
  LIM: 660, SCL: 780, UIO: 680, SJO: 660, PTY: 630,
  SDQ: 540, PUJ: 540, MBJ: 550, SJU: 540, BGI: 570,
  NAS: 540, CCS: 580, MVD: 780, ASU: 700, LPB: 680,
  GUA: 590, YYZ: 490, YVR: 600, YUL: 500,
  MIA: 490, LAX: 610, ORD: 530,
  HAV: 600, BOG: 660, EZE: 780, GIG: 800, GRU: 780,
  // Oceanía
  SYD: 1080, MEL: 1090, AKL: 1200, NAN: 1150,
};

// ─── Precios base por distancia ──────────────────────────────────────────────
export function getFlightBasePrice(airportCode: string, priceLevel: "low" | "medium" | "high"): number {
  const duration = FLIGHT_DURATIONS[airportCode] || 120;
  // Base según duración (más lejos = más caro) + nivel de precio del destino
  const distanceFactor = duration < 100 ? 35 : duration < 200 ? 55 : duration < 300 ? 90 : duration < 500 ? 180 : 380;
  const priceMult = priceLevel === "low" ? 0.8 : priceLevel === "medium" ? 1.0 : 1.4;
  return distanceFactor * priceMult;
}

// ─── Información de aeropuertos de origen ───────────────────────────────────
const ORIGIN_INFO: Record<string, { code: string; city: string }> = {
  // España
  "Madrid": { code: "MAD", city: "Madrid" },
  "Barcelona": { code: "BCN", city: "Barcelona" },
  "Valencia": { code: "VLC", city: "Valencia" },
  "Sevilla": { code: "SVQ", city: "Sevilla" },
  "Bilbao": { code: "BIO", city: "Bilbao" },
  "Málaga": { code: "AGP", city: "Málaga" },
  "Alicante": { code: "ALC", city: "Alicante" },
  "Zaragoza": { code: "ZAZ", city: "Zaragoza" },
  "Granada": { code: "GRX", city: "Granada" },
  "Pamplona": { code: "PNA", city: "Pamplona" },
  "Santander": { code: "SDR", city: "Santander" },
  "San Sebastián": { code: "EAS", city: "San Sebastián" },
  "Palma": { code: "PMI", city: "Palma de Mallorca" },
  "Tenerife": { code: "TFS", city: "Tenerife" },
  "Murcia": { code: "RMU", city: "Murcia" },
  "Vigo": { code: "VGO", city: "Vigo" },
  "Oviedo": { code: "OVD", city: "Oviedo" },
  "A Coruña": { code: "LCG", city: "A Coruña" },
  "Ibiza": { code: "IBZ", city: "Ibiza" },
  "Valladolid": { code: "VLL", city: "Valladolid" },
  // Otros países de origen habituales
  "Lisboa": { code: "LIS", city: "Lisboa" },
  "Oporto": { code: "OPO", city: "Oporto" },
  "París": { code: "CDG", city: "París" },
  "Londres": { code: "LHR", city: "Londres" },
  "Roma": { code: "FCO", city: "Roma" },
  "Berlín": { code: "BER", city: "Berlín" },
  "Ámsterdam": { code: "AMS", city: "Ámsterdam" },
  "Bruselas": { code: "BRU", city: "Bruselas" },
  "Estambul": { code: "IST", city: "Estambul" },
  "Dubái": { code: "DXB", city: "Dubái" },
  "Buenos Aires": { code: "EZE", city: "Buenos Aires" },
  "Lima": { code: "LIM", city: "Lima" },
  "Bogotá": { code: "BOG", city: "Bogotá" },
  "Ciudad de México": { code: "MEX", city: "Ciudad de México" },
};

function getOriginInfo(origin: string): { code: string; city: string } {
  const key = Object.keys(ORIGIN_INFO).find((k) =>
    origin.toLowerCase().includes(k.toLowerCase())
  );
  return key ? ORIGIN_INFO[key] : { code: "MAD", city: origin };
}

function addMinutes(baseDate: Date, minutes: number): string {
  return new Date(baseDate.getTime() + minutes * 60_000).toISOString();
}

function randomHour(min = 6, max = 21): number {
  return min + Math.floor(Math.random() * (max - min));
}

function generateDepartureDate(request: ParsedTravelRequest): Date {
  const now = new Date();
  const base = new Date(now);

  if (request.departureDate) {
    const parsed = new Date(request.departureDate);
    if (!isNaN(parsed.getTime()) && parsed > now) {
      // Scatter around the target month (±7 days)
      parsed.setDate(parsed.getDate() + Math.floor(Math.random() * 14 - 7));
      if (parsed > now) {
        parsed.setHours(randomHour(), Math.floor(Math.random() * 60), 0, 0);
        return parsed;
      }
    }
  }

  // No date: within next 2 months
  base.setDate(base.getDate() + 7 + Math.floor(Math.random() * 45));
  base.setHours(randomHour(), Math.floor(Math.random() * 60), 0, 0);
  return base;
}

// ─── Crear entrada sintética para destino no catalogado ─────────────────────
function buildSyntheticDestination(
  destinationName: string,
  airportCode: string
): DestinationRecommendation {
  const duration = FLIGHT_DURATIONS[airportCode] ?? 180;
  const priceLevel: "low" | "medium" | "high" =
    duration < 200 ? "low" : duration < 500 ? "medium" : "high";
  return {
    city: destinationName,
    country: "",
    airportCode,
    reason: `Vuelos disponibles a ${destinationName}.`,
    estimatedPriceLevel: priceLevel,
    tags: ["relax", "culture", "adventure"],
    matchScore: 80,
  };
}

// ─── Generación de vuelos ────────────────────────────────────────────────────
function generateFlightsForDestination(
  dest: DestinationRecommendation,
  origin: { code: string; city: string },
  request: ParsedTravelRequest,
  count: number
): FlightResult[] {
  const flights: FlightResult[] = [];
  const baseDuration = FLIGHT_DURATIONS[dest.airportCode] ?? 120;
  const basePrice = getFlightBasePrice(dest.airportCode, dest.estimatedPriceLevel);

  for (let i = 0; i < count; i++) {
    const departureDate = generateDepartureDate(request);
    // Vary duration slightly
    const durationVariance = Math.floor(Math.random() * 20 - 10);
    const rawDuration = baseDuration + durationVariance;

    // Direct or 1 stop
    const isLongHaul = rawDuration > 360;
    const stopChance = isLongHaul ? 0.7 : i === 0 ? 0.2 : 0.5;
    const stops = Math.random() < stopChance ? 1 : 0;
    const durationMinutes = stops > 0 ? rawDuration + 85 + Math.floor(Math.random() * 50) : rawDuration;

    // La opción más barata coincide siempre con el precio mostrado en /destinos y /chollos
    const anchorPrice = roundPrice(basePrice);
    const price = i === 0 ? anchorPrice : Math.round(anchorPrice * (1.05 + Math.random() * 0.35));

    const arrivalDate = addMinutes(departureDate, durationMinutes);
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];

    let returnDepartureTime: string | undefined;
    let returnArrivalTime: string | undefined;
    if (request.durationDays || request.returnDate) {
      const days = request.durationDays ?? 4;
      const returnBase = new Date(departureDate.getTime() + days * 24 * 60 * 60 * 1000);
      returnBase.setHours(randomHour(8, 20), Math.floor(Math.random() * 60), 0, 0);
      returnDepartureTime = returnBase.toISOString();
      returnArrivalTime = addMinutes(returnBase, durationMinutes);
    }

    flights.push({
      id: `mock-${dest.airportCode}-${i}-${Date.now() + i}`,
      originCity: origin.city,
      originAirport: origin.code,
      destinationCity: dest.city,
      destinationAirport: dest.airportCode,
      airline,
      departureTime: departureDate.toISOString(),
      arrivalTime: arrivalDate,
      returnDepartureTime,
      returnArrivalTime,
      price,
      currency: request.currency || "EUR",
      durationMinutes,
      stops,
      score: 0,
      badges: [],
      recommendationReason: "",
    });
  }

  return flights;
}

// ─── Provider ───────────────────────────────────────────────────────────────
export const mockFlightProvider: FlightProvider = {
  async searchFlights(request: ParsedTravelRequest): Promise<FlightResult[]> {
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));

    const origin = getOriginInfo(request.origin ?? "Madrid");
    const budget = request.budget;
    let targets: DestinationRecommendation[] = [];

    if (request.destination && !request.flexibleDestination) {
      const destLower = request.destination.toLowerCase();
      const codeUpper = (request.destinationAirportCode ?? "").toUpperCase();

      // 1. Buscar por código IATA exacto (más específico)
      const byCode = codeUpper
        ? DESTINATIONS_CATALOG.filter((d) => d.airportCode === codeUpper)
        : [];

      // 2. Buscar por nombre de ciudad
      const byCity = DESTINATIONS_CATALOG.filter(
        (d) =>
          d.city.toLowerCase().includes(destLower) ||
          destLower.includes(d.city.toLowerCase())
      );

      // 3. Buscar por país (puede devolver varias ciudades)
      const byCountry = DESTINATIONS_CATALOG.filter((d) =>
        d.country.toLowerCase() === destLower ||
        d.country.toLowerCase().includes(destLower) ||
        destLower.includes(d.country.toLowerCase())
      );

      if (byCity.length > 0 && byCity[0].city.toLowerCase() !== byCity[0].country.toLowerCase()) {
        // Búsqueda de ciudad específica
        targets = byCity.slice(0, 1);
      } else if (byCountry.length > 1) {
        // Búsqueda de país → devolver TODAS las ciudades del país
        targets = byCountry;
      } else if (byCode.length > 0) {
        targets = byCode;
      } else if (byCity.length > 0) {
        targets = byCity.slice(0, 1);
      } else if (request.destinationAirportCode) {
        targets = [buildSyntheticDestination(request.destination, request.destinationAirportCode)];
      } else {
        targets = [buildSyntheticDestination(request.destination, "UNK")];
      }
    } else {
      // Destino flexible → filtrar catálogo
      let filtered = [...DESTINATIONS_CATALOG];

      // Filtrar por tipo de viaje
      if (request.tripType && request.tripType !== "unknown") {
        const byType = filtered.filter((d) => d.tags.includes(request.tripType!));
        if (byType.length >= 3) filtered = byType;
      }

      // Filtrar por presupuesto
      if (budget) {
        if (budget < 80) filtered = filtered.filter((d) => d.estimatedPriceLevel === "low");
        else if (budget < 200) filtered = filtered.filter((d) => d.estimatedPriceLevel !== "high");
        else if (budget < 400) filtered = filtered.filter((d) => d.estimatedPriceLevel !== "high");
      }

      // Excluir el origen
      if (request.origin) {
        const originLower = request.origin.toLowerCase();
        filtered = filtered.filter((d) => !d.city.toLowerCase().includes(originLower));
      }

      targets = filtered
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);
    }

    // Generar vuelos: ciudad concreta → 4-6, país/flexible → 2-3 por ciudad
    const flights: FlightResult[] = [];
    const isCountrySearch = targets.length > 1 && !request.flexibleDestination;
    const flightsPerDest = request.flexibleDestination || isCountrySearch
      ? 2 + Math.floor(Math.random() * 2)
      : 4 + Math.floor(Math.random() * 3);

    for (const dest of targets) {
      const generated = generateFlightsForDestination(dest, origin, request, flightsPerDest);
      flights.push(...generated);
    }

    // Añadir razones de recomendación
    return flights.map((f) => ({
      ...f,
      recommendationReason: buildRecommendationReason(f, request, flights),
    }));
  },
};

// ─── Recomendaciones de destino ──────────────────────────────────────────────
export function getDestinationRecommendations(
  request: ParsedTravelRequest
): DestinationRecommendation[] {
  if (!request.flexibleDestination) return [];

  let filtered = [...DESTINATIONS_CATALOG];

  if (request.tripType && request.tripType !== "unknown") {
    const byType = filtered.filter((d) => d.tags.includes(request.tripType!));
    if (byType.length >= 3) filtered = byType;
  }

  // Filtro duro: excluir destinos incompatibles con el presupuesto
  const { budget } = request;
  if (budget) {
    if (budget < 150)       filtered = filtered.filter((d) => d.estimatedPriceLevel === "low");
    else if (budget < 400)  filtered = filtered.filter((d) => d.estimatedPriceLevel !== "high");
  }

  // Excluir origen
  if (request.origin) {
    const originLower = request.origin.toLowerCase();
    filtered = filtered.filter((d) => !d.city.toLowerCase().includes(originLower));
  }

  // Scoring dinámico: ajustar según contexto real del usuario
  const NEARBY = new Set(["España", "Portugal", "Francia", "Marruecos", "Italia", "Alemania"]);
  const scored = filtered.map((d) => {
    let score = d.matchScore;

    // Alineación de presupuesto
    if (budget) {
      if (budget < 300 && d.estimatedPriceLevel === "low")            score += 12;
      if (budget >= 300 && budget < 700 && d.estimatedPriceLevel === "medium") score += 8;
      if (budget >= 700 && d.estimatedPriceLevel === "high")          score += 10;
    }

    // Alineación de duración (fin de semana → cerca; viaje largo → lejos)
    const dur = request.durationDays;
    if (dur) {
      const near = NEARBY.has(d.country);
      if (dur <= 3 && near)   score += 10;
      if (dur >= 10 && !near) score += 8;
    }

    // Preferencias del usuario
    if (request.preferences?.includes("precio bajo") && d.estimatedPriceLevel === "low") score += 10;
    if (request.preferences?.includes("vuelo directo") && NEARBY.has(d.country)) score += 6;

    return { ...d, matchScore: score };
  });

  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8);
}
