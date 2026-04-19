# FlyAI ✈️

**Encuentra vuelos baratos hablando con una IA.**

FlyAI es una plataforma inteligente para descubrir vuelos baratos y destinos usando lenguaje natural. En lugar de rellenar formularios aburridos, simplemente describes qué tipo de viaje quieres y la IA hace el resto.

## El problema que resuelve

Buscar vuelos baratos es tedioso: hay que saber el origen exacto, el destino exacto, las fechas, los filtros… FlyAI permite decir simplemente *"quiero playa barata desde Madrid en julio"* y recibir recomendaciones relevantes automáticamente.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** estricto
- **Tailwind CSS** + **shadcn/ui** components
- **lucide-react** para iconos
- **Supabase** para base de datos y autenticación (opcional)
- **Claude / OpenAI** para parsing de lenguaje natural (con fallback a mock)
- **Arquitectura modular** para conectar APIs reales de vuelos

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Lanzar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Variables de entorno

Copia `.env.example` a `.env.local`. **La app funciona con todo vacío en modo demo.**

```env
# Supabase (opcional — la app funciona sin él)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# IA (opcional — usa reglas básicas si no está configurado)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Proveedor de vuelos: "mock" por defecto
FLIGHT_API_PROVIDER=mock
```

## Modo mock (demo)

Sin configurar ninguna API key, la app usa:

- **`mockParseTravelPrompt`**: extrae origen, destino, fechas, presupuesto y preferencias mediante reglas básicas en español.
- **`mockFlightProvider`**: genera vuelos realistas para 15+ destinos europeos con precios, horarios, aerolíneas y duraciones variables.
- Todo funciona sin conexión a internet.

## Conectar una API real de vuelos

1. Elige tu proveedor: `amadeus`, `kiwi`, o `serpapi`
2. Añade las keys correspondientes en `.env.local`
3. Cambia `FLIGHT_API_PROVIDER=mock` por el proveedor elegido
4. Implementa la función en `lib/flights/realFlightProvider.ts`

El sistema hace fallback automático a mock si la API real falla.

### Proveedores soportados (a implementar)

| Proveedor | URL | Notas |
|-----------|-----|-------|
| Amadeus | https://developers.amadeus.com | API robusta, requiere OAuth2 |
| Kiwi/Tequila | https://tequila.kiwi.com | API flexible, muy popular |
| SerpAPI | https://serpapi.com/google-flights-api | Scraping de Google Flights |

## Arquitectura

```
app/
  page.tsx                    # Página principal (cliente)
  layout.tsx                  # Layout con Header
  api/
    travel-search/route.ts    # POST /api/travel-search

components/
  layout/Header.tsx           # Navegación
  travel/
    AITravelSearch.tsx        # Caja de búsqueda con IA
    ParsedRequestSummary.tsx  # Resumen de lo que entendió la IA
    DestinationRecommendations.tsx
    FlightResultsList.tsx     # Lista de vuelos con filtros
    FlightCard.tsx            # Card individual de vuelo
    SearchFilters.tsx         # Ordenar por precio/score/etc
    LoadingState.tsx
    ErrorState.tsx
    EmptyState.tsx

lib/
  ai/
    parseTravelPrompt.ts      # Orquestador IA (Claude → OpenAI → mock)
    mockParseTravelPrompt.ts  # Parser basado en reglas
  flights/
    flightProvider.ts         # Selección automática de proveedor
    mockFlightProvider.ts     # Datos simulados realistas
    realFlightProvider.ts     # Placeholder para APIs reales
    scoreFlight.ts            # Algoritmo de ranking de vuelos
  supabase/
    client.ts                 # Cliente browser
    server.ts                 # Cliente server-side
  utils.ts                    # Formateo de fechas/precios

types/travel.ts               # Tipos TypeScript centrales
supabase/schema.sql           # Schema con RLS
```

## Próximos pasos

- [ ] Conectar Amadeus o Kiwi para vuelos reales
- [ ] Autenticación con Supabase (Google, email/password)
- [ ] Guardar búsquedas favoritas por usuario
- [ ] Alertas de precio (notificaciones cuando baje el precio)
- [ ] Filtros avanzados (aerolínea, hora de salida, aeropuerto)
- [ ] Página de detalle del vuelo
- [ ] Soporte multi-idioma
- [ ] PWA para móvil
- [ ] Integración de hotel + vuelo (paquetes)
- [ ] Modo IA conversacional (chatbot de viajes)
