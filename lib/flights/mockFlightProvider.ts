import type { FlightResult, ParsedTravelRequest, DestinationRecommendation } from "@/types/travel";
import type { FlightProvider } from "./types";
import { buildRecommendationReason } from "./scoreFlight";

const AIRLINES = [
  "Vueling", "Ryanair", "Iberia Express", "EasyJet", "Wizz Air",
  "Iberia", "Air Europa", "Transavia", "Volotea", "Norwegian",
  "British Airways", "Lufthansa", "Air France", "KLM",
];

// ─── Catálogo completo de destinos ──────────────────────────────────────────
const DESTINATIONS_CATALOG: DestinationRecommendation[] = [
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
    city: "París", country: "Francia", airportCode: "CDG",
    reason: "La ciudad más romántica del mundo, accesible en vuelo directo.",
    estimatedPriceLevel: "medium", tags: ["city", "romantic", "culture", "gastronomy"], matchScore: 87,
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

  // Largo radio
  {
    city: "Tokio", country: "Japón", airportCode: "NRT",
    reason: "La metrópolis del futuro, única en cultura, gastronomía y tecnología.",
    estimatedPriceLevel: "high", tags: ["city", "culture", "adventure", "exotic"], matchScore: 94,
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
    city: "Cancún", country: "México", airportCode: "CUN",
    reason: "El Caribe mexicano: playas turquesa, ruinas mayas y todo incluido.",
    estimatedPriceLevel: "high", tags: ["beach", "culture", "party"], matchScore: 87,
  },
];

// ─── Tabla de duración en minutos desde España (aprox.) ─────────────────────
const FLIGHT_DURATIONS: Record<string, number> = {
  // Nacional
  PMI: 55, IBZ: 60, MAH: 65, TFS: 170, LPA: 165, ACE: 175, FUE: 180,
  AGP: 70, SVQ: 75, GRX: 80, SCQ: 90, OVD: 85, SDR: 80, EAS: 65,
  BIO: 60, VGO: 80, LCG: 90,
  // Portugal
  LIS: 75, OPO: 80, FAO: 80,
  // Marruecos
  RAK: 180, CMN: 170,
  // Europa próxima
  CDG: 140, MXP: 140, FCO: 155, VCE: 155, FLR: 160, NAP: 155,
  BRU: 160, AMS: 155, BER: 175, VIE: 175, PRG: 185, BUD: 175,
  LHR: 155, EDI: 175, DUB: 165,
  ATH: 220, MLA: 200, CAG: 90, PMO: 115,
  KRK: 185, WAW: 190, IST: 205, AYT: 215,
  DBV: 195, SPU: 195, JTR: 220, JMK: 215, HER: 230,
  CPH: 195, ARN: 205, OSL: 210, HEL: 225,
  // Largo radio
  NRT: 720, BKK: 660, DPS: 750, DXB: 360, JFK: 480, CUN: 600, SIN: 720,
};

// ─── Precios base por distancia ──────────────────────────────────────────────
function getFlightBasePrice(airportCode: string, priceLevel: "low" | "medium" | "high"): number {
  const duration = FLIGHT_DURATIONS[airportCode] || 120;
  // Base según duración (más lejos = más caro) + nivel de precio del destino
  const distanceFactor = duration < 100 ? 35 : duration < 200 ? 55 : duration < 300 ? 90 : duration < 500 ? 180 : 380;
  const priceMult = priceLevel === "low" ? 0.8 : priceLevel === "medium" ? 1.0 : 1.4;
  return distanceFactor * priceMult;
}

// ─── Información de aeropuertos de origen ───────────────────────────────────
const ORIGIN_INFO: Record<string, { code: string; city: string }> = {
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
  return {
    city: destinationName,
    country: "España",
    airportCode,
    reason: `Vuelos directos disponibles a ${destinationName}.`,
    estimatedPriceLevel: "low",
    tags: ["relax", "culture"],
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

    // Price: first option tends to be cheaper
    const priceMult = i === 0 ? 0.82 + Math.random() * 0.15 : 0.95 + Math.random() * 0.4;
    const price = Math.round(basePrice * priceMult);

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
      // Busca en catálogo por nombre de ciudad, código IATA o país
      const destLower = request.destination.toLowerCase();
      const found = DESTINATIONS_CATALOG.find(
        (d) =>
          d.city.toLowerCase().includes(destLower) ||
          destLower.includes(d.city.toLowerCase()) ||
          d.airportCode.toLowerCase() === (request.destinationAirportCode ?? "").toLowerCase() ||
          d.country.toLowerCase().includes(destLower)
      );

      if (found) {
        targets = [found];
      } else if (request.destinationAirportCode) {
        // Destino no en catálogo pero tenemos el código IATA → destino sintético
        targets = [buildSyntheticDestination(request.destination, request.destinationAirportCode)];
      } else {
        // Último recurso: destino sintético con código genérico
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

    // Generar vuelos (más opciones para destino fijo que para flexible)
    const flights: FlightResult[] = [];
    const flightsPerDest = request.flexibleDestination ? 2 + Math.floor(Math.random() * 2) : 4 + Math.floor(Math.random() * 3);

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

  if (request.budget) {
    if (request.budget < 80) filtered = filtered.filter((d) => d.estimatedPriceLevel === "low");
    else if (request.budget < 250) filtered = filtered.filter((d) => d.estimatedPriceLevel !== "high");
  }

  if (request.origin) {
    const originLower = request.origin.toLowerCase();
    filtered = filtered.filter((d) => !d.city.toLowerCase().includes(originLower));
  }

  return filtered
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}
