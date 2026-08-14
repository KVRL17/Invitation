import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google';
import './globals.css';

/** Production origin — used for all absolute social-sharing URLs. */
const SITE_URL = 'https://brinda-chaitanya-engagement-invitat.vercel.app';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Brinda & Chaitanya 💍 Engagement Invitation',
  description:
    'Together Forever Begins Here ❤️ Tap to open our engagement invitation.',
  keywords: ['engagement', 'invitation', 'wedding', 'save the date'],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Brinda & Chaitanya 💍 Engagement Invitation',
    description:
      'Together Forever Begins Here ❤️ Tap to open our engagement invitation.',
    images: [
      {
        // ?v=2 cache-buster: WhatsApp/other crawlers cache the preview image
        // by its URL, so bump this when the preview image is regenerated.
        url: `${SITE_URL}/whatsapp-preview.jpg?v=2`,
        width: 1200,
        height: 630,
        alt: 'Brinda & Chaitanya 💍 Engagement Invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brinda & Chaitanya 💍 Engagement Invitation',
    description:
      'Together Forever Begins Here ❤️ Tap to open our engagement invitation.',
    images: [`${SITE_URL}/whatsapp-preview.jpg?v=2`],
  },
};

export const viewport: Viewport = {
  themeColor: '#702F3B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <head>
        {/* Preload the couple photos during the intro so the
            "Meet the Couple" section renders instantly with no lag. */}
        <link rel="preload" as="image" href="/images/bride.jpeg?v=2" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/groome.jpeg?v=1" fetchPriority="high" />
        {/* Preload gallery images so they're ready before scroll reaches them. */}
        <link rel="preload" as="image" href="/gallery/DSC06696.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/gallery/DSC06722.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/gallery/DSC06694.webp" fetchPriority="low" />
        <link rel="preload" as="image" href="/gallery/DSC06706.webp" fetchPriority="low" />
      </head>
      <body>{children}</body>
    </html>
  );
}
