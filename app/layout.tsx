import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// 1. CONSTANTS for your site
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apnisec.com'; // Replace with your Vercel URL if you don't have a domain yet
const SITE_NAME = 'Apnisec';
const SITE_DESCRIPTION = 'The secure, modern platform for authentication and user management. Built with Next.js 16 and Prisma.';

export const metadata: Metadata = {
  // 2. Base URL (Fixes "metadataBase is missing" warning)
  metadataBase: new URL(SITE_URL),

  // 3. Title Template (e.g., "Login | Apnisec")
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  // 4. Keywords for SEO
  keywords: ['Security', 'Authentication', 'Next.js', 'SaaS', 'Prisma', 'Cybersecurity'],

  // 5. Authors and Creator
  authors: [{ name: 'Amsaavan', url: 'https://github.com/amsaavan' }],
  creator: 'Amsaavan',

  // 6. Open Graph (How links look on Discord, LinkedIn, Slack)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    // Add an image named 'og-image.png' to your /public folder for this to work
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Apnisec Platform Preview',
      },
    ],
  },

  // 7. Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },

  // 8. Robots (Allow Google to index you)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
