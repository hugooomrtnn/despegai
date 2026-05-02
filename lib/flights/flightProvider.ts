import type { FlightProvider } from "./types";
import { mockFlightProvider } from "./mockFlightProvider";
import { realFlightProvider } from "./realFlightProvider";

function createFlightProvider(): FlightProvider {
  const hasReal =
    !!(process.env.AVIATIONSTACK_API_KEY) ||
    !!(process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET);

  const explicitMock = process.env.FLIGHT_API_PROVIDER === "mock";

  if (explicitMock || !hasReal) {
    return mockFlightProvider;
  }

  return {
    async searchFlights(request) {
      // Sin destino concreto → siempre mock (las APIs necesitan destino)
      if (!request.destinationAirportCode) {
        return mockFlightProvider.searchFlights(request);
      }

      try {
        return await realFlightProvider.searchFlights(request);
      } catch (error) {
        console.warn("[FlightProvider] Real provider failed, using mock:", error);
        return mockFlightProvider.searchFlights(request);
      }
    },
  };
}

export const flightProvider = createFlightProvider();
