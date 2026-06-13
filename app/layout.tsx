import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Despegai — Busca vuelos con inteligencia artificial",
  description:
    "Escribe tu viaje en español y la IA encuentra los mejores vuelos, hoteles y plan para ti en segundos. Sin formularios, sin complicaciones.",
  keywords: ["vuelos baratos", "inteligencia artificial", "viajes", "comparador vuelos", "buscar vuelos IA", "despegai", "vuelos baratos españa", "buscador vuelos ia"],
  metadataBase: new URL("https://despegai.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Despegai — Busca vuelos con inteligencia artificial",
    description: "Escribe tu viaje en español y la IA encuentra los mejores vuelos, hoteles y plan de viaje en segundos. Sin formularios.",
    type: "website",
    url: "https://despegai.vercel.app",
    siteName: "Despegai",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Despegai — Busca vuelos con IA",
    description: "Describe tu viaje en español. La IA lo encuentra todo en segundos.",
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
  url: "https://despegai.vercel.app",
  description: "Buscador de vuelos con inteligencia artificial en español. Escribe tu viaje y la IA encuentra vuelos, hoteles y plan de viaje en segundos.",
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
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1669085762524524"
          crossOrigin="anonymous"
        />
        {/* Travelpayouts Drive — debe estar en el HTML inicial para ser detectado */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.createElement('script');s.async=1;s.src='https://emrldtp.com/NTM2Mzkx.js?t=536391';document.head.appendChild(s);})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased font-[var(--font-sans)]">
        <Header />
        {children}
      </body>
    </html>
  );
}
