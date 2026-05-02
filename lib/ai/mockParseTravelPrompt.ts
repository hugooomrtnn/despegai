import type { ParsedTravelRequest, TripType } from "@/types/travel";

const PLACE_DICT: Record<string, { name: string; code: string }> = {
  // España – principales aeropuertos
  madrid: { name: "Madrid", code: "MAD" },
  barcelona: { name: "Barcelona", code: "BCN" },
  valencia: { name: "Valencia", code: "VLC" },
  sevilla: { name: "Sevilla", code: "SVQ" },
  malaga: { name: "Málaga", code: "AGP" },
  bilbao: { name: "Bilbao", code: "BIO" },
  alicante: { name: "Alicante", code: "ALC" },
  zaragoza: { name: "Zaragoza", code: "ZAZ" },
  granada: { name: "Granada", code: "GRX" },
  valladolid: { name: "Valladolid", code: "VLL" },
  murcia: { name: "Murcia", code: "RMU" },
  almeria: { name: "Almería", code: "LEI" },
  pamplona: { name: "Pamplona", code: "PNA" },
  navarra: { name: "Pamplona", code: "PNA" },
  santander: { name: "Santander", code: "SDR" },
  cantabria: { name: "Santander", code: "SDR" },

  // Norte de España
  oviedo: { name: "Oviedo (Asturias)", code: "OVD" },
  asturias: { name: "Oviedo (Asturias)", code: "OVD" },
  gijon: { name: "Oviedo (Asturias)", code: "OVD" },
  norte: { name: "Oviedo (Asturias)", code: "OVD" },

  // País Vasco
  "san sebastian": { name: "San Sebastián", code: "EAS" },
  donostia: { name: "San Sebastián", code: "EAS" },
  "pais vasco": { name: "Bilbao", code: "BIO" },
  euskadi: { name: "Bilbao", code: "BIO" },
  vitoria: { name: "Vitoria", code: "VIT" },

  // Galicia
  "a coruna": { name: "A Coruña", code: "LCG" },
  coruna: { name: "A Coruña", code: "LCG" },
  galicia: { name: "Santiago de Compostela", code: "SCQ" },
  santiago: { name: "Santiago de Compostela", code: "SCQ" },
  "santiago de compostela": { name: "Santiago de Compostela", code: "SCQ" },
  vigo: { name: "Vigo", code: "VGO" },

  // Islas Baleares
  palma: { name: "Palma de Mallorca", code: "PMI" },
  mallorca: { name: "Palma de Mallorca", code: "PMI" },
  ibiza: { name: "Ibiza", code: "IBZ" },
  menorca: { name: "Menorca", code: "MAH" },
  baleares: { name: "Palma de Mallorca", code: "PMI" },

  // Islas Canarias
  tenerife: { name: "Tenerife", code: "TFS" },
  "gran canaria": { name: "Gran Canaria", code: "LPA" },
  "las palmas": { name: "Gran Canaria", code: "LPA" },
  lanzarote: { name: "Lanzarote", code: "ACE" },
  fuerteventura: { name: "Fuerteventura", code: "FUE" },
  "la palma": { name: "La Palma", code: "SPC" },
  canarias: { name: "Tenerife", code: "TFS" },
  "islas canarias": { name: "Tenerife", code: "TFS" },

  // Portugal
  lisboa: { name: "Lisboa", code: "LIS" },
  lisbon: { name: "Lisboa", code: "LIS" },
  oporto: { name: "Oporto", code: "OPO" },
  porto: { name: "Oporto", code: "OPO" },
  faro: { name: "Faro", code: "FAO" },
  portugal: { name: "Lisboa", code: "LIS" },

  // Francia
  paris: { name: "París", code: "CDG" },
  niza: { name: "Niza", code: "NCE" },
  lyon: { name: "Lyon", code: "LYS" },
  marsella: { name: "Marsella", code: "MRS" },
  francia: { name: "París", code: "CDG" },

  // Italia
  roma: { name: "Roma", code: "FCO" },
  rome: { name: "Roma", code: "FCO" },
  milan: { name: "Milán", code: "MXP" },
  venecia: { name: "Venecia", code: "VCE" },
  florencia: { name: "Florencia", code: "FLR" },
  napoles: { name: "Nápoles", code: "NAP" },
  cagliari: { name: "Cagliari", code: "CAG" },
  cerdena: { name: "Cagliari", code: "CAG" },
  sicilia: { name: "Palermo", code: "PMO" },
  palermo: { name: "Palermo", code: "PMO" },
  italia: { name: "Roma", code: "FCO" },

  // Reino Unido
  londres: { name: "Londres", code: "LHR" },
  london: { name: "Londres", code: "LHR" },
  "reino unido": { name: "Londres", code: "LHR" },
  manchester: { name: "Manchester", code: "MAN" },
  edimburgo: { name: "Edimburgo", code: "EDI" },

  // Alemania
  berlin: { name: "Berlín", code: "BER" },
  munich: { name: "Múnich", code: "MUC" },
  frankfurt: { name: "Frankfurt", code: "FRA" },
  alemania: { name: "Berlín", code: "BER" },
  hamburgo: { name: "Hamburgo", code: "HAM" },

  // Países Bajos
  amsterdam: { name: "Ámsterdam", code: "AMS" },
  holanda: { name: "Ámsterdam", code: "AMS" },

  // Bélgica
  bruselas: { name: "Bruselas", code: "BRU" },
  belgica: { name: "Bruselas", code: "BRU" },

  // Europa del Este
  budapest: { name: "Budapest", code: "BUD" },
  hungria: { name: "Budapest", code: "BUD" },
  praga: { name: "Praga", code: "PRG" },
  "republica checa": { name: "Praga", code: "PRG" },
  varsovia: { name: "Varsovia", code: "WAW" },
  cracovia: { name: "Cracovia", code: "KRK" },
  polonia: { name: "Cracovia", code: "KRK" },
  viena: { name: "Viena", code: "VIE" },
  austria: { name: "Viena", code: "VIE" },
  bucarest: { name: "Bucarest", code: "OTP" },
  sofia: { name: "Sofía", code: "SOF" },

  // Grecia
  atenas: { name: "Atenas", code: "ATH" },
  athens: { name: "Atenas", code: "ATH" },
  grecia: { name: "Atenas", code: "ATH" },
  tesalonica: { name: "Tesalónica", code: "SKG" },
  santorini: { name: "Santorini", code: "JTR" },
  mykonos: { name: "Mykonos", code: "JMK" },
  creta: { name: "Creta", code: "HER" },
  rodas: { name: "Rodas", code: "RHO" },
  corfu: { name: "Corfú", code: "CFU" },

  // Escandinavia
  estocolmo: { name: "Estocolmo", code: "ARN" },
  suecia: { name: "Estocolmo", code: "ARN" },
  oslo: { name: "Oslo", code: "OSL" },
  noruega: { name: "Oslo", code: "OSL" },
  copenhague: { name: "Copenhague", code: "CPH" },
  dinamarca: { name: "Copenhague", code: "CPH" },
  helsinki: { name: "Helsinki", code: "HEL" },
  finlandia: { name: "Helsinki", code: "HEL" },

  // Europa sur
  malta: { name: "Malta", code: "MLA" },
  dubrovnik: { name: "Dubrovnik", code: "DBV" },
  croacia: { name: "Dubrovnik", code: "DBV" },
  split: { name: "Split", code: "SPU" },
  liubliana: { name: "Liubliana", code: "LJU" },
  eslovenia: { name: "Liubliana", code: "LJU" },

  // Irlanda
  dublin: { name: "Dublín", code: "DUB" },
  irlanda: { name: "Dublín", code: "DUB" },

  // Marruecos
  marrakech: { name: "Marrakech", code: "RAK" },
  marrakesh: { name: "Marrakech", code: "RAK" },
  casablanca: { name: "Casablanca", code: "CMN" },
  marruecos: { name: "Marrakech", code: "RAK" },
  fez: { name: "Fez", code: "FEZ" },

  // Turquía
  estambul: { name: "Estambul", code: "IST" },
  istanbul: { name: "Estambul", code: "IST" },
  turquia: { name: "Estambul", code: "IST" },
  antalya: { name: "Antalya", code: "AYT" },

  // Asia
  tokio: { name: "Tokio", code: "NRT" },
  tokyo: { name: "Tokio", code: "NRT" },
  japon: { name: "Tokio", code: "NRT" },
  osaka: { name: "Osaka", code: "KIX" },
  bangkok: { name: "Bangkok", code: "BKK" },
  tailandia: { name: "Bangkok", code: "BKK" },
  thailand: { name: "Bangkok", code: "BKK" },
  bali: { name: "Bali", code: "DPS" },
  singapur: { name: "Singapur", code: "SIN" },
  singapore: { name: "Singapur", code: "SIN" },
  dubai: { name: "Dubái", code: "DXB" },
  maldivas: { name: "Maldivas", code: "MLE" },
  vietnam: { name: "Hanói", code: "HAN" },
  hanoi: { name: "Hanói", code: "HAN" },
  "ho chi minh": { name: "Ho Chi Minh", code: "SGN" },
  india: { name: "Nueva Delhi", code: "DEL" },
  delhi: { name: "Nueva Delhi", code: "DEL" },

  // América
  "nueva york": { name: "Nueva York", code: "JFK" },
  "new york": { name: "Nueva York", code: "JFK" },
  miami: { name: "Miami", code: "MIA" },
  "los angeles": { name: "Los Ángeles", code: "LAX" },
  chicago: { name: "Chicago", code: "ORD" },
  cancun: { name: "Cancún", code: "CUN" },
  mexico: { name: "Ciudad de México", code: "MEX" },
  "ciudad de mexico": { name: "Ciudad de México", code: "MEX" },
  colombia: { name: "Bogotá", code: "BOG" },
  bogota: { name: "Bogotá", code: "BOG" },
  "buenos aires": { name: "Buenos Aires", code: "EZE" },
  argentina: { name: "Buenos Aires", code: "EZE" },
  brasil: { name: "São Paulo", code: "GRU" },
  "sao paulo": { name: "São Paulo", code: "GRU" },
  "rio de janeiro": { name: "Río de Janeiro", code: "GIG" },
  cuba: { name: "La Habana", code: "HAV" },
  habana: { name: "La Habana", code: "HAV" },

  // África
  "ciudad del cabo": { name: "Ciudad del Cabo", code: "CPT" },
  "cape town": { name: "Ciudad del Cabo", code: "CPT" },
  nairobi: { name: "Nairobi", code: "NBO" },
  kenia: { name: "Nairobi", code: "NBO" },
  kenya: { name: "Nairobi", code: "NBO" },
};

