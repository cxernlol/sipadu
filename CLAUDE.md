@AGENTS.md

Please refer to the `AGENTS.md` file in the root of this project for all the critical rules, architecture context, and Next.js 16 breaking changes that you must adhere to while working on the SiPadu project.

**Note on Scraping**: The data scraping engine has been rewritten from Node.js (Puppeteer) to **Rust** (`scraper_rs/`). Do not attempt to use Node.js/Python for scraping. Deduplication is handled directly in Rust.
**Note on Automation**: Scraping is automated via Vercel Cron Jobs communicating with GitHub Actions. See `AGENTS.md` for details.
