import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
