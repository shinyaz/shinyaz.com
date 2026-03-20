import { type NextRequest, NextResponse } from "next/server";
import { isValidLocale, getDictionary, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 404 });
  }

  const t = getDictionary(locale);

  const manifest = {
    name: t.site.name,
    short_name: t.site.name,
    description: t.site.description,
    start_url: `/${locale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    lang: locale,
    icons: [
      {
        src: "/icons/icon-192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
