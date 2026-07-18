import type { ParsedTravelRequest, TripType } from "@/types/travel";
import { DESTINATIONS_CATALOG } from "@/lib/flights/mockFlightProvider";

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

  // España — aeropuertos secundarios
  girona: { name: "Girona", code: "GRO" },
  reus: { name: "Reus (Tarragona)", code: "REU" },
  tarragona: { name: "Reus (Tarragona)", code: "REU" },
  jerez: { name: "Jerez de la Frontera", code: "XRY" },
  "jerez de la frontera": { name: "Jerez de la Frontera", code: "XRY" },

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

  // Francia — ciudades específicas
  paris: { name: "París", code: "CDG" },
  niza: { name: "Niza", code: "NCE" },
  lyon: { name: "Lyon", code: "LYS" },
  marsella: { name: "Marsella", code: "MRS" },
  // Francia — país → devuelve "Francia" para mostrar todas las ciudades
  francia: { name: "Francia", code: "CDG" },

  // Italia — ciudades
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
  // Italia — país
  italia: { name: "Italia", code: "FCO" },

  // Reino Unido — ciudades
  londres: { name: "Londres", code: "LHR" },
  london: { name: "Londres", code: "LHR" },
  manchester: { name: "Manchester", code: "MAN" },
  edimburgo: { name: "Edimburgo", code: "EDI" },
  glasgow: { name: "Glasgow", code: "GLA" },
  // Reino Unido — país
  "reino unido": { name: "Reino Unido", code: "LHR" },
  "gran bretana": { name: "Reino Unido", code: "LHR" },
  inglaterra: { name: "Reino Unido", code: "LHR" },

  // Alemania — ciudades
  berlin: { name: "Berlín", code: "BER" },
  munich: { name: "Múnich", code: "MUC" },
  frankfurt: { name: "Frankfurt", code: "FRA" },
  hamburgo: { name: "Hamburgo", code: "HAM" },
  dusseldorf: { name: "Düsseldorf", code: "DUS" },
  colonia: { name: "Colonia", code: "CGN" },
  stuttgart: { name: "Stuttgart", code: "STR" },
  // Alemania — país
  alemania: { name: "Alemania", code: "BER" },
  germany: { name: "Alemania", code: "BER" },

  // Países Bajos
  amsterdam: { name: "Ámsterdam", code: "AMS" },
  holanda: { name: "Países Bajos", code: "AMS" },
  "paises bajos": { name: "Países Bajos", code: "AMS" },

  // Bélgica
  bruselas: { name: "Bruselas", code: "BRU" },
  belgica: { name: "Bélgica", code: "BRU" },

  // Europa del Este — ciudades
  budapest: { name: "Budapest", code: "BUD" },
  praga: { name: "Praga", code: "PRG" },
  varsovia: { name: "Varsovia", code: "WAW" },
  cracovia: { name: "Cracovia", code: "KRK" },
  viena: { name: "Viena", code: "VIE" },
  bucarest: { name: "Bucarest", code: "OTP" },
  sofia: { name: "Sofía", code: "SOF" },
  // Europa del Este — países
  hungria: { name: "Hungría", code: "BUD" },
  "republica checa": { name: "República Checa", code: "PRG" },
  polonia: { name: "Polonia", code: "KRK" },
  austria: { name: "Austria", code: "VIE" },
  rumania: { name: "Rumanía", code: "OTP" },
  bulgaria: { name: "Bulgaria", code: "SOF" },

  // Grecia — ciudades
  atenas: { name: "Atenas", code: "ATH" },
  athens: { name: "Atenas", code: "ATH" },
  tesalonica: { name: "Tesalónica", code: "SKG" },
  santorini: { name: "Santorini", code: "JTR" },
  mykonos: { name: "Mykonos", code: "JMK" },
  creta: { name: "Creta", code: "HER" },
  rodas: { name: "Rodas", code: "RHO" },
  corfu: { name: "Corfú", code: "CFU" },
  // Grecia — país
  grecia: { name: "Grecia", code: "ATH" },
  greece: { name: "Grecia", code: "ATH" },

  // Escandinavia — ciudades
  estocolmo: { name: "Estocolmo", code: "ARN" },
  oslo: { name: "Oslo", code: "OSL" },
  copenhague: { name: "Copenhague", code: "CPH" },
  helsinki: { name: "Helsinki", code: "HEL" },
  bergen: { name: "Bergen", code: "BGO" },
  // Escandinavia — países
  suecia: { name: "Suecia", code: "ARN" },
  noruega: { name: "Noruega", code: "OSL" },
  dinamarca: { name: "Dinamarca", code: "CPH" },
  finlandia: { name: "Finlandia", code: "HEL" },

  // Europa sur — ciudades
  malta: { name: "Malta", code: "MLA" },
  dubrovnik: { name: "Dubrovnik", code: "DBV" },
  split: { name: "Split", code: "SPU" },
  liubliana: { name: "Liubliana", code: "LJU" },
  zadar: { name: "Zadar", code: "ZAD" },
  // Europa sur — países
  croacia: { name: "Croacia", code: "DBV" },
  eslovenia: { name: "Eslovenia", code: "LJU" },

  // Irlanda
  dublin: { name: "Dublín", code: "DUB" },
  irlanda: { name: "Irlanda", code: "DUB" },

  // Marruecos — ciudades
  marrakech: { name: "Marrakech", code: "RAK" },
  marrakesh: { name: "Marrakech", code: "RAK" },
  casablanca: { name: "Casablanca", code: "CMN" },
  fez: { name: "Fez", code: "FEZ" },
  agadir: { name: "Agadir", code: "AGA" },
  rabat: { name: "Rabat", code: "RBA" },
  tanger: { name: "Tánger", code: "TNG" },
  tánger: { name: "Tánger", code: "TNG" },
  // Marruecos — país
  marruecos: { name: "Marruecos", code: "RAK" },
  morocco: { name: "Marruecos", code: "RAK" },

  // Turquía — ciudades
  estambul: { name: "Estambul", code: "IST" },
  istanbul: { name: "Estambul", code: "IST" },
  antalya: { name: "Antalya", code: "AYT" },
  bodrum: { name: "Bodrum", code: "BJV" },
  izmir: { name: "Izmir", code: "ADB" },
  // Turquía — país
  turquia: { name: "Turquía", code: "IST" },
  turkey: { name: "Turquía", code: "IST" },

  // Japón — ciudades
  tokio: { name: "Tokio", code: "NRT" },
  tokyo: { name: "Tokio", code: "NRT" },
  osaka: { name: "Osaka", code: "KIX" },
  // Japón — país
  japon: { name: "Japón", code: "NRT" },
  japan: { name: "Japón", code: "NRT" },

  // Tailandia — ciudades
  bangkok: { name: "Bangkok", code: "BKK" },
  // Tailandia — país
  tailandia: { name: "Tailandia", code: "BKK" },
  thailand: { name: "Tailandia", code: "BKK" },

  // Indonesia
  bali: { name: "Bali", code: "DPS" },
  indonesia: { name: "Bali", code: "DPS" },

  // Singapur
  singapur: { name: "Singapur", code: "SIN" },
  singapore: { name: "Singapur", code: "SIN" },

  // Dubái
  dubai: { name: "Dubái", code: "DXB" },

  // Maldivas
  maldivas: { name: "Maldivas", code: "MLE" },

  // Vietnam
  vietnam: { name: "Vietnam", code: "HAN" },
  hanoi: { name: "Hanói", code: "HAN" },
  "ho chi minh": { name: "Ho Chi Minh", code: "SGN" },

  // India
  india: { name: "India", code: "DEL" },
  delhi: { name: "Nueva Delhi", code: "DEL" },
  mumbai: { name: "Bombay", code: "BOM" },
  bombay: { name: "Bombay", code: "BOM" },

  // Balcanes y Europa del Este adicional
  belgrado: { name: "Belgrado", code: "BEG" },
  belgrade: { name: "Belgrado", code: "BEG" },
  serbia: { name: "Belgrado", code: "BEG" },
  sarajevo: { name: "Sarajevo", code: "SJJ" },
  bosnia: { name: "Sarajevo", code: "SJJ" },
  tirana: { name: "Tirana", code: "TIA" },
  albania: { name: "Tirana", code: "TIA" },
  skopje: { name: "Skopie", code: "SKP" },
  podgorica: { name: "Podgorica", code: "TGD" },
  tivat: { name: "Tivat", code: "TIV" },
  montenegro: { name: "Tivat", code: "TIV" },
  chisinau: { name: "Chisinau", code: "KIV" },
  moldova: { name: "Chisinau", code: "KIV" },
  pristina: { name: "Pristina", code: "PRN" },
  kosovo: { name: "Pristina", code: "PRN" },

  // América — ciudades
  "nueva york": { name: "Nueva York", code: "JFK" },
  "new york": { name: "Nueva York", code: "JFK" },
  miami: { name: "Miami", code: "MIA" },
  "los angeles": { name: "Los Ángeles", code: "LAX" },
  chicago: { name: "Chicago", code: "ORD" },
  "las vegas": { name: "Las Vegas", code: "LAS" },
  orlando: { name: "Orlando", code: "MCO" },
  "san francisco": { name: "San Francisco", code: "SFO" },
  seattle: { name: "Seattle", code: "SEA" },
  boston: { name: "Boston", code: "BOS" },
  washington: { name: "Washington D.C.", code: "IAD" },
  cancun: { name: "Cancún", code: "CUN" },
  "ciudad de mexico": { name: "Ciudad de México", code: "MEX" },
  guadalajara: { name: "Guadalajara", code: "GDL" },
  bogota: { name: "Bogotá", code: "BOG" },
  medellin: { name: "Medellín", code: "MDE" },
  medellín: { name: "Medellín", code: "MDE" },
  cartagena: { name: "Cartagena de Indias", code: "CTG" },
  "buenos aires": { name: "Buenos Aires", code: "EZE" },
  "sao paulo": { name: "São Paulo", code: "GRU" },
  "rio de janeiro": { name: "Río de Janeiro", code: "GIG" },
  habana: { name: "La Habana", code: "HAV" },
  aruba: { name: "Aruba", code: "AUA" },
  curacao: { name: "Curazao", code: "CUR" },
  curazao: { name: "Curazao", code: "CUR" },
  // América — países
  "estados unidos": { name: "Estados Unidos", code: "JFK" },
  usa: { name: "Estados Unidos", code: "JFK" },
  mexico: { name: "México", code: "CUN" },
  colombia: { name: "Colombia", code: "BOG" },
  argentina: { name: "Argentina", code: "EZE" },
  brasil: { name: "Brasil", code: "GRU" },
  cuba: { name: "Cuba", code: "HAV" },

  // Oriente Medio
  egipto: { name: "El Cairo", code: "CAI" },
  egypt: { name: "El Cairo", code: "CAI" },
  cairo: { name: "El Cairo", code: "CAI" },
  "el cairo": { name: "El Cairo", code: "CAI" },
  hurghada: { name: "Hurghada", code: "HRG" },
  "sharm el sheikh": { name: "Sharm el-Sheij", code: "SSH" },
  sharm: { name: "Sharm el-Sheij", code: "SSH" },
  luxor: { name: "Luxor", code: "LXR" },
  asuan: { name: "Asuán", code: "ASW" },
  jordania: { name: "Amán", code: "AMM" },
  amman: { name: "Amán", code: "AMM" },
  jordan: { name: "Amán", code: "AMM" },
  petra: { name: "Amán", code: "AMM" },
  israel: { name: "Tel Aviv", code: "TLV" },
  "tel aviv": { name: "Tel Aviv", code: "TLV" },
  jerusalem: { name: "Tel Aviv", code: "TLV" },
  qatar: { name: "Doha", code: "DOH" },
  doha: { name: "Doha", code: "DOH" },
  oman: { name: "Mascate", code: "MCT" },
  mascate: { name: "Mascate", code: "MCT" },
  muscat: { name: "Mascate", code: "MCT" },
  kuwait: { name: "Kuwait", code: "KWI" },
  bahrain: { name: "Bahréin", code: "BAH" },
  bahrein: { name: "Bahréin", code: "BAH" },
  "arabia saudita": { name: "Riad", code: "RUH" },
  riad: { name: "Riad", code: "RUH" },
  riyadh: { name: "Riad", code: "RUH" },
  iran: { name: "Teherán", code: "IKA" },
  iraq: { name: "Bagdad", code: "BGW" },
  libano: { name: "Beirut", code: "BEY" },
  beirut: { name: "Beirut", code: "BEY" },

  // África
  "ciudad del cabo": { name: "Ciudad del Cabo", code: "CPT" },
  "cape town": { name: "Ciudad del Cabo", code: "CPT" },
  "sudafrica": { name: "Johannesburgo", code: "JNB" },
  "sur africa": { name: "Johannesburgo", code: "JNB" },
  johannesburgo: { name: "Johannesburgo", code: "JNB" },
  nairobi: { name: "Nairobi", code: "NBO" },
  kenia: { name: "Nairobi", code: "NBO" },
  kenya: { name: "Nairobi", code: "NBO" },
  tanzania: { name: "Zanzíbar", code: "ZNZ" },
  zanzibar: { name: "Zanzíbar", code: "ZNZ" },
  zanzíbar: { name: "Zanzíbar", code: "ZNZ" },
  "dar es salam": { name: "Dar es Salam", code: "DAR" },
  etiopía: { name: "Addis Abeba", code: "ADD" },
  etiopia: { name: "Addis Abeba", code: "ADD" },
  "addis abeba": { name: "Addis Abeba", code: "ADD" },
  tunez: { name: "Túnez", code: "TUN" },
  tunicia: { name: "Túnez", code: "TUN" },
  túnez: { name: "Túnez", code: "TUN" },
  djerba: { name: "Djerba", code: "DJE" },
  argelia: { name: "Argel", code: "ALG" },
  argel: { name: "Argel", code: "ALG" },
  ghana: { name: "Acra", code: "ACC" },
  nigeria: { name: "Lagos", code: "LOS" },
  lagos: { name: "Lagos", code: "LOS" },
  senegal: { name: "Dakar", code: "DKR" },
  dakar: { name: "Dakar", code: "DKR" },
  mauricio: { name: "Port Louis", code: "MRU" },
  "isla mauricio": { name: "Port Louis", code: "MRU" },
  seychelles: { name: "Seychelles", code: "SEZ" },
  reunión: { name: "Reunión", code: "RUN" },
  reunion: { name: "Reunión", code: "RUN" },
  madagascar: { name: "Madagascar", code: "TNR" },
  mozambique: { name: "Maputo", code: "MPM" },
  angola: { name: "Luanda", code: "LAD" },

  // Asia
  china: { name: "Pekín", code: "PEK" },
  pekin: { name: "Pekín", code: "PEK" },
  beijing: { name: "Pekín", code: "PEK" },
  shanghai: { name: "Shanghái", code: "PVG" },
  shanghái: { name: "Shanghái", code: "PVG" },
  guangzhou: { name: "Guangzhou", code: "CAN" },
  "hong kong": { name: "Hong Kong", code: "HKG" },
  hongkong: { name: "Hong Kong", code: "HKG" },
  taiwan: { name: "Taipéi", code: "TPE" },
  taipei: { name: "Taipéi", code: "TPE" },
  "corea del sur": { name: "Seúl", code: "ICN" },
  corea: { name: "Seúl", code: "ICN" },
  seul: { name: "Seúl", code: "ICN" },
  seoul: { name: "Seúl", code: "ICN" },
  filipinas: { name: "Manila", code: "MNL" },
  manila: { name: "Manila", code: "MNL" },
  malasia: { name: "Kuala Lumpur", code: "KUL" },
  malaysia: { name: "Kuala Lumpur", code: "KUL" },
  "kuala lumpur": { name: "Kuala Lumpur", code: "KUL" },
  camboya: { name: "Siem Reap", code: "REP" },
  "siem reap": { name: "Siem Reap", code: "REP" },
  "phnom penh": { name: "Nom Pen", code: "PNH" },
  myanmar: { name: "Rangún", code: "RGN" },
  birmania: { name: "Rangún", code: "RGN" },
  nepal: { name: "Katmandú", code: "KTM" },
  katmandu: { name: "Katmandú", code: "KTM" },
  kathmandu: { name: "Katmandú", code: "KTM" },
  "sri lanka": { name: "Colombo", code: "CMB" },
  ceilan: { name: "Colombo", code: "CMB" },
  azerbaiyan: { name: "Bakú", code: "GYD" },
  baku: { name: "Bakú", code: "GYD" },
  georgia: { name: "Tiflis", code: "TBS" },
  tiflis: { name: "Tiflis", code: "TBS" },
  armenia: { name: "Ereván", code: "EVN" },
  kazajistan: { name: "Almaty", code: "ALA" },
  uzbekistan: { name: "Taskent", code: "TAS" },

  // América
  peru: { name: "Lima", code: "LIM" },
  perú: { name: "Lima", code: "LIM" },
  lima: { name: "Lima", code: "LIM" },
  chile: { name: "Santiago de Chile", code: "SCL" },
  "santiago de chile": { name: "Santiago de Chile", code: "SCL" },
  ecuador: { name: "Quito", code: "UIO" },
  quito: { name: "Quito", code: "UIO" },
  "costa rica": { name: "San José", code: "SJO" },
  panama: { name: "Panamá", code: "PTY" },
  panamá: { name: "Panamá", code: "PTY" },
  "republica dominicana": { name: "Santo Domingo", code: "SDQ" },
  "punta cana": { name: "Punta Cana", code: "PUJ" },
  jamaica: { name: "Montego Bay", code: "MBJ" },
  "puerto rico": { name: "San Juan", code: "SJU" },
  barbados: { name: "Bridgetown", code: "BGI" },
  bahamas: { name: "Nassau", code: "NAS" },
  venezuela: { name: "Caracas", code: "CCS" },
  caracas: { name: "Caracas", code: "CCS" },
  uruguay: { name: "Montevideo", code: "MVD" },
  montevideo: { name: "Montevideo", code: "MVD" },
  paraguay: { name: "Asunción", code: "ASU" },
  bolivia: { name: "La Paz", code: "LPB" },
  guatemala: { name: "Guatemala", code: "GUA" },
  toronto: { name: "Toronto", code: "YYZ" },
  canada: { name: "Toronto", code: "YYZ" },
  vancouver: { name: "Vancouver", code: "YVR" },
  montreal: { name: "Montreal", code: "YUL" },

  // Oceanía
  australia: { name: "Sídney", code: "SYD" },
  sidney: { name: "Sídney", code: "SYD" },
  sydney: { name: "Sídney", code: "SYD" },
  melbourne: { name: "Melbourne", code: "MEL" },
  "nueva zelanda": { name: "Auckland", code: "AKL" },
  auckland: { name: "Auckland", code: "AKL" },
  fiji: { name: "Nadi", code: "NAN" },
};

