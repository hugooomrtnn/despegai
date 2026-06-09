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
      <head>
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
