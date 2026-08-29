import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #38bdf8, #2563eb)",
          borderRadius: 16,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, transform: "rotate(45deg)" }}>✈️</div>
      </div>
    ),
    { ...size }
  );
}
