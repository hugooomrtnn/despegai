import { NextRequest, NextResponse } from "next/server";
import { parseTravelPrompt } from "@/lib/ai/parseTravelPrompt";
import { flightProvider } from "@/lib/flights/flightProvider";
import { getDestinationRecommendations } from "@/lib/flights/mockFlightProvider";
import { scoreFlights } from "@/lib/flights/scoreFlight";
import { getHotels } from "@/lib/hotels/mockHotelProvider";
import { buildTripPlan } from "@/lib/planning/tripPlanner";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import type { TravelSearchResponse } from "@/types/travel";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
      return NextResponse.json(
        { error: "El prompt es demasiado corto. Describe qué tipo de viaje quieres.", code: "INVALID_PROMPT" },
        { status: 400 }
      );
    }

    if (prompt.trim().length > 1000) {
      return NextResponse.json(
        { error: "El prompt es demasiado largo. Máximo 1000 caracteres.", code: "PROMPT_TOO_LONG" },
        { status: 400 }
      );
    }

    // 1. Parse the natural language prompt
    const parsedRequest = await parseTravelPrompt(prompt.trim());

    // 2. Get destination recommendations if destination is flexible
    const destinationRecommendations = parsedRequest.flexibleDestination
      ? getDestinationRecommendations(parsedRequest)
      : [];

    // 3. Search for flights
    const rawFlights = await flightProvider.searchFlights(parsedRequest);

    // 4. Score and rank flights
    const flights = scoreFlights(rawFlights, parsedRequest);

    // 5. Get hotels
    const hotels = getHotels(parsedRequest);

    // 6. Build trip plan
    const tripPlan = buildTripPlan(parsedRequest);

    // 7. Optionally save to Supabase
    let searchId: string | undefined;
    if (isSupabaseConfigured()) {
      try {
        const { createClient } = await import("@/lib/supabase/server");
        const supabase = await createClient();
        const { data } = await supabase
          .from("travel_searches")
          .insert({
            raw_prompt: prompt,
            parsed_request: parsedRequest,
          })
          .select("id")
          .single();
        searchId = data?.id;
      } catch (e) {
        console.warn("[Supabase] Failed to save search:", e);
      }
    }

    const response: TravelSearchResponse = {
      parsedRequest,
      destinationRecommendations,
      flights,
      hotels,
      tripPlan,
      searchId,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[travel-search] Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor. Por favor, inténtalo de nuevo.", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
