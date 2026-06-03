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
  title: "FlyAI — Vuelos a cualquier destino con IA",
  description:
    "Describe tu viaje en español y la IA encuentra los mejores vuelos, hoteles y plan para ti en segundos. Sin formularios, sin complicaciones.",
  keywords: ["vuelos baratos", "inteligencia artificial", "viajes", "comparador vuelos", "agencias viaje"],
  openGraph: {
    title: "FlyAI — Vuelos a cualquier destino con IA",
    description: "Describe tu viaje en español y la IA encuentra los mejores vuelos en segundos.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={font.variable}>
      <body className="min-h-screen antialiased font-[var(--font-sans)]">
        <Header />
        {children}
      </body>
    </html>
  );
}
