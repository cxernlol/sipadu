import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Define allowed domains (including localhost for dev)
  const allowedDomains = ["sipadu.info", "localhost:3000"];

  let subdomain = "";
  
  for (const domain of allowedDomains) {
    if (hostname.endsWith(`.${domain}`)) {
      subdomain = hostname.replace(`.${domain}`, "");
      break;
    }
  }

  // If it's the root domain (no subdomain or www), render the MVP Landing Page (src/app/page.tsx)
  if (subdomain === "www" || subdomain === "") {
    return NextResponse.next();
  }

  // If it's a valid subdomain (e.g., gunadarma, ui, ugm), rewrite to /[uni]/path
  if (subdomain) {
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}
