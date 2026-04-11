import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
