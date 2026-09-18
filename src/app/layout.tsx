import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    template: "%s | SiPadu",
    default: "SiPadu - Sistem Informasi Terpadu Universitas Gunadarma",
  },
  description: "Portal terpadu untuk pengumuman, jadwal kursus, dan agenda kegiatan dari BAAK, LePKom, dan StudentSite Universitas Gunadarma.",
  metadataBase: new URL("https://sipadu.info"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SiPadu - Sistem Informasi Terpadu",
    description: "Portal terpadu untuk pengumuman dan agenda kegiatan akademik dari BAAK, LePKom, dan StudentSite.",
    url: "https://sipadu.info",
    siteName: "SiPadu",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiPadu - Sistem Informasi Terpadu",
    description: "Portal terpadu pengumuman Universitas Gunadarma",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SiPadu",
  },
  formatDetection: {
    telephone: false,
  },
};

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SiPadu",
  url: "https://sipadu.info",
  description: "Sistem Informasi Terpadu Universitas Gunadarma",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://sipadu.info/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

import { ThemeProvider } from "@/components/ThemeProvider";

import "../../public/fontawesome/fontawesome.css";
import "../../public/fontawesome/solid.css";
import "../../public/fontawesome/regular.css";
import "../../public/fontawesome/brands.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieBanner />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
