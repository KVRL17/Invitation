import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google';
import './globals.css';

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
  title: 'Brinda & Chaitanya — Engagement Invitation',
  description:
    'Together with our families, we joyfully invite you to celebrate our engagement. Save the date and join us for an evening of love and celebration.',
  keywords: ['engagement', 'invitation', 'wedding', 'save the date'],
  openGraph: {
    title: 'Brinda & Chaitanya — Engagement Invitation',
    description:
      'Together with our families, we joyfully invite you to celebrate our engagement.',
    type: 'website',
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
      <body>{children}</body>
    </html>
  );
}
