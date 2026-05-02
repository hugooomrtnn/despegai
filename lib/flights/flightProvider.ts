import type { FlightProvider } from "./types";
import { mockFlightProvider } from "./mockFlightProvider";
import { realFlightProvider } from "./realFlightProvider";

function createFlightProvider(): FlightProvider {
  const hasAmadeus = !!(process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET);
  const explicitMock = process.env.FLIGHT_API_PROVIDER === "mock";

  // Usar mock si se fuerza explícitamente o si no hay credenciales reales
  if (explicitMock || !hasAmadeus) {
    return mockFlightProvider;
  }

  // Con Amadeus configurado: intentar real y caer en mock si falla o si el destino es flexible
  return {
    async searchFlights(request) {
      // Sin destino concreto no podemos llamar a Amadeus → mock para recomendaciones
      if (!request.destinationAirportCode) {
        return mockFlightProvider.searchFlights(request);
      }

      try {
        return await realFlightProvider.searchFlights(request);
      } catch (error) {
        console.warn("[FlightProvider] Amadeus failed, falling back to mock:", error);
        return mockFlightProvider.searchFlights(request);
      }
    },
  };
}

export const flightProvider = createFlightProvider();
