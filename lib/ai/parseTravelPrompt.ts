import type { ParsedTravelRequest } from "@/types/travel";
import { mockParseTravelPrompt } from "./mockParseTravelPrompt";

export async function parseTravelPrompt(rawPrompt: string): Promise<ParsedTravelRequest> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (anthropicKey) {
    try {
      return await parseWithClaude(rawPrompt, anthropicKey);
    } catch (e) {
      console.warn("[AI] Claude parsing failed, falling back to mock:", e);
    }
  }

  if (openaiKey) {
    try {
      return await parseWithOpenAI(rawPrompt, openaiKey);
    } catch (e) {
      console.warn("[AI] OpenAI parsing failed, falling back to mock:", e);
    }
  }

  return mockParseTravelPrompt(rawPrompt);
}

const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

const SYSTEM_PROMPT = `You are a travel assistant that extracts structured travel information from natural language requests in Spanish or English.
Today's date is ${today}. Return ONLY valid JSON with no markdown, no explanation, no code block.

Schema:
{
  "origin": "city name or null",
  "originAirportCode": "IATA code or null",
  "destination": "city name or null",
  "destinationAirportCode": "IATA code or null",
  "flexibleDestination": boolean,
  "departureDate": "YYYY-MM-DD or null",
  "returnDate": "YYYY-MM-DD or null",
  "flexibleDates": boolean,
  "durationDays": number or null,
  "budget": number or null,
  "currency": "EUR",
  "passengers": number,
  "tripType": "beach"|"city"|"adventure"|"romantic"|"party"|"culture"|"relax"|"unknown",
  "preferences": string[],
  "constraints": string[],
  "rawPrompt": "the original prompt"
}

CRITICAL DATE RULES — follow exactly, no exceptions:

RULE 1 — Month only (NO specific day given):
  "en agosto", "en julio", "en verano", "este verano" → departureDate="YYYY-MM-01" (first of that month), flexibleDates=true
  Examples:
    "vuelos en agosto" → departureDate="2026-08-01", flexibleDates=true
    "ir a París en agosto" → departureDate="2026-08-01", flexibleDates=true
    "vuelos más baratos en agosto" → departureDate="2026-08-01", flexibleDates=true

RULE 2 — "Cheapest" / no date at all:
  "más barato", "baratos", "económico", "mejor precio", "más económico" WITHOUT any month or date → departureDate=null, flexibleDates=true
  NEVER invent a specific date.

RULE 3 — Specific date (day + month given):
  "el 15 de agosto", "15/08", "el día 3" → set that exact date, flexibleDates=false

RULE 4 — Duration keywords:
  "fin de semana" → durationDays=3, flexibleDates=true
  "una semana" → durationDays=7
  "10 días" → durationDays=10

RULE 5 — If departureDate is null → returnDate must also be null.

DESTINATION RULES:
- If destination is not specified or user says "sorpresa", "anywhere", "no sé" → flexibleDestination=true, destination=null.
- Map city names to IATA codes: Madrid=MAD, Barcelona=BCN, Valencia=VLC, Sevilla=SVQ, Roma=FCO, París=CDG, Londres=LHR, Lisboa=LIS, Berlín=BER, Ámsterdam=AMS, Tokio=NRT, Nueva York=JFK, etc.

ORIGIN RULES:
- Default origin to Madrid (MAD) if not specified.
- If user mentions a Spanish city as starting point, use it.

PASSENGERS: extract number of people ("para 2 personas" → 2, "familia de 4" → 4). Default 1.
BUDGET: extract numeric value in EUR if mentioned ("máximo 300€" → 300).`;

async function parseWithClaude(rawPrompt: string, apiKey: string): Promise<ParsedTravelRequest> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: rawPrompt }],
    }),
  });

  if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
  const data = await response.json();
  const text = data.content[0].text;
  const parsed = JSON.parse(text);
  return { ...parsed, rawPrompt };
}

async function parseWithOpenAI(rawPrompt: string, apiKey: string): Promise<ParsedTravelRequest> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: rawPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
  const data = await response.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  return { ...parsed, rawPrompt };
}
