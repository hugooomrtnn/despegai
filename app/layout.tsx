import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
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
  keywords: ["vuelos baratos", "inteligencia artificial", "viajes", "comparador vuelos", "buscar vuelos IA", "despegai"],
  openGraph: {
    title: "Despegai — Busca vuelos con inteligencia artificial",
    description: "Escribe tu viaje en español y la IA encuentra los mejores vuelos en segundos.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={font.variable}>
      <body className="min-h-screen antialiased font-[var(--font-sans)]">
        {/* Travelpayouts Drive — tracking de conversiones */}
        <Script
          id="travelpayouts-drive"
          src="https://emrldtp.com/NTM2MzE3.js?t=536317"
          strategy="beforeInteractive"
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
