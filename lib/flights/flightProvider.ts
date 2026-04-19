import type { FlightProvider } from "./types";
import { mockFlightProvider } from "./mockFlightProvider";
import { realFlightProvider } from "./realFlightProvider";

function createFlightProvider(): FlightProvider {
  const providerName = process.env.FLIGHT_API_PROVIDER || "mock";

  if (providerName === "mock") {
    return mockFlightProvider;
  }

  // For real providers, try to use them but fall back to mock on error
  return {
    async searchFlights(request) {
      try {
        return await realFlightProvider.searchFlights(request);
      } catch (error) {
        console.warn(`[FlightProvider] Real provider (${providerName}) failed, falling back to mock:`, error);
        return mockFlightProvider.searchFlights(request);
      }
    },
  };
}

export const flightProvider = createFlightProvider();
