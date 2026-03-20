import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

let fontCache: Buffer | null = null;

async function loadFont() {
  if (!fontCache) {
    fontCache = await readFile(join(process.cwd(), "src/assets/fonts/IBMPlexSans-Bold.ttf"));
  }
  return fontCache;
}

export async function renderBrandIcon(size: number) {
  const fontData = await loadFont();

  const scale = size / 180;
  const fontSize = 100 * scale;
  const dotSize = 16 * scale;
  const dotRight = -20 * scale;
  const dotBottom = 12 * scale;
  const lineWidth = 116 * scale;
  const lineHeight = 8 * scale;
  const lineRadius = 4 * scale;
  const lineMarginTop = 4 * scale;
  const borderRadius = 40 * scale;
  const paddingBottom = 12 * scale;
  const marginLeft = -10 * scale;

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom,
          background: "linear-gradient(135deg, #1a1a2e, #0f0f1a)",
          borderRadius,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              lineHeight: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "IBM Plex Sans",
                fontSize,
                fontWeight: 700,
                color: "#e2e8f0",
                marginLeft,
              }}
            >
              S
            </div>
            <div
              style={{
                position: "absolute",
                right: dotRight,
                bottom: dotBottom,
                width: dotSize,
                height: dotSize,
                background: "#e2e8f0",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: lineWidth,
              height: lineHeight,
              borderRadius: lineRadius,
              background: "#38bdf8",
              opacity: 0.85,
              marginTop: lineMarginTop,
            }}
          />
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "IBM Plex Sans",
          data: fontData,
          weight: 700 as const,
          style: "normal" as const,
        },
      ],
    }
  );
}
