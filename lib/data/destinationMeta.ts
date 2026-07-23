// ─── Metadatos compartidos para presentar el catálogo de destinos en la UI ───

export type Continent = "Europa" | "África" | "Oriente Medio" | "Asia" | "América" | "Oceanía";

export const CONTINENTS: Continent[] = ["Europa", "África", "Oriente Medio", "Asia", "América", "Oceanía"];

const COUNTRY_CONTINENT: Record<string, Continent> = {
  "España": "Europa",
  "Portugal": "Europa",
  "Portugal (Madeira)": "Europa",
  "Portugal (Azores)": "Europa",
  "Hungría": "Europa",
  "República Checa": "Europa",
  "Polonia": "Europa",
  "Croacia": "Europa",
  "Italia": "Europa",
  "Bélgica": "Europa",
  "Países Bajos": "Europa",
  "Alemania": "Europa",
  "Francia": "Europa",
  "Austria": "Europa",
  "Irlanda": "Europa",
  "Reino Unido": "Europa",
  "Malta": "Europa",
  "Grecia": "Europa",
  "Dinamarca": "Europa",
  "Suecia": "Europa",
  "Noruega": "Europa",
  "Finlandia": "Europa",
  "Letonia": "Europa",
  "Estonia": "Europa",
  "Lituania": "Europa",
  "Eslovenia": "Europa",
  "Bulgaria": "Europa",
  "Rumanía": "Europa",
  "Islandia": "Europa",
  "Suiza": "Europa",
  "Serbia": "Europa",
  "Eslovaquia": "Europa",
  "Bosnia y Herzegovina": "Europa",
  "Macedonia del Norte": "Europa",
  "Albania": "Europa",
  "Montenegro": "Europa",
  "Chipre": "Europa",

  "Marruecos": "África",
  "Egipto": "África",
  "Kenia": "África",
  "Tanzania": "África",
  "Túnez": "África",
  "Sudáfrica": "África",
  "Etiopía": "África",
  "Argelia": "África",
  "Ghana": "África",
  "Senegal": "África",
  "Mauricio": "África",
  "Seychelles": "África",

  "Turquía": "Oriente Medio",
  "Catar": "Oriente Medio",
  "Israel": "Oriente Medio",
  "Jordania": "Oriente Medio",
  "Emiratos Árabes": "Oriente Medio",
  "Omán": "Oriente Medio",
  "Líbano": "Oriente Medio",
  "Kuwait": "Oriente Medio",
  "Baréin": "Oriente Medio",

  "Corea del Sur": "Asia",
  "Malasia": "Asia",
  "China": "Asia",
  "Camboya": "Asia",
  "Nepal": "Asia",
  "Sri Lanka": "Asia",
  "Japón": "Asia",
  "Tailandia": "Asia",
  "Indonesia": "Asia",
  "India": "Asia",
  "Vietnam": "Asia",
  "Singapur": "Asia",
  "Filipinas": "Asia",
  "Taiwán": "Asia",
  "Myanmar": "Asia",
  "Georgia": "Asia",
  "Armenia": "Asia",
  "Azerbaiyán": "Asia",

  "Perú": "América",
  "República Dominicana": "América",
  "Canadá": "América",
  "Estados Unidos": "América",
  "México": "América",
  "Cuba": "América",
  "Jamaica": "América",
  "Puerto Rico": "América",
  "Bahamas": "América",
  "Barbados": "América",
  "Argentina": "América",
  "Brasil": "América",
  "Chile": "América",
  "Colombia": "América",
  "Ecuador": "América",
  "Uruguay": "América",
  "Paraguay": "América",
  "Bolivia": "América",
  "Venezuela": "América",
  "Costa Rica": "América",
  "Panamá": "América",
  "Guatemala": "América",

  "Australia": "Oceanía",
  "Nueva Zelanda": "Oceanía",
  "Fiyi": "Oceanía",
};

export function getContinent(country: string): Continent {
  return COUNTRY_CONTINENT[country] ?? "Europa";
}

