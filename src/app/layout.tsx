import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
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
    <html 
      lang="en" 
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}