const MONTH_MAP: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

const FLEXIBLE_KEYWORDS = [
  "me da igual", "da igual", "cualquier", "sorprendeme", "donde sea",
  "donde quiera", "algun sitio", "no importa el destino", "no importa donde",
  "abierto a", "flexible",
];

// "norte" solo es destino con contexto explícito, no en scan libre
const CONTEXT_ONLY_WORDS = new Set(["norte"]);

// ─── Normalizar: quitar tildes y pasar a minúsculas ──────────────────────────
function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ─── Mapa de búsqueda normalizado (construido una vez al cargar el módulo) ───
const NORMALIZED_DICT: Map<string, { name: string; code: string }> = new Map(
  Object.entries(PLACE_DICT).map(([k, v]) => [normalize(k), v])
);

// Lista de claves ordenadas de mayor a menor longitud (para preferir matches específicos)
const SORTED_KEYS: string[] = Array.from(NORMALIZED_DICT.keys()).sort(
  (a, b) => b.length - a.length
);

// ─── Busca una frase en el diccionario, ignorando tildes ─────────────────────
function lookupPlace(phrase: string): { name: string; code: string } | null {
  const norm = normalize(phrase.trim());
  return NORMALIZED_DICT.get(norm) ?? null;
}

// ─── Busca todos los lugares presentes en el texto normalizado ────────────────
// Recorre las claves de mayor a menor longitud para preferir matches más específicos.
// Respeta límites de palabra para evitar falsos positivos.
function findPlacesInText(
  norm: string,
  excludeName: string | null
): Array<{ name: string; code: string; key: string; pos: number }> {
  const found: Array<{ name: string; code: string; key: string; pos: number }> = [];
  const covered = new Set<number>(); // posiciones ya cubiertas por un match más largo

  for (const key of SORTED_KEYS) {
    let idx = norm.indexOf(key);
    while (idx !== -1) {
      const end = idx + key.length;
      const beforeOk = idx === 0 || /\W/.test(norm[idx - 1]);
      const afterOk = end >= norm.length || /\W/.test(norm[end]);

      if (beforeOk && afterOk && !covered.has(idx)) {
        const val = NORMALIZED_DICT.get(key)!;
        if (val.name !== excludeName) {
          found.push({ ...val, key, pos: idx });
          // Marcar posiciones cubiertas
          for (let p = idx; p < end; p++) covered.add(p);
        }
      }
      idx = norm.indexOf(key, idx + 1);
    }
  }

  return found;
}

