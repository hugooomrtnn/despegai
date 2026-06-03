import type { HotelResult, HotelBadge, ParsedTravelRequest } from "@/types/travel";

interface HotelTemplate {
  name: string;
  stars: number;
  zone: string;
  basePricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
}

const HOTEL_CATALOG: Record<string, HotelTemplate[]> = {
  // España
  MAD: [
    { name: "Hotel Gran Vía Madrid", stars: 4, zone: "Centro - Gran Vía", basePricePerNight: 95, rating: 8.4, reviewCount: 2340, amenities: ["WiFi", "Desayuno", "Gym", "Bar"] },
    { name: "Hostal Puerta del Sol", stars: 2, zone: "Centro - Sol", basePricePerNight: 42, rating: 7.9, reviewCount: 890, amenities: ["WiFi", "Recepción 24h"] },
    { name: "Palacio del Retiro", stars: 5, zone: "Retiro", basePricePerNight: 210, rating: 9.2, reviewCount: 1120, amenities: ["WiFi", "Spa", "Restaurante", "Gym", "Piscina"] },
    { name: "Room Mate Óscar", stars: 3, zone: "Chueca", basePricePerNight: 68, rating: 8.1, reviewCount: 1450, amenities: ["WiFi", "Bar", "Piscina rooftop"] },
  ],
  BCN: [
    { name: "Hotel Arts Barcelona", stars: 5, zone: "Barceloneta", basePricePerNight: 280, rating: 9.1, reviewCount: 3200, amenities: ["WiFi", "Spa", "Piscina", "Restaurante", "Gym"] },
    { name: "Barceló Raval", stars: 4, zone: "Raval", basePricePerNight: 110, rating: 8.3, reviewCount: 1890, amenities: ["WiFi", "Bar rooftop", "Gym"] },
    { name: "Hostal Grau", stars: 2, zone: "Barrio Gótico", basePricePerNight: 48, rating: 8.0, reviewCount: 670, amenities: ["WiFi", "Recepción 24h"] },
    { name: "Mandarin Oriental", stars: 5, zone: "Paseo de Gracia", basePricePerNight: 350, rating: 9.4, reviewCount: 980, amenities: ["WiFi", "Spa", "Pool", "Restaurante Michelin", "Gym"] },
  ],
  PMI: [
    { name: "Hotel Portixol", stars: 4, zone: "Portixol", basePricePerNight: 130, rating: 8.7, reviewCount: 760, amenities: ["WiFi", "Piscina", "Restaurante", "Vistas al mar"] },
    { name: "Hostal Brondo", stars: 3, zone: "Centro Palma", basePricePerNight: 65, rating: 8.2, reviewCount: 430, amenities: ["WiFi", "Bar"] },
    { name: "Cap Vermell Grand", stars: 5, zone: "Canyamel", basePricePerNight: 320, rating: 9.3, reviewCount: 540, amenities: ["WiFi", "Spa", "Piscina", "Playa privada", "Restaurante"] },
  ],
  // Europa
  LIS: [
    { name: "Bairro Alto Hotel", stars: 5, zone: "Bairro Alto", basePricePerNight: 200, rating: 9.0, reviewCount: 1230, amenities: ["WiFi", "Spa", "Restaurante", "Bar"] },
    { name: "Hotel Memmo Alfama", stars: 4, zone: "Alfama", basePricePerNight: 120, rating: 8.6, reviewCount: 890, amenities: ["WiFi", "Piscina", "Vistas", "Bar"] },
    { name: "Pensão Amor", stars: 2, zone: "Cais do Sodré", basePricePerNight: 38, rating: 7.8, reviewCount: 540, amenities: ["WiFi", "Bar"] },
    { name: "Heritage Avenida Liberdade", stars: 4, zone: "Avenida Liberdade", basePricePerNight: 145, rating: 8.8, reviewCount: 1100, amenities: ["WiFi", "Desayuno", "Gym"] },
  ],
  FCO: [
    { name: "Hotel de Russie", stars: 5, zone: "Piazza del Popolo", basePricePerNight: 380, rating: 9.4, reviewCount: 890, amenities: ["WiFi", "Spa", "Piscina", "Restaurante"] },
    { name: "Pensione Navona", stars: 2, zone: "Navona", basePricePerNight: 55, rating: 8.1, reviewCount: 1230, amenities: ["WiFi", "Recepción 24h"] },
    { name: "Hotel Campo de' Fiori", stars: 3, zone: "Campo de' Fiori", basePricePerNight: 85, rating: 8.3, reviewCount: 780, amenities: ["WiFi", "Terraza"] },
    { name: "The Pantheon Iconic", stars: 5, zone: "Pantheon", basePricePerNight: 290, rating: 9.2, reviewCount: 560, amenities: ["WiFi", "Bar", "Vistas"] },
  ],
  CDG: [
    { name: "Hôtel Le Meurice", stars: 5, zone: "Tuileries", basePricePerNight: 450, rating: 9.5, reviewCount: 1100, amenities: ["WiFi", "Spa", "Restaurante Michelin", "Bar"] },
    { name: "Hotel Fabric", stars: 4, zone: "Oberkampf", basePricePerNight: 130, rating: 8.7, reviewCount: 980, amenities: ["WiFi", "Bar", "Gym"] },
    { name: "Generator Paris", stars: 2, zone: "Canal Saint-Martin", basePricePerNight: 35, rating: 7.6, reviewCount: 2100, amenities: ["WiFi", "Bar", "Cocina común"] },
    { name: "Hotel du Petit Moulin", stars: 4, zone: "Marais", basePricePerNight: 165, rating: 8.9, reviewCount: 450, amenities: ["WiFi", "Desayuno"] },
  ],
  LHR: [
    { name: "The Connaught", stars: 5, zone: "Mayfair", basePricePerNight: 520, rating: 9.6, reviewCount: 780, amenities: ["WiFi", "Spa", "Restaurante Michelin", "Bar"] },
    { name: "citizenM Tower of London", stars: 4, zone: "Tower Bridge", basePricePerNight: 140, rating: 8.8, reviewCount: 3200, amenities: ["WiFi", "Bar 24h", "Gym"] },
    { name: "Hoxton Shoreditch", stars: 4, zone: "Shoreditch", basePricePerNight: 115, rating: 8.5, reviewCount: 2100, amenities: ["WiFi", "Bar", "Restaurante"] },
    { name: "YHA London Central", stars: 1, zone: "Oxford Street", basePricePerNight: 28, rating: 7.5, reviewCount: 4500, amenities: ["WiFi", "Cocina", "Bar"] },
  ],
  BER: [
    { name: "Hotel Adlon Kempinski", stars: 5, zone: "Brandenburger Tor", basePricePerNight: 310, rating: 9.2, reviewCount: 1450, amenities: ["WiFi", "Spa", "Piscina", "Restaurante"] },
    { name: "Michelberger Hotel", stars: 3, zone: "Friedrichshain", basePricePerNight: 78, rating: 8.4, reviewCount: 2300, amenities: ["WiFi", "Bar", "Restaurante"] },
    { name: "Generator Berlin", stars: 2, zone: "Mitte", basePricePerNight: 32, rating: 7.7, reviewCount: 3100, amenities: ["WiFi", "Bar", "Gym"] },
  ],
  NRT: [
    { name: "The Tokyo Station Hotel", stars: 5, zone: "Marunouchi", basePricePerNight: 280, rating: 9.3, reviewCount: 1200, amenities: ["WiFi", "Spa", "Restaurante", "Bar"] },
    { name: "Shinjuku Granbell", stars: 4, zone: "Shinjuku", basePricePerNight: 120, rating: 8.6, reviewCount: 2100, amenities: ["WiFi", "Bar", "Restaurante"] },
    { name: "Capsule Hotel Anshin Oyado", stars: 2, zone: "Shinjuku", basePricePerNight: 38, rating: 8.0, reviewCount: 890, amenities: ["WiFi", "Onsen", "Gym"] },
    { name: "Aman Tokyo", stars: 5, zone: "Otemachi", basePricePerNight: 650, rating: 9.7, reviewCount: 560, amenities: ["WiFi", "Spa", "Piscina", "Restaurante", "Gym"] },
  ],
  BUD: [
    { name: "Aria Hotel Budapest", stars: 5, zone: "Centro", basePricePerNight: 190, rating: 9.3, reviewCount: 1100, amenities: ["WiFi", "Spa", "Piscina en tejado", "Bar"] },
    { name: "Hotel Moments", stars: 4, zone: "Andrássy", basePricePerNight: 85, rating: 8.5, reviewCount: 780, amenities: ["WiFi", "Gym", "Bar"] },
    { name: "Wombats Hostel", stars: 1, zone: "Keleti", basePricePerNight: 22, rating: 8.1, reviewCount: 4200, amenities: ["WiFi", "Bar", "Cocina"] },
  ],
  PRG: [
    { name: "Four Seasons Prague", stars: 5, zone: "Staré Město", basePricePerNight: 280, rating: 9.4, reviewCount: 890, amenities: ["WiFi", "Spa", "Restaurante", "Vistas al río"] },
    { name: "Hotel Josef", stars: 4, zone: "Josefov", basePricePerNight: 110, rating: 8.7, reviewCount: 1200, amenities: ["WiFi", "Gym", "Bar"] },
    { name: "Czech Inn Hostel", stars: 1, zone: "Vinohrady", basePricePerNight: 18, rating: 8.3, reviewCount: 2800, amenities: ["WiFi", "Cocina", "Bar"] },
  ],
  AMS: [
    { name: "Pulitzer Amsterdam", stars: 5, zone: "Jordaan", basePricePerNight: 260, rating: 9.1, reviewCount: 980, amenities: ["WiFi", "Restaurante", "Bar", "Jardín"] },
    { name: "Hotel V Nesplein", stars: 4, zone: "Jordaan", basePricePerNight: 130, rating: 8.6, reviewCount: 1100, amenities: ["WiFi", "Bar", "Gym"] },
    { name: "Stayokay Amsterdam", stars: 2, zone: "Vondelpark", basePricePerNight: 30, rating: 7.9, reviewCount: 3400, amenities: ["WiFi", "Bar", "Cocina"] },
  ],
  RAK: [
    { name: "La Mamounia", stars: 5, zone: "Medina", basePricePerNight: 380, rating: 9.5, reviewCount: 760, amenities: ["WiFi", "Spa", "Piscina", "Jardines", "Restaurante"] },
    { name: "Riad Be Marrakech", stars: 4, zone: "Medina", basePricePerNight: 95, rating: 9.0, reviewCount: 450, amenities: ["WiFi", "Piscina", "Desayuno"] },
    { name: "Riad Laaroussa", stars: 3, zone: "Medina", basePricePerNight: 55, rating: 8.6, reviewCount: 320, amenities: ["WiFi", "Patio", "Desayuno"] },
  ],
  IST: [
    { name: "Four Seasons Bosphorus", stars: 5, zone: "Beşiktaş", basePricePerNight: 320, rating: 9.5, reviewCount: 890, amenities: ["WiFi", "Spa", "Piscina", "Restaurante"] },
    { name: "Hotel Ibrahim Pasha", stars: 4, zone: "Sultanahmet", basePricePerNight: 110, rating: 8.8, reviewCount: 780, amenities: ["WiFi", "Terraza", "Desayuno"] },
    { name: "Marmara Guesthouse", stars: 2, zone: "Sultanahmet", basePricePerNight: 35, rating: 8.0, reviewCount: 1200, amenities: ["WiFi", "Desayuno"] },
  ],
  DXB: [
    { name: "Burj Al Arab", stars: 5, zone: "Jumeirah", basePricePerNight: 1200, rating: 9.6, reviewCount: 1100, amenities: ["WiFi", "Piscina privada", "Butler", "Spa", "Helipad"] },
    { name: "JW Marriott Marquis", stars: 5, zone: "Business Bay", basePricePerNight: 220, rating: 9.0, reviewCount: 2300, amenities: ["WiFi", "Spa", "Piscina", "Gym", "Restaurante"] },
    { name: "Rove Downtown", stars: 3, zone: "Downtown", basePricePerNight: 75, rating: 8.5, reviewCount: 3100, amenities: ["WiFi", "Piscina", "Gym"] },
  ],
  JFK: [
    { name: "The Beekman", stars: 5, zone: "Lower Manhattan", basePricePerNight: 350, rating: 9.2, reviewCount: 980, amenities: ["WiFi", "Bar", "Restaurante", "Gym"] },
    { name: "Pod 51", stars: 3, zone: "Midtown East", basePricePerNight: 120, rating: 8.0, reviewCount: 4500, amenities: ["WiFi", "Bar rooftop"] },
    { name: "HI NYC Hostel", stars: 1, zone: "Upper West Side", basePricePerNight: 45, rating: 7.8, reviewCount: 3200, amenities: ["WiFi", "Cocina", "Gym"] },
  ],
  ATH: [
    { name: "Hotel Grande Bretagne", stars: 5, zone: "Syntagma", basePricePerNight: 260, rating: 9.2, reviewCount: 1100, amenities: ["WiFi", "Spa", "Piscina rooftop", "Restaurante"] },
    { name: "New Hotel", stars: 4, zone: "Syntagma", basePricePerNight: 120, rating: 8.7, reviewCount: 890, amenities: ["WiFi", "Bar", "Restaurante"] },
    { name: "Athens Backpackers", stars: 1, zone: "Monastiraki", basePricePerNight: 22, rating: 8.4, reviewCount: 2800, amenities: ["WiFi", "Bar rooftop", "Cocina"] },
  ],

  // Egipto
  CAI: [
    { name: "Marriott Mena House", stars: 5, zone: "Pirámides de Giza", basePricePerNight: 160, rating: 9.0, reviewCount: 3200, amenities: ["WiFi", "Piscina", "Spa", "Restaurante", "Vistas Pirámides"] },
    { name: "Four Seasons Nile Plaza", stars: 5, zone: "Orilla del Nilo", basePricePerNight: 220, rating: 9.3, reviewCount: 1800, amenities: ["WiFi", "Piscina", "Spa", "Restaurante Nilo"] },
    { name: "Kempinski Nile Hotel", stars: 5, zone: "Garden City", basePricePerNight: 180, rating: 8.9, reviewCount: 1200, amenities: ["WiFi", "Piscina", "Gym", "Restaurante"] },
    { name: "Steigenberger El Tahrir", stars: 4, zone: "Tahrir", basePricePerNight: 75, rating: 8.2, reviewCount: 980, amenities: ["WiFi", "Desayuno", "Gym"] },
  ],
  HRG: [
    { name: "Siva Grand Beach", stars: 5, zone: "Playa Norte", basePricePerNight: 95, rating: 8.8, reviewCount: 4500, amenities: ["WiFi", "Piscina", "Todo incluido", "Playa privada", "Spa"] },
    { name: "Hilton Hurghada Plaza", stars: 5, zone: "Corniche", basePricePerNight: 120, rating: 9.0, reviewCount: 2800, amenities: ["WiFi", "Piscina", "Playa", "Restaurante", "Spa"] },
    { name: "Sunny Days Resort", stars: 4, zone: "Sahl Hasheesh", basePricePerNight: 60, rating: 8.4, reviewCount: 3100, amenities: ["WiFi", "Todo incluido", "Piscinas", "Animación"] },
    { name: "Jasmine Village", stars: 3, zone: "Dahar", basePricePerNight: 35, rating: 7.9, reviewCount: 890, amenities: ["WiFi", "Piscina", "Desayuno"] },
  ],
  SSH: [
    { name: "Rixos Premium Seagate", stars: 5, zone: "Nabq Bay", basePricePerNight: 130, rating: 9.1, reviewCount: 3400, amenities: ["WiFi", "Todo incluido", "Playa privada", "Spa", "Piscinas"] },
    { name: "Savoy Sharm", stars: 5, zone: "Naama Bay", basePricePerNight: 110, rating: 8.9, reviewCount: 2200, amenities: ["WiFi", "Piscina", "Restaurante", "Spa"] },
    { name: "Shark's Bay Camp", stars: 2, zone: "Shark's Bay", basePricePerNight: 25, rating: 8.5, reviewCount: 760, amenities: ["WiFi", "Buceo", "Snorkel", "Restaurante"] },
  ],
  LXR: [
    { name: "Sofitel Winter Palace", stars: 5, zone: "Orilla Este", basePricePerNight: 140, rating: 9.2, reviewCount: 1800, amenities: ["WiFi", "Piscina", "Jardines históricos", "Restaurante"] },
    { name: "Jolie Ville Kings Island", stars: 5, zone: "Isla en el Nilo", basePricePerNight: 110, rating: 8.8, reviewCount: 1200, amenities: ["WiFi", "Piscina", "Vistas Nilo", "Restaurante"] },
    { name: "Nefertiti Hotel", stars: 3, zone: "Centro Luxor", basePricePerNight: 28, rating: 8.0, reviewCount: 540, amenities: ["WiFi", "Rooftop", "Desayuno"] },
  ],

  // Oriente Medio
  DOH: [
    { name: "Mandarin Oriental Doha", stars: 5, zone: "Msheireb", basePricePerNight: 280, rating: 9.2, reviewCount: 980, amenities: ["WiFi", "Spa", "Piscina", "Restaurante"] },
    { name: "W Doha", stars: 5, zone: "West Bay", basePricePerNight: 220, rating: 9.0, reviewCount: 1400, amenities: ["WiFi", "Piscina infinita", "Spa", "Gym"] },
    { name: "Marriott Marquis City Center", stars: 5, zone: "City Center", basePricePerNight: 150, rating: 8.7, reviewCount: 1200, amenities: ["WiFi", "Piscina", "Restaurante", "Gym"] },
  ],
  AMM: [
    { name: "Four Seasons Amman", stars: 5, zone: "5th Circle", basePricePerNight: 180, rating: 9.2, reviewCount: 890, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Intercontinental Amman", stars: 5, zone: "Shmeisani", basePricePerNight: 130, rating: 8.8, reviewCount: 760, amenities: ["WiFi", "Piscina", "Gym", "Restaurante"] },
    { name: "Hayat Amman", stars: 3, zone: "Centro", basePricePerNight: 45, rating: 8.0, reviewCount: 430, amenities: ["WiFi", "Desayuno"] },
  ],
  TLV: [
    { name: "The Jaffa Tel Aviv", stars: 5, zone: "Jaffa Old City", basePricePerNight: 350, rating: 9.4, reviewCount: 890, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Mendeli Street Hotel", stars: 4, zone: "Frente al mar", basePricePerNight: 180, rating: 8.8, reviewCount: 1100, amenities: ["WiFi", "Playa", "Bar rooftop"] },
    { name: "Abraham Hostel", stars: 2, zone: "Centro", basePricePerNight: 30, rating: 8.6, reviewCount: 3200, amenities: ["WiFi", "Cocina", "Bar", "Tours"] },
  ],

  // África
  NBO: [
    { name: "Tribe Hotel", stars: 5, zone: "Gigiri", basePricePerNight: 180, rating: 9.1, reviewCount: 760, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Sarova Stanley", stars: 4, zone: "Centro Nairobi", basePricePerNight: 110, rating: 8.5, reviewCount: 890, amenities: ["WiFi", "Piscina", "Gym"] },
    { name: "Ole Sereni", stars: 4, zone: "Parque Nacional", basePricePerNight: 140, rating: 8.8, reviewCount: 560, amenities: ["WiFi", "Vistas Safari", "Piscina"] },
  ],
  ZNZ: [
    { name: "Zuri Zanzibar", stars: 5, zone: "Kendwa", basePricePerNight: 250, rating: 9.4, reviewCount: 680, amenities: ["WiFi", "Piscina infinita", "Playa privada", "Spa"] },
    { name: "Baraza Resort", stars: 5, zone: "Bwejuu", basePricePerNight: 300, rating: 9.5, reviewCount: 480, amenities: ["WiFi", "Piscina", "Playa", "Spa", "Buceo"] },
    { name: "Swahili Beach Resort", stars: 4, zone: "Pwani Mchangani", basePricePerNight: 95, rating: 8.7, reviewCount: 760, amenities: ["WiFi", "Piscina", "Restaurante"] },
    { name: "Emerson Spice", stars: 3, zone: "Stone Town", basePricePerNight: 60, rating: 9.0, reviewCount: 320, amenities: ["WiFi", "Rooftop", "Desayuno"] },
  ],
  CPT: [
    { name: "The Silo Hotel", stars: 5, zone: "V&A Waterfront", basePricePerNight: 450, rating: 9.6, reviewCount: 560, amenities: ["WiFi", "Piscina rooftop", "Spa", "Restaurante"] },
    { name: "Cape Grace", stars: 5, zone: "Waterfront", basePricePerNight: 280, rating: 9.3, reviewCount: 1100, amenities: ["WiFi", "Spa", "Restaurante", "Vistas"] },
    { name: "Protea Hotel Sea Point", stars: 4, zone: "Sea Point", basePricePerNight: 95, rating: 8.4, reviewCount: 890, amenities: ["WiFi", "Gym", "Bar"] },
    { name: "Long Street Backpackers", stars: 1, zone: "Bo-Kaap", basePricePerNight: 18, rating: 8.1, reviewCount: 1200, amenities: ["WiFi", "Cocina", "Bar"] },
  ],
  TUN: [
    { name: "La Badira", stars: 5, zone: "Hammamet", basePricePerNight: 110, rating: 9.0, reviewCount: 780, amenities: ["WiFi", "Piscina", "Spa", "Playa", "Restaurante"] },
    { name: "Les Orangers Beach Resort", stars: 4, zone: "Hammamet Norte", basePricePerNight: 70, rating: 8.3, reviewCount: 1200, amenities: ["WiFi", "Todo incluido", "Piscina"] },
    { name: "Hotel Majestic Tunis", stars: 4, zone: "Centro Túnez", basePricePerNight: 55, rating: 7.9, reviewCount: 540, amenities: ["WiFi", "Restaurante"] },
  ],

  // Asia
  ICN: [
    { name: "Grand Hyatt Seoul", stars: 5, zone: "Itaewon", basePricePerNight: 220, rating: 9.1, reviewCount: 1800, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "L7 Myeongdong", stars: 4, zone: "Myeongdong", basePricePerNight: 110, rating: 8.7, reviewCount: 2100, amenities: ["WiFi", "Gym", "Bar rooftop"] },
    { name: "Airbnb-style Guesthouse", stars: 2, zone: "Hongdae", basePricePerNight: 35, rating: 8.4, reviewCount: 980, amenities: ["WiFi", "Cocina", "Zona social"] },
  ],
  KUL: [
    { name: "Mandarin Oriental KL", stars: 5, zone: "City Centre", basePricePerNight: 160, rating: 9.0, reviewCount: 2100, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "The Majestic Hotel", stars: 5, zone: "Brickfields", basePricePerNight: 130, rating: 8.8, reviewCount: 1200, amenities: ["WiFi", "Piscina", "Spa"] },
    { name: "Tune Hotel KLIA", stars: 2, zone: "Bukit Bintang", basePricePerNight: 28, rating: 7.8, reviewCount: 3400, amenities: ["WiFi", "AC"] },
  ],
  REP: [
    { name: "Raffles Grand Hotel Angkor", stars: 5, zone: "Centro Siem Reap", basePricePerNight: 220, rating: 9.3, reviewCount: 890, amenities: ["WiFi", "Piscina", "Spa", "Restaurante colonial"] },
    { name: "Park Hyatt Siem Reap", stars: 5, zone: "Pub Street", basePricePerNight: 180, rating: 9.1, reviewCount: 1100, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Onederz Hostel", stars: 1, zone: "Pub Street", basePricePerNight: 12, rating: 8.7, reviewCount: 2800, amenities: ["WiFi", "Bar", "Piscina"] },
  ],
  PEK: [
    { name: "The Peninsula Beijing", stars: 5, zone: "Wangfujing", basePricePerNight: 280, rating: 9.2, reviewCount: 1200, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Novotel Peace Beijing", stars: 4, zone: "Jinyu Hutong", basePricePerNight: 90, rating: 8.3, reviewCount: 1800, amenities: ["WiFi", "Gym", "Restaurante"] },
    { name: "Leo Hostel", stars: 1, zone: "Hutong", basePricePerNight: 18, rating: 8.5, reviewCount: 2400, amenities: ["WiFi", "Cocina", "Bar"] },
  ],
  PVG: [
    { name: "The Peninsula Shanghai", stars: 5, zone: "Bund", basePricePerNight: 320, rating: 9.4, reviewCount: 1100, amenities: ["WiFi", "Piscina", "Spa", "Restaurante Bund"] },
    { name: "URBN Hotel", stars: 4, zone: "Jing'an", basePricePerNight: 120, rating: 8.8, reviewCount: 760, amenities: ["WiFi", "Bar", "Diseño"] },
    { name: "Mingtown Youth Hostel", stars: 1, zone: "People's Square", basePricePerNight: 15, rating: 8.2, reviewCount: 3100, amenities: ["WiFi", "Cocina", "Tours"] },
  ],
  KTM: [
    { name: "Dwarika's Hotel", stars: 5, zone: "Battisputali", basePricePerNight: 150, rating: 9.5, reviewCount: 780, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Hyatt Regency Kathmandu", stars: 5, zone: "Bouddha", basePricePerNight: 120, rating: 8.9, reviewCount: 980, amenities: ["WiFi", "Piscina", "Gym", "Restaurante"] },
    { name: "Thamel Eco Resort", stars: 2, zone: "Thamel", basePricePerNight: 20, rating: 8.3, reviewCount: 1800, amenities: ["WiFi", "Terraza", "Desayuno"] },
  ],
  CMB: [
    { name: "Galle Face Hotel", stars: 5, zone: "Galle Face", basePricePerNight: 130, rating: 8.8, reviewCount: 1200, amenities: ["WiFi", "Piscina", "Restaurante histórico", "Playa"] },
    { name: "Cinnamon Grand", stars: 5, zone: "Colombo 3", basePricePerNight: 110, rating: 8.6, reviewCount: 1800, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Havelock Place Bungalow", stars: 3, zone: "Colombo 5", basePricePerNight: 45, rating: 8.9, reviewCount: 340, amenities: ["WiFi", "Jardín", "Desayuno"] },
  ],

  // América
  LIM: [
    { name: "Belmond Miraflores Park", stars: 5, zone: "Miraflores", basePricePerNight: 200, rating: 9.2, reviewCount: 890, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Casa Andina Premium", stars: 4, zone: "San Isidro", basePricePerNight: 85, rating: 8.5, reviewCount: 1200, amenities: ["WiFi", "Gym", "Restaurante"] },
    { name: "Punto Hostel Barranco", stars: 2, zone: "Barranco", basePricePerNight: 22, rating: 8.7, reviewCount: 2100, amenities: ["WiFi", "Bar", "Cocina", "Piscina"] },
  ],
  PUJ: [
    { name: "Hard Rock Hotel Punta Cana", stars: 5, zone: "Macao Beach", basePricePerNight: 180, rating: 9.0, reviewCount: 4500, amenities: ["WiFi", "Todo incluido", "Piscinas", "Playa", "Casino"] },
    { name: "Breathless Punta Cana", stars: 5, zone: "Uvero Alto", basePricePerNight: 150, rating: 8.8, reviewCount: 2800, amenities: ["WiFi", "Todo incluido", "Playa", "Spa", "Adultos solo"] },
    { name: "Whala!bávaro", stars: 4, zone: "Bávaro", basePricePerNight: 70, rating: 8.2, reviewCount: 1800, amenities: ["WiFi", "Todo incluido", "Piscina"] },
  ],
  YYZ: [
    { name: "Four Seasons Toronto", stars: 5, zone: "Yorkville", basePricePerNight: 380, rating: 9.3, reviewCount: 890, amenities: ["WiFi", "Piscina", "Spa", "Restaurante"] },
    { name: "Thompson Toronto", stars: 4, zone: "King West", basePricePerNight: 150, rating: 8.6, reviewCount: 1400, amenities: ["WiFi", "Pool rooftop", "Bar"] },
    { name: "HI Toronto", stars: 1, zone: "Downtown", basePricePerNight: 35, rating: 8.0, reviewCount: 2200, amenities: ["WiFi", "Cocina", "Gym"] },
  ],

  // Oceanía
  SYD: [
    { name: "Park Hyatt Sydney", stars: 5, zone: "The Rocks", basePricePerNight: 480, rating: 9.5, reviewCount: 1200, amenities: ["WiFi", "Piscina rooftop", "Spa", "Vistas Opera House"] },
    { name: "QT Sydney", stars: 5, zone: "CBD", basePricePerNight: 220, rating: 9.0, reviewCount: 1800, amenities: ["WiFi", "Bar", "Restaurante", "Gym"] },
    { name: "Sydney Harbour YHA", stars: 2, zone: "The Rocks", basePricePerNight: 42, rating: 8.7, reviewCount: 4200, amenities: ["WiFi", "Cocina", "Vistas Harbour"] },
  ],
};

// Hoteles genéricos para destinos sin catálogo específico
const GENERIC_HOTELS: HotelTemplate[] = [
  { name: "Grand Hotel Central", stars: 4, zone: "Centro ciudad", basePricePerNight: 110, rating: 8.5, reviewCount: 980, amenities: ["WiFi", "Desayuno", "Gym"] },
  { name: "Hotel Boutique Plaza", stars: 3, zone: "Centro histórico", basePricePerNight: 70, rating: 8.2, reviewCount: 560, amenities: ["WiFi", "Bar", "Terraza"] },
  { name: "Hostel Urban", stars: 2, zone: "Centro", basePricePerNight: 30, rating: 7.8, reviewCount: 1200, amenities: ["WiFi", "Cocina común", "Bar"] },
  { name: "Luxury Suites & Spa", stars: 5, zone: "Primera línea", basePricePerNight: 250, rating: 9.1, reviewCount: 430, amenities: ["WiFi", "Spa", "Piscina", "Restaurante"] },
];

function buildBookingUrl(city: string, checkin: string, checkout: string, adults: number): string {
  const params = new URLSearchParams({
    ss: city,
    checkin: checkin,
    checkout: checkout,
    group_adults: String(adults),
    no_rooms: "1",
  });
  return `https://www.booking.com/searchresults.es.html?${params}`;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function scoreHotel(hotel: HotelResult, request: ParsedTravelRequest, minPrice: number, maxPrice: number): number {
  let score = 50;
  const priceRange = maxPrice - minPrice || 1;
  score += ((maxPrice - hotel.pricePerNight) / priceRange) * 25;
  score += (hotel.rating - 7) * 5;
  if (hotel.stars >= 4) score += 10;
  if (request.budget) {
    const hotelBudget = request.budget * 0.4; // asumimos 40% del presupuesto para hotel
    if (hotel.pricePerNight <= hotelBudget) score += 15;
  }
  // Preferencias
  if (request.tripType === "romantic" && hotel.stars >= 4) score += 10;
  if (request.tripType === "beach" && hotel.amenities.includes("Piscina")) score += 8;
  if (request.preferences?.includes("precio bajo") && hotel.stars <= 3) score += 10;
  return Math.round(Math.min(100, Math.max(0, score)));
}

export function getHotels(request: ParsedTravelRequest): HotelResult[] {
  const destCode = request.destinationAirportCode ?? "MAD";
  const destCity = request.destination ?? "Madrid";
  const adults = request.passengers ?? 1;

  const checkin = request.departureDate ?? (() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  })();
  const nights = request.durationDays ?? 3;
  const checkout = addDays(checkin, nights);

  const templates = HOTEL_CATALOG[destCode] ?? GENERIC_HOTELS;

  const hotels: HotelResult[] = templates.map((t, i) => {
    const variance = 0.9 + Math.random() * 0.2;
    const pricePerNight = Math.round(t.basePricePerNight * variance);
    const totalPrice = pricePerNight * nights;

    return {
      id: `hotel-${destCode}-${i}`,
      name: t.name,
      city: destCity,
      country: "",
      stars: t.stars,
      pricePerNight,
      totalPrice,
      currency: "EUR",
      rating: t.rating,
      reviewCount: t.reviewCount,
      amenities: t.amenities,
      zone: t.zone,
      bookingUrl: buildBookingUrl(destCity, checkin, checkout, adults),
      score: 0,
      badges: [],
      recommendationReason: "",
    };
  });

  const minPrice = Math.min(...hotels.map((h) => h.pricePerNight));
  const maxPrice = Math.max(...hotels.map((h) => h.pricePerNight));

  const scored = hotels
    .map((h) => ({ ...h, score: scoreHotel(h, request, minPrice, maxPrice) }))
    .sort((a, b) => b.score - a.score);

  // Badges
  return scored.map((h, i): HotelResult => {
    const badges: HotelBadge[] = [];
    if (h.pricePerNight === minPrice) badges.push("cheapest");
    if (h.rating >= 9.0) badges.push("top_rated");
    if (i === 0) badges.push("recommended");
    if (i > 0 && i < 3 && !badges.includes("cheapest")) badges.push("best_value");

    const reason = h.pricePerNight === minPrice
      ? `Opción más económica: ${h.pricePerNight}€/noche (total ${h.totalPrice}€ por ${nights} noches).`
      : h.rating >= 9.0
      ? `Valoración excepcional (${h.rating}/10) con ${h.reviewCount.toLocaleString()} reseñas. Zona: ${h.zone}.`
      : i === 0
      ? `Mejor equilibrio calidad/precio para ${nights} noches. ${h.amenities.slice(0, 3).join(", ")}.`
      : `Buena opción en ${h.zone}. ${h.stars} estrellas, ${h.rating}/10.`;

    return { ...h, badges, recommendationReason: reason };
  });
}
