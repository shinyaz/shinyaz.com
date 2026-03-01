import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPostBySlug, getCategoryBySlug, getCategoryName } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { isValidLocale } from "@/lib/i18n";
import { AUTHOR } from "@/lib/constants";
import { generateBlogStaticParams } from "@/lib/blog-params";
import { OgImageLayout } from "@/lib/og-image";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = generateBlogStaticParams;

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

  const post = getPostBySlug(year, month, day, slug, locale);
  if (!post) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const { fontSans, fontSansJP } = await loadFonts();

  const categorySlug = post.categories[0];
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const categoryName = category ? getCategoryName(category, locale) : undefined;

  const formattedDate = formatDate(post.date, locale);

  return new ImageResponse(
    (
      <OgImageLayout
        title={post.title}
        date={formattedDate}
        category={categoryName}
        author={AUTHOR}
        siteName="shinyaz.com"
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
