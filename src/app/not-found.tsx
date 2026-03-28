import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, isValidLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  robots: { index: false },
};

function extractLocale(url: string): string | undefined {
  try {
    return new URL(url).pathname.split("/")[1] || undefined;
  } catch {
    return url.split("/")[1] || undefined;
  }
}

export default async function RootNotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const referer = headersList.get("referer") ?? "";
  const candidate = extractLocale(pathname) || extractLocale(referer) || defaultLocale;
  const locale = isValidLocale(candidate) ? candidate : defaultLocale;
  const t = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center md:py-24">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-muted-foreground">{t.notFound.message}</p>
      <Link
        href={`/${locale}`}
        className="mt-6 inline-block rounded-md border border-border px-4 py-2 text-sm hover:bg-accent transition-colors"
      >
        {t.notFound.backHome}
      </Link>
    </div>
  );
}
