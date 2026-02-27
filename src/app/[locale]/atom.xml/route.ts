import { locales, isValidLocale } from "@/lib/i18n";
import { generateAtom } from "@/lib/feed";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return new Response("Not Found", { status: 404 });
  }

  const xml = generateAtom(locale);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
