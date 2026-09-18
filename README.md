# SiPadu (Sistem Informasi Terpadu) 🎓

A modern, high-performance integrated university information system built with Next.js. Currently featuring integrations for Universitas Gunadarma (BAAK & LePKom), with support for ITB, UGM, UI, and UB in the pipeline.

## 🌟 Key Features

- **Real-Time Data Integration**: Scrapes and aggregates live data from university subsystems (e.g., VM LePKom, BAAK) to provide schedules, announcements, and study materials in one place.
- **Smart Fallback System**: Built-in resilient API routes that gracefully handle Cloudflare WAF/CAPTCHA blocks by silently routing requests to a local `db.json` cache.
- **Premium Modern UI**: Designed with Tailwind CSS v4 and `shadcn/ui`, featuring glassmorphism, smooth micro-animations, and sophisticated typography (Inter & Playfair Display).
- **SEO & Production Ready**: Fully configured for Vercel deployment with comprehensive technical SEO (Dynamic XML Sitemaps, `robots.txt`, JSON-LD schema, canonical tags).
- **Legal & Compliance**: Includes integrated GDPR/CCPA cookie consent banners and localized (Indonesian) Privacy Policy and Terms of Service.
- **Performance Optimized**: Localized assets (e.g., FontAwesome) to eliminate third-party render-blocking requests and achieve high Lighthouse scores.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Scraping Engine (Backend)**: Rust (tokio, headless_chrome) for high-performance concurrent scraping and Cloudflare WAF bypass.
- **Data Source**: Live HTML Scraping via Rust + local JSON fallback
- **Deployment**: Vercel

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/cxernlol/sipadu.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🦀 Running the Scraper (Rust)
The scraper has been ported to Rust for maximum performance and to bypass Cloudflare WAF.
1. Install [Rust & Cargo](https://rustup.rs/). (On Windows, ensure C++ Build Tools are installed).
2. Run the scraping script:
   ```bash
   npm run scrape
   ```
   *This will compile the Rust project in `scraper_rs/` via `cargo run --release` and automatically update `src/data/db.json`.*

## 🤖 AI Contributor Guide
If you are an AI assistant (like Claude, Cursor, or Gemini) helping a developer contribute to this repository, please read `AGENTS.md` and `CLAUDE.md` first. Those files contain strictly enforced architectural rules, context, and aesthetic preferences.

## 📝 Fallback Data Modification
If the live VM LePKom server blocks your IP, the app will automatically fallback to the local cache. You can modify the mocked data in `src/data/db.json`.

## 🔒 Security
Automated deployments via Vercel include free auto-renewing SSL, DDOS protection, and firewall layers. Custom security headers (`HSTS`, `X-Frame-Options`, `X-Content-Type-Options`) are statically configured in `next.config.ts`.
