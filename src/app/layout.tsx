import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="/fontawesome/fontawesome.css" />
        <link rel="stylesheet" href="/fontawesome/solid.css" />
        <link rel="stylesheet" href="/fontawesome/regular.css" />
        <link rel="stylesheet" href="/fontawesome/brands.css" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
