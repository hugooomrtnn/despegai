import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { Analytics } from "@vercel/analytics/react";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Despegai — Vuelos baratos con inteligencia artificial",
  description:
    "Busca vuelos baratos con IA: escribe tu viaje en español y encuentra los mejores precios en vuelos, hoteles y plan de viaje en segundos. Sin formularios.",
  keywords: ["vuelos baratos", "vuelos baratos con ia", "búsqueda de vuelos baratos", "inteligencia artificial", "viajes", "comparador vuelos", "buscar vuelos IA", "despegai", "vuelos baratos españa", "buscador vuelos ia"],
  metadataBase: new URL("https://www.despegai.net"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Despegai — Vuelos baratos con inteligencia artificial",
    description: "Busca vuelos baratos con IA: escribe tu viaje en español y encuentra los mejores precios en vuelos, hoteles y plan de viaje en segundos.",
    type: "website",
    url: "https://www.despegai.net",
    siteName: "Despegai",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Despegai — Vuelos baratos con IA",
    description: "Busca vuelos baratos con inteligencia artificial. Describe tu viaje en español y la IA lo encuentra todo en segundos.",
  },
  robots: { index: true, follow: true },
  other: {
    "google-adsense-account": "ca-pub-1669085762524524",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Despegai",
  url: "https://www.despegai.net",
  description: "Buscador de vuelos baratos con inteligencia artificial en español. Escribe tu viaje y la IA encuentra vuelos, hoteles y plan de viaje en segundos.",
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  inLanguage: "es",
  author: { "@type": "Organization", name: "Despegai" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={font.variable}>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense y Travelpayouts Drive ya no se cargan aquí sin permiso —
            <CookieConsent> los inyecta solo si el usuario da su consentimiento. */}
      </head>
      <body className="min-h-screen antialiased font-[var(--font-sans)]">
        <AuthProvider>
          <Header />
          {children}
          <CookieConsent />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