export const TAG_LABELS: Record<string, string> = {
  beach: "Playa",
  relax: "Relax",
  party: "Fiesta",
  nature: "Naturaleza",
  culture: "Cultura",
  city: "Ciudad",
  gastronomy: "Gastronomía",
  adventure: "Aventura",
  exotic: "Exótico",
  history: "Historia",
  romantic: "Romántico",
  shopping: "Compras",
};

export const TAG_COLORS: Record<string, string> = {
  beach: "bg-blue-50 text-blue-600",
  culture: "bg-violet-50 text-violet-600",
  history: "bg-amber-50 text-amber-600",
  romantic: "bg-rose-50 text-rose-600",
  nature: "bg-emerald-50 text-emerald-600",
  city: "bg-slate-100 text-slate-600",
  gastronomy: "bg-orange-50 text-orange-600",
  relax: "bg-teal-50 text-teal-600",
  party: "bg-pink-50 text-pink-600",
  adventure: "bg-yellow-50 text-yellow-700",
  exotic: "bg-purple-50 text-purple-600",
  shopping: "bg-indigo-50 text-indigo-600",
};

const FLAGS: Record<string, string> = {
  "España": "🇪🇸", "Portugal": "🇵🇹", "Portugal (Madeira)": "🇵🇹", "Portugal (Azores)": "🇵🇹",
  "Hungría": "🇭🇺", "República Checa": "🇨🇿", "Polonia": "🇵🇱", "Croacia": "🇭🇷", "Italia": "🇮🇹",
  "Bélgica": "🇧🇪", "Países Bajos": "🇳🇱", "Alemania": "🇩🇪", "Francia": "🇫🇷", "Austria": "🇦🇹",
  "Irlanda": "🇮🇪", "Reino Unido": "🇬🇧", "Malta": "🇲🇹", "Grecia": "🇬🇷", "Dinamarca": "🇩🇰",
  "Suecia": "🇸🇪", "Noruega": "🇳🇴", "Finlandia": "🇫🇮", "Letonia": "🇱🇻", "Estonia": "🇪🇪",
  "Lituania": "🇱🇹", "Eslovenia": "🇸🇮", "Bulgaria": "🇧🇬", "Rumanía": "🇷🇴", "Islandia": "🇮🇸",
  "Suiza": "🇨🇭", "Serbia": "🇷🇸", "Eslovaquia": "🇸🇰", "Bosnia y Herzegovina": "🇧🇦",
  "Macedonia del Norte": "🇲🇰", "Albania": "🇦🇱", "Montenegro": "🇲🇪", "Chipre": "🇨🇾",
  "Marruecos": "🇲🇦", "Egipto": "🇪🇬", "Kenia": "🇰🇪", "Tanzania": "🇹🇿", "Túnez": "🇹🇳",
  "Sudáfrica": "🇿🇦", "Etiopía": "🇪🇹", "Argelia": "🇩🇿", "Ghana": "🇬🇭", "Senegal": "🇸🇳",
  "Mauricio": "🇲🇺", "Seychelles": "🇸🇨",
  "Turquía": "🇹🇷", "Catar": "🇶🇦", "Israel": "🇮🇱", "Jordania": "🇯🇴", "Emiratos Árabes": "🇦🇪",
  "Omán": "🇴🇲", "Líbano": "🇱🇧", "Kuwait": "🇰🇼", "Baréin": "🇧🇭",
  "Corea del Sur": "🇰🇷", "Malasia": "🇲🇾", "China": "🇨🇳", "Camboya": "🇰🇭", "Nepal": "🇳🇵",
  "Sri Lanka": "🇱🇰", "Japón": "🇯🇵", "Tailandia": "🇹🇭", "Indonesia": "🇮🇩", "India": "🇮🇳",
  "Vietnam": "🇻🇳", "Singapur": "🇸🇬", "Filipinas": "🇵🇭", "Taiwán": "🇹🇼", "Myanmar": "🇲🇲",
  "Georgia": "🇬🇪", "Armenia": "🇦🇲", "Azerbaiyán": "🇦🇿",
  "Perú": "🇵🇪", "República Dominicana": "🇩🇴", "Canadá": "🇨🇦", "Estados Unidos": "🇺🇸",
  "México": "🇲🇽", "Cuba": "🇨🇺", "Jamaica": "🇯🇲", "Puerto Rico": "🇵🇷", "Bahamas": "🇧🇸",
  "Barbados": "🇧🇧", "Argentina": "🇦🇷", "Brasil": "🇧🇷", "Chile": "🇨🇱", "Colombia": "🇨🇴",
  "Ecuador": "🇪🇨", "Uruguay": "🇺🇾", "Paraguay": "🇵🇾", "Bolivia": "🇧🇴", "Venezuela": "🇻🇪",
  "Costa Rica": "🇨🇷", "Panamá": "🇵🇦", "Guatemala": "🇬🇹",
  "Australia": "🇦🇺", "Nueva Zelanda": "🇳🇿", "Fiyi": "🇫🇯",
};

