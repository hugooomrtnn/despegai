export type TripType =
  | "beach"
  | "city"
  | "adventure"
  | "romantic"
  | "party"
  | "culture"
  | "relax"
  | "unknown";

export type ParsedTravelRequest = {
  origin?: string;
  originAirportCode?: string;
  destination?: string | null;
  destinationAirportCode?: string | null;
  flexibleDestination: boolean;
  departureDate?: string | null;
  returnDate?: string | null;
  flexibleDates: boolean;
  durationDays?: number | null;
  budget?: number | null;
  currency: string;
  passengers: number;
  tripType?: TripType;
  preferences: string[];
  constraints: string[];
  rawPrompt: string;
};

export type DestinationRecommendation = {
  city: string;
  country: string;
  airportCode: string;
  reason: string;
  estimatedPriceLevel: "low" | "medium" | "high";
  tags: string[];
  matchScore: number;
  imageKeyword?: string;
};

export type FlightResult = {
  id: string;
  originCity: string;
  originAirport: string;
  destinationCity: string;
  destinationAirport: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  returnDepartureTime?: string;
  returnArrivalTime?: string;
  price: number;
  currency: string;
  durationMinutes: number;
  stops: number;
  bookingUrl?: string;
  score: number;
  recommendationReason: string;
  badges: FlightBadge[];
};

export type FlightBadge =
  | "cheapest"
  | "direct"
  | "best_value"
  | "ai_recommended"
  | "fastest"
  | "popular";

export type FlightSortOption = "price" | "stops" | "duration" | "score";

export type TravelSearchResponse = {
  parsedRequest: ParsedTravelRequest;
  destinationRecommendations: DestinationRecommendation[];
  flights: FlightResult[];
  searchId?: string;
};

export type TravelSearchError = {
  error: string;
  code: string;
};