const MONTH_MAP: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

// Palabras que indican destino flexible (el usuario NO sabe a donde ir)
const FLEXIBLE_DESTINATION_KEYWORDS = [
  "me da igual", "da igual",
  "sorprendeme", "sorpresa",
  "donde sea", "donde quiera",
  "cualquier sitio", "cualquier destino", "cualquier lugar",
  "algun sitio", "algun lugar",
  "no importa el destino", "no importa donde",
  "abierto a",
];

// "norte" solo es destino con contexto explícito, no en scan libre
const CONTEXT_ONLY_WORDS = new Set(["norte"]);

// ─── Normalizar: quitar tildes y pasar a minúsculas ──────────────────────────
function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ─── Mapa de búsqueda normalizado (construido una vez al cargar el módulo) ───
// PLACE_DICT tiene prioridad (alias curados, países → ciudad principal). Como
// respaldo, cualquier ciudad del catálogo de precios (lib/flights/mockFlightProvider)
// que no tenga ya una entrada también queda buscable — así un destino de /destinos
// o /chollos siempre se reconoce por su nombre exacto y coincide con el precio mostrado.
const NORMALIZED_DICT: Map<string, { name: string; code: string }> = new Map(
  Object.entries(PLACE_DICT).map(([k, v]) => [normalize(k), v])
);
for (const d of DESTINATIONS_CATALOG) {
  const key = normalize(d.city);
  if (!NORMALIZED_DICT.has(key)) {
    NORMALIZED_DICT.set(key, { name: d.city, code: d.airportCode });
  }
}

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

  // Ordenar por posición descendente: el lugar mencionado más tarde es el más específico
  // Ej: "vuelos japon osaka" → osaka gana sobre japon
  found.sort((a, b) => b.pos - a.pos);

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
  if (FLEXIBLE_DESTINATION_KEYWORDS.some((k) => norm.includes(normalize(k)))) return null;

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
  if (/tres\s+semanas/.test(lower)) return 21;

  // "ida y vuelta" sin duración explícita → 7 días por defecto
  if (/ida\s+y\s+vuelta/.test(lower)) return 7;

  return null;
}

