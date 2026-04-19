export type { ParsedTravelRequest, FlightResult, DestinationRecommendation, FlightBadge } from "@/types/travel";

export interface FlightProvider {
  searchFlights(request: import("@/types/travel").ParsedTravelRequest): Promise<import("@/types/travel").FlightResult[]>;
}
