import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SerwistProvider } from "@/components/pwa/serwist-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GTM, GTMNoScript } from "@/components/common/gtm";
import { SITE_URL, AUTHOR, OG_IMAGE_PATH, TWITTER_SITE } from "@/lib/constants";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ibmPlexSansJP = IBM_Plex_Sans_JP({
  variable: "--font-ibm-plex-sans-jp",
  weight: ["400", "500", "700"],
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
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: t.site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_SITE,
      creator: TWITTER_SITE,
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
  const t = getDictionary(locale);

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t.site.name,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    publisher: {
      "@type": "Person",
      name: AUTHOR,
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GTM />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${t.site.name} (RSS)`}
          href={`/${locale}/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${t.site.name} (Atom)`}
          href={`/${locale}/atom.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${ibmPlexSansJP.variable} antialiased min-h-dvh flex flex-col`}
      >
        <GTMNoScript />
        <Analytics />
        <SpeedInsights />
        <SerwistProvider swUrl="/serwist/sw.js">
          <ThemeProvider>
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
