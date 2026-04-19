import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FlyAI — Encuentra vuelos baratos con IA",
  description:
    "Deja de usar formularios aburridos. Describe tu viaje en lenguaje natural y la IA encontrará los mejores vuelos y destinos para ti.",
  keywords: ["vuelos baratos", "inteligencia artificial", "viajes", "comparador vuelos"],
  openGraph: {
    title: "FlyAI — Encuentra vuelos baratos con IA",
    description: "Describe tu viaje en lenguaje natural y la IA encuentra los mejores vuelos.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
