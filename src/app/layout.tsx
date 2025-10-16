import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Astrix - Omnichannel Community Building Platform",
  description: "An omnichannel platform for optimizing community-building process. Create meaningful connections and drive sustainable growth.",
  icons: {
    icon: '/landing_pageicon.png',
    shortcut: '/landing_pageicon.png',
    apple: '/landing_pageicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* iOS-specific meta tags for better compatibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        
        {/* Preload critical assets for instant display */}
        <link rel="preload" href="/Assets/Images/HeroSection.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/Assets/Images/HeroImage.png" as="image" />
        <link rel="preload" href="/Assets/Images/NoiseEffectBg.svg" as="image" />
        <link rel="preload" href="/Assets/Icons/LogoIcon.png" as="image" />
        <link rel="preload" href="/Assets/Images/Star.svg" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
