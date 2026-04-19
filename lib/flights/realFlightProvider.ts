import type { FlightResult, ParsedTravelRequest } from "@/types/travel";
import type { FlightProvider } from "./types";

export const realFlightProvider: FlightProvider = {
  async searchFlights(request: ParsedTravelRequest): Promise<FlightResult[]> {
    const provider = process.env.FLIGHT_API_PROVIDER;

    if (provider === "amadeus") return searchAmadeus(request);
    if (provider === "kiwi") return searchKiwi(request);
    if (provider === "serpapi") return searchSerpApi(request);

    throw new Error(`Unknown flight provider: ${provider}`);
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function searchAmadeus(_request: ParsedTravelRequest): Promise<FlightResult[]> {
  // TODO: https://developers.amadeus.com/self-service/category/flights/api-doc/flight-offers-search
  throw new Error("Amadeus provider not implemented yet");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function searchKiwi(_request: ParsedTravelRequest): Promise<FlightResult[]> {
  // TODO: https://tequila.kiwi.com/portal/docs/tequila_api/search_api
  throw new Error("Kiwi provider not implemented yet");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function searchSerpApi(_request: ParsedTravelRequest): Promise<FlightResult[]> {
  // TODO: https://serpapi.com/google-flights-api
  throw new Error("SerpAPI provider not implemented yet");
}
