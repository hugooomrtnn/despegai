import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Despegai — Busca vuelos con inteligencia artificial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030712 0%, #0c1b33 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 36 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              background: "linear-gradient(135deg, #38bdf8, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
            }}
          >
            ✈️
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, color: "white" }}>
            Despeg<span style={{ color: "#fb923c" }}>ai</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#94a3b8", maxWidth: 900, textAlign: "center" }}>
          Busca vuelos con inteligencia artificial — escribe tu viaje en español
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {["226+ destinos", "IA en español", "Sin formularios"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                color: "#7dd3fc",
                fontSize: 24,
                fontWeight: 600,
                border: "2px solid rgba(125,211,252,0.35)",
                borderRadius: 999,
                padding: "10px 24px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