// ─── Extraer ORIGEN ──────────────────────────────────────────────────────────
function extractOrigin(text: string): { name: string; code: string } | null {
  const norm = normalize(text);

  const patterns = [
    /(?:desde|volando\s+desde|salida\s+desde|saliendo\s+de|vuelo\s+desde|sale\s+de|parto\s+de|partiendo\s+de)\s+([a-z\s]{2,30}?)(?:\s+(?:a|para|hacia|en|el|la|los|las|durante|por)|,|$)/i,
    /origen\s*[:=]\s*([a-z\s]{2,20}?)(?:\s|,|$)/i,
  ];

  for (const pattern of patterns) {
    const m = norm.match(pattern);
    if (!m) continue;
    const candidate = m[1].trim();
    for (const len of [3, 2, 1]) {
      const words = candidate.split(/\s+/).slice(0, len).join(" ");
      const found = lookupPlace(words);
      if (found) return found;
    }
  }

  return null;
}

// ─── Extraer DESTINO ─────────────────────────────────────────────────────────
function extractDestination(
  text: string,
  originName: string | null
): { name: string; code: string } | null {
  const norm = normalize(text);

  // Si el usuario pide destino flexible → sin destino concreto
  if (FLEXIBLE_KEYWORDS.some((k) => norm.includes(normalize(k)))) return null;

  // ── Método 1: buscar después de indicadores de destino explícitos ──────────
  const destPatterns = [
    // "quiero ir a X", "me voy a X", "viajar a X"
    /(?:quiero\s+(?:ir|viajar|volar)|me\s+(?:voy|quiero\s+ir)|voy|viajar|volar|ir)\s+al?\s+([a-z\s]{2,40}?)(?=\s+\d|\s+durante|\s+en\s|\s+por|\s*,|$)/i,
    // "sacame vuelos a X", "busca vuelos para X"
    /(?:sacame?|busca|encuentra|dame|mostrame?|muestrame?)\s+(?:vuelos?|billetes?|pasajes?)\s+(?:al?|para|hacia)\s+([a-z\s]{2,40}?)(?=\s+\d|\s+en\s|\s*,|$)/i,
    // "vuelos a X", "vuelos para X"
    /vuelos?\s+(?:al?|para|hacia)\s+([a-z\s]{2,40}?)(?=\s+\d|\s+en\s|\s+desde|\s*,|$)/i,
    // "destino: X"
    /destino\s*[:=]\s*([a-z\s]{2,30}?)(?:\s|,|$)/i,
    // "al norte", "a roma", "a japon"
    /\bal?\s+([a-z\s]{3,30}?)(?=\s+\d|\s+durante|\s+en\s+|\s+para|\s*,|$)/i,
  ];

  for (const pattern of destPatterns) {
    const m = norm.match(pattern);
    if (!m) continue;

    const candidate = m[1].trim();
    for (const len of [4, 3, 2, 1]) {
      const words = candidate.split(/\s+/).slice(0, len).join(" ");
      if (!words || words.length < 2) continue;
      const found = lookupPlace(words);
      if (found && found.name !== originName) return found;
    }
  }

  // ── Método 2: scan completo del texto normalizado ─────────────────────────
  // Encuentra todos los lugares mencionados y devuelve el primero que no sea el origen
  const allPlaces = findPlacesInText(norm, originName);
  for (const place of allPlaces) {
    if (!CONTEXT_ONLY_WORDS.has(place.key)) return place;
  }

  // "norte" solo se acepta si hay contexto geográfico claro en el texto
  const hasNorteContext = /(?:ir al|voy al|vuelos? al|a(?:l)?\s+norte|norte\s+de\s+espa)/i.test(norm);
  if (hasNorteContext) {
    const norte = NORMALIZED_DICT.get("norte");
    if (norte && norte.name !== originName) return norte;
  }

  return null;
}

