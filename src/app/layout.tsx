import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://code-translates.vercel.app'),
  title: {
    default: "Code Translator - AI-Powered Code Translation Tool",
    template: "%s | Code Translator"
  },
  description: "Transform code between 9 programming languages instantly with AI precision. Convert C, C++, Python, Java, JavaScript, TypeScript, Ruby, PHP, and Rust code effortlessly. Free online code translator by Anubhav.",
  keywords: [
    "code translator",
    "programming",
    "code conversion",
    "AI code translator",
    "multi-language programming",
    "Python to JavaScript",
    "Java to Python",
    "C++ to Rust",
    "TypeScript converter",
    "online code converter",
    "free code translator",
    "Anubhav",
    "developer tools",
    "programming tools",
    "code transformation",
    "syntax converter"
  ],
  authors: [{ name: "Anubhav" }],
  creator: "Anubhav",
  publisher: "Anubhav",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://code-translates.vercel.app',
    title: 'Code Translator - AI-Powered Code Translation Tool',
    description: 'Transform code between 9 programming languages instantly with AI precision. Convert C, C++, Python, Java, JavaScript, TypeScript, Ruby, PHP, and Rust code effortlessly.',
    siteName: 'Code Translator',
    images: [
      {
        url: '/code-translates-2.0.jpg',
        width: 1200,
        height: 630,
        alt: 'Code Translator - AI-Powered Code Translation Tool by Anubhav',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Translator - AI-Powered Code Translation Tool',
    description: 'Transform code between 9 programming languages instantly with AI precision. Free online tool by Anubhav.',
    images: ['/code-translates-2.0.jpg'],
    creator: '@anubhav',
    site: '@anubhav',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://code-translates.vercel.app',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />

        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Code Translator" />
        <meta name="application-name" content="Code Translator" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" href="/icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="format-detection" content="telephone=no" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 min-h-screen`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}



