import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
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
  metadataBase: new URL('https://aditi-ai-verse.vercel.app'),
  title: {
    default: "Aditi AI Verse - Boost your productivity with Aditi AI Tools",
    template: "%s | Aditi AI Verse"
  },
  description: "Aditi AI Verse is a collection of AI-powered tools to help you with your daily tasks. It includes an email writer, a prompt better ai, a writing assistant, and a code convertor.",
  keywords: [
    "email writer",
    "prompt better",
    "writing assistant",
    "code convertor",
    "AI tools",
    "Aditi AI Verse",
    "Anubhav"
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
    url: 'https://aditi-ai-verse.vercel.app',
    title: 'Aditi AI Verse',
    description: 'Aditi AI Verse is a collection of AI-powered tools to help you with your daily tasks. It includes an email writer, a prompt better, a writing assistant, and a code convertor.',
    siteName: 'Aditi AI Verse',
    images: [
      {
        url: 'https://aditi-ai-verse.vercel.app/aditi-blue-logo-1.png',
        width: 1200,
        height: 630,
        alt: 'Aditi AI Verse - AI-Powered Tools by Anubhav',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditi AI Verse',
    description: 'Aditi AI Verse is a collection of AI-powered tools to help you with your daily tasks. It includes an email writer, a prompt better, a writing assistant, and a code convertor.',
    images: ['https://aditi-ai-verse.vercel.app/aditi-blue-logo-1.png'],
    creator: '@anubhav',
    site: '@anubhav',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://aditi-ai-verse.vercel.app',
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
        <link rel="icon" href="/aditi-blue-logo-1.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" />
        <link rel="icon" href="/aditi-blue-logo-1.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/aditi-blue-logo-1.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="format-detection" content="telephone=no" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 min-h-screen`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
