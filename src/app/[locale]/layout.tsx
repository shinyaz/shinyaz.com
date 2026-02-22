import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GTM, GTMNoScript } from "@/components/common/gtm";
import { SITE_URL } from "@/lib/constants";
import { locales, isValidLocale, getDictionary, type Locale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic-new",
  weight: ["400", "700"],
  preload: false,
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);

  const alternateLanguages: Record<string, string> = {};
  for (const l of locales) {
    alternateLanguages[l] = `${SITE_URL}/${l}`;
  }

  return {
    title: {
      default: t.site.name,
      template: `%s | ${t.site.name}`,
    },
    description: t.site.description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: t.site.name,
      description: t.site.description,
      url: `${SITE_URL}/${locale}`,
      siteName: t.site.name,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: alternateLanguages,
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GTM />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zenKakuGothicNew.variable} antialiased min-h-dvh flex flex-col`}
      >
        <GTMNoScript />
        <ThemeProvider>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
