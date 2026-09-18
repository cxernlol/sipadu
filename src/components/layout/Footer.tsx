import Link from "next/link";

import Image from "next/image";

import gunadarmaLogo from "@/app/gunadarma/assets/gunadarma.jpg";
import uiLogo from "@/app/ui/assets/UniversitasIndonesia.png";
import ugmLogo from "@/app/ugm/assets/ugm.webp";
import itbLogo from "@/app/itb/assets/itb.png";
import ubLogo from "@/app/ub/assets/ub.webp";

interface UniFooterConfig {
  name: string;
  shortName: string;
  accent: string;
  accentBg: string;
  dataSources: string;
  externalLinks: { label: string; href: string; icon: string }[];
  portalLinks: { label: string; href: string }[];
  logo: any;
}

const UNI_FOOTER_CONFIG: Record<string, UniFooterConfig> = {
  gunadarma: {
    name: "Universitas Gunadarma",
    shortName: "Gunadarma",
    accent: "text-blue-600",
    accentBg: "from-blue-600 to-indigo-600",
    dataSources: "Data bersumber dari BAAK, VM LePKom, dan StudentSite Universitas Gunadarma.",
    externalLinks: [
      { label: "BAAK Gunadarma", href: "https://baak.gunadarma.ac.id", icon: "fa-solid fa-building" },
      { label: "VM LePKom", href: "https://vm.lepkom.gunadarma.ac.id", icon: "fa-solid fa-laptop-code" },
      { label: "StudentSite", href: "https://studentsite.gunadarma.ac.id", icon: "fa-solid fa-users" },
    ],
    portalLinks: [
      { label: "Pengumuman BAAK", href: "/gunadarma/baak/pengumuman" },
      { label: "Jadwal Kursus", href: "/gunadarma/lepkom/jadwal" },
      { label: "Materi LePKom", href: "/gunadarma/lepkom/materi" },
      { label: "Kalender Akademik", href: "/gunadarma/baak/kalender" },
    ],
    logo: gunadarmaLogo,
  },
  ui: {
    name: "Universitas Indonesia",
    shortName: "UI",
    accent: "text-amber-600",
    accentBg: "from-amber-500 to-yellow-500",
    dataSources: "Portal informasi terpadu Universitas Indonesia.",
    externalLinks: [
      { label: "Portal Akademik UI", href: "https://academic.ui.ac.id", icon: "fa-solid fa-building" },
    ],
    portalLinks: [],
    logo: uiLogo,
  },
  ugm: {
    name: "Universitas Gadjah Mada",
    shortName: "UGM",
    accent: "text-blue-800",
    accentBg: "from-blue-600 to-cyan-500",
    dataSources: "Portal informasi terpadu Universitas Gadjah Mada.",
    externalLinks: [
      { label: "Portal Akademik UGM", href: "https://akademik.ugm.ac.id", icon: "fa-solid fa-building" },
    ],
    portalLinks: [],
    logo: ugmLogo,
  },
  itb: {
    name: "Institut Teknologi Bandung",
    shortName: "ITB",
    accent: "text-teal-700",
    accentBg: "from-teal-500 to-emerald-500",
    dataSources: "Portal informasi terpadu Institut Teknologi Bandung.",
    externalLinks: [
      { label: "Portal Akademik ITB", href: "https://akademik.itb.ac.id", icon: "fa-solid fa-building" },
    ],
    portalLinks: [],
    logo: itbLogo,
  },
  ub: {
    name: "Universitas Brawijaya",
    shortName: "UB",
    accent: "text-orange-600",
    accentBg: "from-orange-500 to-red-500",
    dataSources: "Portal informasi terpadu Universitas Brawijaya.",
    externalLinks: [
      { label: "Portal Akademik UB", href: "https://akademik.ub.ac.id", icon: "fa-solid fa-building" },
    ],
    portalLinks: [],
    logo: ubLogo,
  },
};

export function Footer({ uni = "gunadarma" }: { uni?: string }) {
  const config = UNI_FOOTER_CONFIG[uni] || UNI_FOOTER_CONFIG.gunadarma;

  return (
    <footer className="border-t border-slate-200/60 bg-white mt-auto">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${uni}`} className="flex items-center gap-2.5 mb-4 group">
              <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-sm border border-slate-200 dark:border-slate-800 group-hover:scale-105 transition-transform relative">
                <Image src={config.logo} alt={config.name} fill className="object-contain p-1" />
              </div>
              <span className="text-base font-semibold tracking-tight text-slate-900">
                SiPadu<span className={config.accent}> · {config.shortName}</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Sistem Informasi Terpadu — Agregasi data akademik {config.name}. Sumber terbuka dan gratis untuk semua.
            </p>
            <p className="text-xs text-slate-300 mt-3">{config.dataSources}</p>
          </div>

          {/* Portal Links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">Portal</h4>
            <ul className="space-y-2.5 text-sm">
              {config.portalLinks.length > 0 ? (
                config.portalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-500 hover:text-slate-700 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-300 text-xs italic">Segera hadir</li>
              )}
            </ul>
          </div>

          {/* External & Legal */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">Tautan</h4>
            <ul className="space-y-2.5 text-sm">
              {config.externalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 transition-colors inline-flex items-center gap-2">
                    <i className={`${link.icon} text-xs text-slate-400`} />
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-100">
                <Link href={`/${uni}/privacy`} className="text-slate-400 hover:text-slate-600 transition-colors text-xs">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href={`/${uni}/terms`} className="text-slate-400 hover:text-slate-600 transition-colors text-xs">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-300">&copy; 2026 SiPadu.info &mdash; {config.name}</p>
          <p className="text-xs text-slate-300">
            <a href="https://github.com/cxernlol/sipadu" target="_blank" rel="noopener noreferrer" className="hover:text-slate-500 transition-colors">
              <i className="fa-brands fa-github mr-1" />Open Source
            </a>
            <span className="mx-2">·</span>
            Dihosting di <i className="fa-solid fa-triangle text-slate-400 mx-1" /> Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