// ─── Extraer presupuesto ─────────────────────────────────────────────────────
function extractBudget(text: string): number | null {
  const patterns = [
    /(\d{2,5})\s*(?:euros?|€)/i,
    /presupuesto[^\d]*(\d{2,5})/i,
    /hasta\s+(?:unos?|los?)?\s*(\d{2,5})/i,
    /menos\s+de\s+(\d{2,5})/i,
    /m[aá]ximo\s+(\d{2,5})/i,
    /no\s+(?:m[aá]s\s+de|gastar\s+m[aá]s\s+de)\s+(\d{2,5})/i,
    /(\d{2,5})\s*(?:de\s+)?presupuesto/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return parseInt(m[1]);
  }
  return null;
}

// ─── Extraer duración ────────────────────────────────────────────────────────
function extractDuration(text: string): number | null {
  const lower = text.toLowerCase();

  if (/fin\s+de\s+semana|finde(?:\s+semana)?|weekend/.test(lower)) return 3;

  const rangeMatch = lower.match(/(\d+)\s*(?:o|a|-)\s*\d+\s*d[íi]as?/i);
  if (rangeMatch) return parseInt(rangeMatch[1]);

  const daysMatch = lower.match(/(\d+)\s*d[íi]as?/i);
  if (daysMatch) return parseInt(daysMatch[1]);

  const nightsMatch = lower.match(/(\d+)\s*noches?/i);
  if (nightsMatch) return parseInt(nightsMatch[1]) + 1;

  if (/una\s+semana/.test(lower)) return 7;
  if (/dos\s+semanas/.test(lower)) return 14;

  return null;
}

