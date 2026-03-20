import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e, #0f0f1a)",
          borderRadius: 40,
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 100,
            fontWeight: 700,
            color: "#e2e8f0",
            letterSpacing: -2,
          }}
        >
          S.
        </span>
        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: 32,
            right: 32,
            height: 8,
            borderRadius: 4,
            background: "#38bdf8",
            opacity: 0.85,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
