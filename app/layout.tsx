import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SyllabusLens — SSC CGL Syllabus Analyzer',
  description:
    'Explore the official SSC CGL 2026 syllabus by tier, subject, and topic. Compare exam patterns and find every topic in one clear study guide.',
  keywords: [
    'SSC CGL 2026 syllabus',
    'SSC CGL syllabus analyzer',
    'SSC CGL exam pattern',
    'competitive exam syllabus',
  ],
  metadataBase: new URL('https://syllabus-visualizer-567.pages.dev'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SyllabusLens — SSC CGL 2026 Syllabus Analyzer',
    description:
      'Find the official SSC CGL syllabus, exam pattern, tiers, subjects, and topics in one clear visual guide.',
    url: 'https://syllabus-visualizer-567.pages.dev',
    siteName: 'SyllabusLens',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SyllabusLens — SSC CGL 2026 Syllabus Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SyllabusLens — SSC CGL 2026 Syllabus Analyzer',
    description:
      'Find the official SSC CGL syllabus, exam pattern, tiers, subjects, and topics in one clear visual guide.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'ykUYCjOKM3AzXBR27v9mahV0CSSTYWPNd4KYdI4ELcY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          id="cloudflare-web-analytics"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"b40925d0cb0e4d2ebddc5a9b99177be3"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