// ─── Extraer fecha de salida ─────────────────────────────────────────────────
function extractDepartureDate(text: string): string | null {
  const lower = text.toLowerCase();

  for (const [monthName, monthNum] of Object.entries(MONTH_MAP)) {
    if (lower.includes(monthName)) {
      const now = new Date();
      const targetMonth = monthNum - 1;
      const targetYear = targetMonth < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear();
      return new Date(targetYear, targetMonth, 15).toISOString().split("T")[0];
    }
  }

  const weeksMatch = lower.match(/pr[oó]ximas?\s+(\d+)\s+semanas?/i);
  if (weeksMatch) {
    const d = new Date();
    d.setDate(d.getDate() + parseInt(weeksMatch[1]) * 7);
    return d.toISOString().split("T")[0];
  }

  const monthsMatch = lower.match(/pr[oó]ximos?\s+(\d+)\s+meses?/i);
  if (monthsMatch) {
    const d = new Date();
    d.setMonth(d.getMonth() + parseInt(monthsMatch[1]));
    return d.toISOString().split("T")[0];
  }

  if (/(?:este|el)\s+verano/.test(lower)) {
    return new Date(new Date().getFullYear(), 6, 15).toISOString().split("T")[0];
  }
  if (/navidad|navidades/.test(lower)) {
    return new Date(new Date().getFullYear(), 11, 22).toISOString().split("T")[0];
  }
  if (/semana\s+santa/.test(lower)) {
    return new Date(new Date().getFullYear(), 3, 10).toISOString().split("T")[0];
  }

  return null;
}

