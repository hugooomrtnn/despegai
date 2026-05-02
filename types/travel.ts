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

// ─── Hoteles ─────────────────────────────────────────────────────────────────

export type HotelResult = {
  id: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  rating: number;   // 7.0 – 10.0
  reviewCount: number;
  amenities: string[];
  zone: string;
  bookingUrl: string;
  score: number;
  badges: HotelBadge[];
  recommendationReason: string;
};

export type HotelBadge =
  | "cheapest"
  | "top_rated"
  | "best_value"
  | "recommended"
  | "central";

// ─── Planning ────────────────────────────────────────────────────────────────

export type TripDay = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  tip: string;
};

export type TripPlan = {
  destination: string;
  durationDays: number;
  tripType: TripType;
  days: TripDay[];
  generalTips: string[];
  bestTimeToVisit: string;
  estimatedDailyBudget: string;
};

// ─── Respuesta completa ───────────────────────────────────────────────────────

export type TravelSearchResponse = {
  parsedRequest: ParsedTravelRequest;
  destinationRecommendations: DestinationRecommendation[];
  flights: FlightResult[];
  hotels: HotelResult[];
  tripPlan: TripPlan | null;
  searchId?: string;
};

export type TravelSearchError = {
  error: string;
  code: string;
};
