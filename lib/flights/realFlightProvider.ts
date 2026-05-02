import type { FlightResult, ParsedTravelRequest } from "@/types/travel";
import type { FlightProvider } from "./types";
import { searchAmadeusFlights } from "./amadeus";
import { searchAviationstackFlights } from "./aviationstack";

export const realFlightProvider: FlightProvider = {
  async searchFlights(request: ParsedTravelRequest): Promise<FlightResult[]> {
    // Aviationstack (más fácil de configurar)
    if (process.env.AVIATIONSTACK_API_KEY) {
      return searchAviationstackFlights(request);
    }

    // Amadeus (más datos, requiere registro)
    if (process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET) {
      return searchAmadeusFlights(request);
    }

    throw new Error("No real flight provider configured.");
  },
};
