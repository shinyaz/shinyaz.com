import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTilBySlug } from "@/lib/tils";
import { formatDate } from "@/lib/utils";
import { isValidLocale } from "@/lib/i18n";
import { AUTHOR } from "@/lib/constants";
import { generateTilStaticParams } from "@/lib/til-params";
import { OgImageLayout } from "@/lib/og-image";

export const alt = "TIL post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = generateTilStaticParams;

let fontSansCache: Buffer | null = null;
let fontSansJPCache: Buffer | null = null;

async function loadFonts() {
  if (!fontSansCache) {
    fontSansCache = await readFile(
      join(process.cwd(), "src/assets/fonts/IBMPlexSans-Bold.ttf")
    );
  }
  if (!fontSansJPCache) {
    fontSansJPCache = await readFile(
      join(process.cwd(), "src/assets/fonts/IBMPlexSansJP-Bold.ttf")
    );
  }
  return { fontSans: fontSansCache, fontSansJP: fontSansJPCache };
}

interface Props {
  params: Promise<{ locale: string; year: string; month: string; day: string; slug: string }>;
}

export default async function OgImage({ params }: Props) {
  const { locale, year, month, day, slug } = await params;

  if (!isValidLocale(locale)) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const til = getTilBySlug(year, month, day, slug, locale);
  if (!til) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const { fontSans, fontSansJP } = await loadFonts();

  const formattedDate = formatDate(til.date, locale);

  return new ImageResponse(
    (
      <OgImageLayout
        title={til.title}
        date={formattedDate}
        category="TIL"
        author={AUTHOR}
        siteName="@shinyaz"
        locale={locale}
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Sans",
          data: fontSans,
          weight: 700,
          style: "normal",
        },
        {
          name: "IBM Plex Sans JP",
          data: fontSansJP,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
