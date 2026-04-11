import type { Metadata } from "next";
import { Bodoni_Mada, Onest, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display — editorial confidence for landing H1/H2
const bodoniMada = Bodoni_Mada({
  subsets: ["latin"],
  weight: ["200", "300"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-loaded",
});

// Body/UI — confident, mechanical geometric sans
const onest = Onest({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-sans-loaded",
});

// Mono — tabular figures for every number, KPI, chart label
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono-loaded",
});

export const metadata: Metadata = {
  title: "PiracyShield Pro - Content Protection Dashboard",
  description: "Protect your content from piracy with real-time monitoring and automated takedowns",
  keywords: ["piracy", "content protection", "anti-piracy", "digital rights", "takedown", "monitoring"],
  authors: [{ name: "PiracyShield Pro" }],
  creator: "PiracyShield Pro",
  publisher: "PiracyShield Pro",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "PiracyShield Pro - Content Protection Dashboard",
    description: "Protect your content from piracy with real-time monitoring and automated takedowns",
    siteName: "PiracyShield Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "PiracyShield Pro - Content Protection Dashboard",
    description: "Protect your content from piracy with real-time monitoring and automated takedowns",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoniMada.variable} ${onest.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