// ─── Detectar tipo de viaje ──────────────────────────────────────────────────
function detectTripType(text: string): TripType {
  const lower = text.toLowerCase();

  const checks: Array<[string[], TripType]> = [
    [["playa", "beach", "mar ", "costa ", "arena", "isla", "caribe", "mediterr"], "beach"],
    [["romantic", "pareja", "luna de miel", "honeymoon", "aniversario"], "romantic"],
    [["aventura", "senderismo", "trekking", "montana", "naturaleza"], "adventure"],
    [["fiesta", "party", "discoteca", "marcha nocturna"], "party"],
    [["cultura", "museo", "historia", "arte ", "patrimonio", "monumento"], "culture"],
    [["relax", "descanso", "tranquil", "spa", "descansar", "desconectar", "relajar"], "relax"],
    [["ciudad", "city break", "urbano", "capital", "europeo", "europea"], "city"],
    [["norte", "asturias", "cantabria", "galicia"], "relax"],
  ];

  for (const [keywords, type] of checks) {
    if (keywords.some((w) => lower.includes(w))) return type;
  }

  return "unknown";
}

// ─── Extraer preferencias ────────────────────────────────────────────────────
function extractPreferences(text: string): string[] {
  const lower = text.toLowerCase();
  const prefs: string[] = [];

  if (/directo|sin escalas|vuelo directo/.test(lower)) prefs.push("vuelo directo");
  if (/barat[ao]|econ[oó]mic[ao]|precio bajo|low[ -]cost|chollo/.test(lower)) prefs.push("precio bajo");
  if (/buen clima|buen tiempo|sol y calor/.test(lower)) prefs.push("buen clima");
  if (/gastronom[ií]a|buena comida|comer bien/.test(lower)) prefs.push("gastronomía");
  if (/poco tur[íi]stic|no masificad|tranquilo/.test(lower)) prefs.push("poco turístico");
  if (/familiar|ni[ñn]os|familia/.test(lower)) prefs.push("apto para familias");
  if (/\bsolo\b|viaje solo/.test(lower)) prefs.push("viaje en solitario");

  return prefs;
}

// ─── Función principal ───────────────────────────────────────────────────────
export function mockParseTravelPrompt(rawPrompt: string): ParsedTravelRequest {
  const text = rawPrompt.trim();
  const norm = normalize(text);

  const origin = extractOrigin(text);
  const destination = extractDestination(text, origin?.name ?? null);
  const budget = extractBudget(text);
  const durationDays = extractDuration(text);
  const departureDate = extractDepartureDate(text);
  const tripType = detectTripType(text);
  const preferences = extractPreferences(text);

  const isFlexibleDestination =
    !destination ||
    FLEXIBLE_KEYWORDS.some((k) => norm.includes(normalize(k)));

  const isFlexibleDates =
    !departureDate ||
    /flexible|cualquier fecha|cuando sea|cuando quiera/.test(norm);

  return {
    origin: origin?.name ?? "Madrid",
    originAirportCode: origin?.code ?? "MAD",
    destination: destination?.name ?? null,
    destinationAirportCode: destination?.code ?? null,
    flexibleDestination: isFlexibleDestination,
    departureDate: departureDate ?? null,
    returnDate: null,
    flexibleDates: isFlexibleDates,
    durationDays: durationDays ?? null,
    budget,
    currency: "EUR",
    passengers: 1,
    tripType,
    preferences,
    constraints: budget ? [`Presupuesto máximo: ${budget} EUR`] : [],
    rawPrompt,
  };
}
