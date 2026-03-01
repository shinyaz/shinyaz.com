import type { Locale } from "./i18n";

interface OgImageLayoutProps {
  title: string;
  date: string;
  category?: string;
  author: string;
  siteName: string;
  locale: Locale;
}

export function OgImageLayout({
  title,
  date,
  category,
  author,
  siteName,
}: OgImageLayoutProps) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        backgroundColor: "#fafafa",
        fontFamily: "IBM Plex Sans, IBM Plex Sans JP",
      }}
    >
      {/* Top: category badge + date */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {category && (
          <div
            style={{
              fontSize: "20px",
              color: "#111111",
              backgroundColor: "#e5e5e5",
              padding: "4px 16px",
              borderRadius: "4px",
              fontWeight: 700,
            }}
          >
            {category}
          </div>
        )}
        <div style={{ fontSize: "20px", color: "#737373" }}>{date}</div>
      </div>

      {/* Center: title */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: title.length > 40 ? "42px" : "52px",
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>
      </div>

      {/* Bottom: author + site name */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "24px", color: "#737373", fontWeight: 700 }}>
          {author}
        </div>
        <div style={{ fontSize: "24px", color: "#737373" }}>{siteName}</div>
      </div>
    </div>
  );
}
