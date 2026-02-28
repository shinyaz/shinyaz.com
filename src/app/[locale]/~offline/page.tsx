import { notFound } from "next/navigation";
import { isValidLocale, getDictionary } from "@/lib/i18n";

interface OfflinePageProps {
  params: Promise<{ locale: string }>;
}

export default async function OfflinePage({ params }: OfflinePageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center md:py-24">
      <h1 className="text-3xl font-bold tracking-tight">{t.offline.title}</h1>
      <p className="mt-4 text-muted-foreground">
        {t.offline.message}
      </p>
    </div>
  );
}
