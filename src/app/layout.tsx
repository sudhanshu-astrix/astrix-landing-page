import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import GlobalMenu from "./components/GlobalMenu";
import { Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";
import MixpanelProvider from "@/providers/mixpanerlProvider";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: 'swap',
  preload: true,
});

const switzer = localFont({
  src: [
    {
      path: "../../public/Fonts/Switzer/Switzer-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-Extralight.ttf",
      weight: "200",
    },
    // {
    //   path: "../../public/Switzer/Switzer-ExtralightItalic.ttf",
    //   weight: "200",
    //   style: "italic",
    // },
    {
      path: "../../public/Fonts/Switzer/Switzer-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-SemiboldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-Extrabold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-ExtraboldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Switzer/Switzer-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: 'swap',
  preload: true,
});

const nohemi = localFont({
  src: [
    {
      path: "../../public/Fonts/Nohemi/Nohemi-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/Fonts/Nohemi/Nohemi-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/Fonts/Nohemi/Nohemi-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../public/Fonts/Nohemi/Nohemi-Bold.ttf",
      weight: "500",
    },
    {
      path: "../../public/Fonts/Nohemi/Nohemi-ExtraBold.ttf",
      weight: "600",
    },
  ],
  variable: "--font-nohemi",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Astrix - Build for the Shift",
  description:
    "An omnichannel platform for optimizing community-building process. Create meaningful connections and drive sustainable growth.",
  icons: {
    icon: "/landing_pageicon.png",
    shortcut: "/landing_pageicon.png",
    apple: "/landing_pageicon.png",
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
        {/* Prefetch hero video (lower priority than preload) - loads after critical resources */}
        <link
          rel="prefetch"
          href="/Assets/Images/HeroSectionMobile.mp4"
          as="video"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        {/* DNS prefetch for Google Analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Preconnect to Azure Blob Storage */}
        <link rel="preconnect" href="https://astrix.blob.core.windows.net" />
        <link rel="dns-prefetch" href="https://astrix.blob.core.windows.net" />
      </head>
      <body className={`${switzer.variable} ${nohemi.variable} ${instrumentSerif.variable}  antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3XRZVZBTNJ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3XRZVZBTNJ');
          `}
        </Script>
        <Toaster position="top-center" richColors />
         <MixpanelProvider>{children}</MixpanelProvider>
        <GlobalMenu />
      </body>
    </html>
  );
}
