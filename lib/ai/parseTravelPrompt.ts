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

const SYSTEM_PROMPT = `You are a travel assistant that extracts structured travel information from natural language requests.
Extract the following and return ONLY valid JSON with no markdown:
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
  "passengers": 1,
  "tripType": "beach"|"city"|"adventure"|"romantic"|"party"|"culture"|"relax"|"unknown",
  "preferences": [],
  "constraints": [],
  "rawPrompt": "the original prompt"
}
If destination is not specified or user says "anywhere", set flexibleDestination=true and destination=null.
Default origin to Madrid if not specified. Default currency to EUR.`;

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
