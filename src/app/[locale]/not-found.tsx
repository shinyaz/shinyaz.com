import Link from "next/link";
import { headers } from "next/headers";
import { defaultLocale, isValidLocale, getDictionary } from "@/lib/i18n";

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const segments = pathname.split("/");
  const localeSegment = segments[1] ?? defaultLocale;
  const locale = isValidLocale(localeSegment) ? localeSegment : defaultLocale;
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
