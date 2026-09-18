"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/ThemeToggle";

const UNI_DATA: Record<string, { name: string; color: string }> = {
  gunadarma: { name: "Universitas Gunadarma", color: "text-blue-600" },
  ui: { name: "Universitas Indonesia", color: "text-yellow-600" },
  ugm: { name: "Universitas Gadjah Mada", color: "text-blue-800" },
  itb: { name: "Institut Teknologi Bandung", color: "text-teal-700" },
  ub: { name: "Universitas Brawijaya", color: "text-orange-600" },
};

export function Navbar({ uni = "gunadarma" }: { uni?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentUni = UNI_DATA[uni] || UNI_DATA["gunadarma"];

  // Simplified links — only essential navigation items
  let links = [
    { name: "Beranda", href: `/${uni}` },
    { name: "Pengumuman", href: `/${uni}/pengumuman` },
    { name: "Jadwal", href: `/${uni}/jadwal` },
    { name: "Kalender", href: `/${uni}/kalender` },
  ];

  if (uni === "gunadarma") {
    links = [
      { name: "Beranda", href: "/gunadarma" },
      { name: "Pengumuman", href: "/gunadarma/baak/pengumuman" },
      { name: "Jadwal", href: "/gunadarma/lepkom/jadwal" },
      { name: "Kalender", href: "/gunadarma/baak/kalender" },
    ];
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 dark:border-slate-800 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${uni}`} className="flex items-center gap-2.5 group">
          <div className={`h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] shadow-md group-hover:scale-105 transition-transform`}>
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50 hidden sm:inline">
            SiPadu<span className={currentUni.color}> · {uni.charAt(0).toUpperCase() + uni.slice(1)}</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium px-3 py-1.5 rounded-lg transition-colors",
                pathname === link.href || (link.href !== `/${uni}` && pathname.startsWith(link.href))
                  ? `${currentUni.color} bg-slate-50 dark:bg-slate-900`
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side: Home badge + theme toggle + mobile toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/"
            className="text-[11px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors hidden sm:flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
            SiPadu.info
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
            aria-label="Menu navigasi"
          >
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block text-sm font-medium px-3 py-2.5 rounded-lg transition-colors",
                pathname === link.href || (link.href !== `/${uni}` && pathname.startsWith(link.href))
                  ? `${currentUni.color} bg-slate-50`
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block text-xs text-slate-400 hover:text-slate-600 px-3 py-2"
            >
              <i className="fa-solid fa-arrow-left mr-2" />Kembali ke SiPadu.info
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
