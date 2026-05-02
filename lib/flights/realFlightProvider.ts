import type { FlightResult, ParsedTravelRequest } from "@/types/travel";
import type { FlightProvider } from "./types";
import { searchAmadeusFlights } from "./amadeus";

export const realFlightProvider: FlightProvider = {
  async searchFlights(request: ParsedTravelRequest): Promise<FlightResult[]> {
    const provider = process.env.FLIGHT_API_PROVIDER;

    if (provider === "amadeus" || process.env.AMADEUS_CLIENT_ID) {
      return searchAmadeusFlights(request);
    }

    if (provider === "kiwi") {
      throw new Error("Kiwi provider not implemented yet");
    }

    if (provider === "serpapi") {
      throw new Error("SerpAPI provider not implemented yet");
    }

    throw new Error(`No real flight provider configured. Set AMADEUS_CLIENT_ID + AMADEUS_CLIENT_SECRET.`);
  },
};