// ─── Extraer fecha de salida ─────────────────────────────────────────────────
function extractDepartureDate(text: string): string | null {
  const lower = text.toLowerCase();

  // "mañana"
  if (/\bma[ñn]ana\b/.test(lower)) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }

  // "este fin de semana", "este finde", "este weekend"
  if (/este\s+(?:fin\s+de\s+semana|finde|weekend)/.test(lower)) {
    const d = new Date();
    const daysToSat = (6 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + daysToSat);
    return d.toISOString().split("T")[0];
  }

  // "la semana que viene", "la próxima semana", "la semana próxima"
  if (/(?:la\s+)?semana\s+que\s+viene|(?:la\s+)?pr[oó]xima\s+semana|semana\s+pr[oó]xima/.test(lower)) {
    const d = new Date();
    const daysToMon = (8 - d.getDay()) % 7 || 7;
    d.setDate(d.getDate() + daysToMon);
    return d.toISOString().split("T")[0];
  }

  // "el mes que viene", "el próximo mes", "el mes próximo"
  if (/(?:el\s+)?(?:pr[oó]ximo\s+mes|mes\s+que\s+viene|mes\s+pr[oó]ximo)/.test(lower)) {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.setDate(1);
    return d.toISOString().split("T")[0];
  }

  // Mes por nombre ("en agosto", "para julio", "en el mes de octubre"…)
  for (const [monthName, monthNum] of Object.entries(MONTH_MAP)) {
    if (lower.includes(monthName)) {
      const now = new Date();
      const targetMonth = monthNum - 1;
      const targetYear = targetMonth < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear();
      return new Date(targetYear, targetMonth, 1).toISOString().split("T")[0];
    }
  }

  // "próximas X semanas"
  const weeksMatch = lower.match(/pr[oó]ximas?\s+(\d+)\s+semanas?/i);
  if (weeksMatch) {
    const d = new Date();
    d.setDate(d.getDate() + parseInt(weeksMatch[1]) * 7);
    return d.toISOString().split("T")[0];
  }

  // "próximos X meses"
  const monthsMatch = lower.match(/pr[oó]ximos?\s+(\d+)\s+meses?/i);
  if (monthsMatch) {
    const d = new Date();
    d.setMonth(d.getMonth() + parseInt(monthsMatch[1]));
    return d.toISOString().split("T")[0];
  }

  if (/(?:este|el)\s+verano/.test(lower)) {
    return new Date(new Date().getFullYear(), 6, 1).toISOString().split("T")[0];
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

// ─── Extraer número de pasajeros ─────────────────────────────────────────────
function extractPassengers(text: string): number {
  const lower = text.toLowerCase();
  const patterns = [
    /para\s+(\d+)\s*personas?/i,
    /(\d+)\s+adultos?/i,
    /somos\s+(\d+)/i,
    /familia\s+de\s+(\d+)/i,
    /grupo\s+de\s+(\d+)/i,
    /viaje\s+de\s+(\d+)/i,
    /nosotros\s+(\d+)/i,
    /(\d+)\s+viajeros?/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const n = parseInt(m[1]);
      if (n >= 1 && n <= 9) return n;
    }
  }
  // "dos", "tres"... literales
  if (/\bdos\b/.test(lower)) return 2;
  if (/\btres\b/.test(lower)) return 3;
  if (/\bcuatro\b/.test(lower)) return 4;
  if (/\bcinco\b/.test(lower)) return 5;
  return 1;
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
    FLEXIBLE_DESTINATION_KEYWORDS.some((k) => norm.includes(normalize(k)));

  // "cualquier día/fecha", "flexible con las fechas", "cuando sea", etc.
  const isFlexibleDates =
    !departureDate ||
    /flexible|cualquier|cuando sea|cuando quiera|no importa la fecha|cualquier momento/.test(norm);

  const dep = departureDate ?? null;
  const dur = durationDays ?? null;
  const returnDate = dep && dur
    ? (() => { const d = new Date(dep); d.setDate(d.getDate() + dur); return d.toISOString().split("T")[0]; })()
    : null;

  return {
    origin: origin?.name ?? "Madrid",
    originAirportCode: origin?.code ?? "MAD",
    destination: destination?.name ?? null,
    destinationAirportCode: destination?.code ?? null,
    flexibleDestination: isFlexibleDestination,
    departureDate: dep,
    returnDate,
    flexibleDates: isFlexibleDates,
    durationDays: dur,
    budget,
    currency: "EUR",
    passengers: extractPassengers(text),
    tripType,
    preferences,
    constraints: budget ? [`Presupuesto máximo: ${budget} EUR`] : [],
    rawPrompt,
  };
}
