import type { FlightResult, FlightBadge, ParsedTravelRequest } from "@/types/travel";

export function scoreFlights(
  flights: FlightResult[],
  request: ParsedTravelRequest
): FlightResult[] {
  if (flights.length === 0) return [];

  const minPrice = Math.min(...flights.map((f) => f.price));
  const maxPrice = Math.max(...flights.map((f) => f.price));
  const minDuration = Math.min(...flights.map((f) => f.durationMinutes));

  const scored = flights.map((flight) => {
    let score = 50;

    // Price score (0-30 pts): cheaper = higher score
    const priceRange = maxPrice - minPrice || 1;
    const priceScore = ((maxPrice - flight.price) / priceRange) * 30;
    score += priceScore;

    // Stops score (0-20 pts): direct = 20, 1 stop = 10, 2+ = 0
    if (flight.stops === 0) score += 20;
    else if (flight.stops === 1) score += 10;

    // Duration score (0-10 pts)
    const durationScore = ((minDuration / flight.durationMinutes) * 10);
    score += durationScore;

    // Budget fit (0-15 pts)
    if (request.budget) {
      const totalBudget = request.budget * (request.passengers || 1);
      if (flight.price <= totalBudget * 0.7) score += 15;
      else if (flight.price <= totalBudget) score += 8;
      else score -= 10;
    }

    // Badges
    const badges: FlightBadge[] = [];
    if (flight.price === minPrice) badges.push("cheapest");
    if (flight.stops === 0) badges.push("direct");
    if (flight.durationMinutes === minDuration) badges.push("fastest");

    return { ...flight, score: Math.round(Math.min(100, Math.max(0, score))), badges };
  });

  // Mark best value (good score + not cheapest)
  const sorted = scored.sort((a, b) => b.score - a.score);
  if (sorted.length > 1 && !sorted[0].badges.includes("cheapest")) {
    sorted[0] = { ...sorted[0], badges: [...sorted[0].badges, "best_value"] };
  } else if (sorted.length > 1) {
    const bestValue = sorted.find((f) => !f.badges.includes("cheapest"));
    if (bestValue) {
      const idx = sorted.indexOf(bestValue);
      sorted[idx] = { ...bestValue, badges: [...bestValue.badges, "best_value"] };
    }
  }

  // Top 3 get AI recommended badge
  return sorted.map((f, i) => ({
    ...f,
    badges: i < 3 ? Array.from(new Set([...f.badges, "ai_recommended" as FlightBadge])) : f.badges,
  }));
}

export function buildRecommendationReason(
  flight: FlightResult,
  request: ParsedTravelRequest,
  allFlights: FlightResult[]
): string {
  const minPrice = Math.min(...allFlights.map((f) => f.price));
  const maxPrice = Math.max(...allFlights.map((f) => f.price));
  const minDuration = Math.min(...allFlights.map((f) => f.durationMinutes));
  const savingVsMax = maxPrice - flight.price;

  if (flight.price === minPrice && flight.stops === 0) {
    return "Mejor precio y vuelo directo. Opción ideal para proponer al cliente.";
  }
  if (flight.price === minPrice) {
    return `Opción más económica disponible. Ahorra hasta ${savingVsMax}€ respecto a otras alternativas.`;
  }
  if (flight.stops === 0 && flight.price <= minPrice * 1.15) {
    return "Vuelo directo con precio muy competitivo. Recomendado para clientes que valoran comodidad.";
  }
  if (flight.stops === 0) {
    return "Vuelo directo sin escalas. Mayor comodidad para el cliente aunque con precio algo superior.";
  }
  if (request.budget && flight.price <= request.budget * 0.8) {
    return `Encaja bien con el presupuesto del cliente (${request.budget} ${request.currency}). Deja margen para otros gastos.`;
  }
  if (flight.durationMinutes === minDuration) {
    return "Vuelo más rápido disponible. Ideal para clientes con poco tiempo o viajes de empresa.";
  }
  if (flight.score >= 80) {
    return "Buen equilibrio entre precio, duración y escalas. Opción sólida para proponer.";
  }
  return "Alternativa válida con buena relación precio/duración para este destino.";
}
