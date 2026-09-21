import type { Metadata } from 'next';
import { fontDisplay, fontSans } from '@/lib/fonts';
import { site } from '@/lib/site';
import { env } from '@/lib/env';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { Analytics } from '@/components/Analytics';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/seo/jsonld';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${site.name} — Natural Stone Slabs`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — Natural Stone Slabs`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body className="font-sans text-fluid-base antialiased">
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics gaId={env.gaId} />
      </body>
    </html>
  );
}