export function getFlag(country: string): string {
  return FLAGS[country] ?? "🌍";
}

export function roundPrice(price: number): number {
  return Math.max(15, Math.round(price / 5) * 5);
}

// ─── Destinos icónicos por continente (código de aeropuerto) ────────────────
// Se muestran siempre en /chollos aunque no sean el precio más bajo de su
// continente ese día, para que los grandes clásicos (Tokio, Nueva York, El
// Cairo...) nunca falten aunque otro destino salga más barato.
export const FAMOUS_CITY_CODES: Set<string> = new Set([
  // Europa
  "CDG", // París
  "FCO", // Roma
  "LHR", // Londres
  "AMS", // Ámsterdam
  "VCE", // Venecia
  "PRG", // Praga
  "VIE", // Viena
  "JTR", // Santorini
  "BUD", // Budapest
  "ATH", // Atenas
  // África
  "CAI", // El Cairo
  "CPT", // Ciudad del Cabo
  "RAK", // Marrakech
  "ZNZ", // Zanzíbar
  "NBO", // Nairobi
  "CMN", // Casablanca
  "LXR", // Luxor
  // Oriente Medio
  "DXB", // Dubái
  "IST", // Estambul
  "DOH", // Doha
  "TLV", // Tel Aviv
  "AMM", // Amán (Petra)
  // Asia
  "NRT", // Tokio
  "KIX", // Osaka
  "BKK", // Bangkok
  "DPS", // Bali
  "SIN", // Singapur
  "HKG", // Hong Kong
  "ICN", // Seúl
  "PEK", // Pekín
  "KTM", // Katmandú
  "DEL", // Delhi (Taj Mahal)
  // América
  "JFK", // Nueva York
  "GIG", // Río de Janeiro
  "CUN", // Cancún
  "EZE", // Buenos Aires
  "LAX", // Los Ángeles
  "MIA", // Miami
  "MEX", // Ciudad de México
  "HAV", // La Habana
  "LIM", // Lima (Machu Picchu)
  // Oceanía
  "SYD", // Sídney
  "AKL", // Auckland
  "MEL", // Melbourne
  "NAN", // Fiyi
]);

// ─── Duración de viaje habitual por continente (ida y vuelta, en días) ───────
// Nadie se va a Asia/Oceanía/América 5 días — cuanto más lejos, más se suele
// alargar el viaje. Se usa para generar vuelos con vueltas realistas cuando
// el usuario no especifica cuántos días quiere estar.
export const TRIP_DURATION_BY_CONTINENT: Record<Continent, [number, number]> = {
  "Europa": [3, 7],
  "Oriente Medio": [5, 15],
  "África": [5, 15],
  "Asia": [7, 21],
  "América": [7, 21],
  "Oceanía": [7, 21],
};

export function randomTripDays(continent: Continent): number {
  const [min, max] = TRIP_DURATION_BY_CONTINENT[continent];
  return min + Math.floor(Math.random() * (max - min + 1));
}
