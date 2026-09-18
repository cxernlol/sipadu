# SiPadu - Context for AI Agents

Welcome, Agent! You are working on **SiPadu** (Sistem Informasi Terpadu), a university information aggregator built with Next.js 16.

## 🚨 CRITICAL RULES
1. **Design Aesthetics**: Do not build plain MVPs. You MUST use premium, modern aesthetics (glassmorphism, micro-animations, tailored Tailwind v4 colors, modern typography like Inter/Playfair Display).
2. **SEO & Compliance**: All pages must be strictly SEO optimized (proper `<title>`, `<meta>`, canonical URLs). Legal pages (Privacy Policy, ToS) must be maintained in **Indonesian**. Cookie banners must be GDPR/CCPA compliant.
3. **No External CDNs**: All assets (like FontAwesome or heavy CSS) must be loaded locally to pass strict Lighthouse audits and prevent render-blocking.
4. **WAF / CAPTCHA Fallback**: The app relies on live scraping (via Cheerio). However, university servers (like VM LePKom) often block scraping. All data-fetching API routes MUST implement a silent fallback to `src/data/db.json` on timeout or HTTP error. DO NOT expose 500 errors to the frontend.

## 🏗️ Architecture & Stack
- **Frontend Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Language**: TypeScript (Frontend) & Rust (Backend Scraper)
- **Multi-University Routing**: The app supports 5 universities via dedicated route segments: `/gunadarma`, `/ui`, `/ugm`, `/itb`, `/ub`.
- **Data Source**: Live HTML Scraping via Rust `scraper_rs` + local `src/data/db.json` fallback
- **Automation (Cron)**: Vercel Cron hits `/api/cron/scrape`, which dispatches a GitHub Action workflow to run the Rust scraper natively (bypassing Vercel's Edge restrictions). 
- **Hosting**: Vercel (Edge network, SSL, and DDoS handled by platform)

## 🦀 Rust Scraper (scraper_rs)
The data scraper is written in Rust (`scraper_rs` directory) using `tokio` (concurrency), `headless_chrome` to bypass Cloudflare WAF, and `HashSet` for rigorous deduplication (so no redundant articles are ever saved).
- **DO NOT** rewrite the scraper in Node.js/Puppeteer; it was intentionally migrated to Rust for performance.
- To test the scraper locally, you must instruct the user to install Rust, then use `npm run scrape` (which proxies to `cargo run --release`).

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
