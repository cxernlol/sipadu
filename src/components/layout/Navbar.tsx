"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Links are defined inside the component dynamically based on the university

export function Navbar({ uni = "gunadarma" }: { uni?: string }) {
  const pathname = usePathname();

  const UNI_DATA: Record<string, { name: string, color: string }> = {
    gunadarma: { name: "Universitas Gunadarma", color: "text-blue-600" },
    ui: { name: "Universitas Indonesia", color: "text-yellow-600" },
    ugm: { name: "Universitas Gadjah Mada", color: "text-blue-800" },
    itb: { name: "Institut Teknologi Bandung", color: "text-teal-700" },
    ub: { name: "Universitas Brawijaya", color: "text-orange-600" },
  };

  const currentUni = UNI_DATA[uni] || UNI_DATA["gunadarma"];

  let links = [
    { name: "Beranda", href: "/" },
    { name: "Pengumuman", href: "/pengumuman" },
    { name: "Jadwal", href: "/jadwal" },
    { name: "Materi", href: "/materi" },
    { name: "Kalender", href: "/kalender" },
  ];

  if (uni === "gunadarma") {
    links = [
      { name: "Beranda", href: "/" },
      { name: "Pengumuman BAAK", href: "/baak/pengumuman" },
      { name: "Pengumuman LePKom", href: "/lepkom/pengumuman" },
      { name: "Jadwal", href: "/lepkom/jadwal" },
      { name: "Materi", href: "/lepkom/materi" },
      { name: "Kalender", href: "/lepkom/kalender" },
    ];
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-slate-50/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className={`flex items-center gap-2 font-bold ${currentUni.color} text-lg`}>
          <div className={`h-2 w-2 rounded-full ${currentUni.color.replace('text-', 'bg-')}`} />
          SiPadu {uni.toUpperCase()}
        </Link>
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === link.href ? "text-blue-600" : "text-slate-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Link 
          href={`http://${uni}.sipadu.info`} 
          target="_blank"
          className="text-xs font-medium bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full hover:bg-slate-300 transition-colors"
        >
          {uni}.sipadu.info
        </Link>
      </div>
    </header>
  );
}
