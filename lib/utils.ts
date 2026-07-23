import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatDateLong(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Códigos IATA de aerolínea → nombre completo ─────────────────────────────
// Travelpayouts devuelve la aerolínea como código de 2 letras (ej. "MU"); esto
// lo traduce a un nombre legible. Si no está en la tabla, se deja tal cual.
const AIRLINE_CODE_NAMES: Record<string, string> = {
  IB: "Iberia", UX: "Air Europa", VY: "Vueling", FR: "Ryanair", U2: "EasyJet",
  W6: "Wizz Air", V7: "Volotea", DY: "Norwegian", I2: "Iberia Express",
  BA: "British Airways", LH: "Lufthansa", AF: "Air France", KL: "KLM",
  TP: "TAP Air Portugal", SN: "Brussels Airlines", LX: "Swiss", OS: "Austrian Airlines",
  AZ: "ITA Airways", A3: "Aegean Airlines", TK: "Turkish Airlines", PC: "Pegasus",
  SK: "SAS", AY: "Finnair", LO: "LOT Polish Airlines", OK: "Czech Airlines",
  EK: "Emirates", QR: "Qatar Airways", EY: "Etihad Airways", SV: "Saudia",
  MS: "EgyptAir", AT: "Royal Air Maroc", RJ: "Royal Jordanian", ET: "Ethiopian Airlines",
  KQ: "Kenya Airways", SA: "South African Airways",
  SQ: "Singapore Airlines", CX: "Cathay Pacific", TG: "Thai Airways", MH: "Malaysia Airlines",
  GA: "Garuda Indonesia", PR: "Philippine Airlines", VN: "Vietnam Airlines",
  MU: "China Eastern", CA: "Air China", CZ: "China Southern", NH: "ANA",
  JL: "Japan Airlines", KE: "Korean Air", OZ: "Asiana Airlines",
  AA: "American Airlines", UA: "United Airlines", DL: "Delta", AC: "Air Canada",
  AM: "Aeroméxico", AV: "Avianca", LA: "LATAM Airlines", CM: "Copa Airlines",
  QF: "Qantas", NZ: "Air New Zealand", FJ: "Fiji Airways",
};

export function resolveAirlineName(codeOrName: string): string {
  return AIRLINE_CODE_NAMES[codeOrName.toUpperCase()] ?? codeOrName;
}
