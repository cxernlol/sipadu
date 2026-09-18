import Link from "next/link";
import type { Metadata } from "next";
import { AnimateIn } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "API — Segera Hadir",
  description: "API publik SiPadu untuk mengakses data akademik universitas secara terprogram. Segera hadir.",
  alternates: { canonical: "/api-docs" },
};

const API_PREVIEW = `// Contoh penggunaan API SiPadu (Segera Hadir)
const res = await fetch(
  'https://sipadu.info/api/v1/gunadarma/jadwal?q=10123456'
);
const { results, source } = await res.json();

// Response:
{
  "results": [
    {
      "npm": "0123456",
      "nama": "Andi Saputra",
      "kelas": "Kelas B301",
      "matkul": "WEB APP DEV WITH GO",
      "hari": "Senin",
      "shift": "Pagi",
      "ruang": "D412"
    }
  ],
  "source": "live" // atau "cache"
}`;

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#f8f8fa] relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#f8f8fa]/80 backdrop-blur-2xl">
        <div className="container mx-auto px-6 h-18 flex items-center justify-between max-w-6xl">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-all duration-300">
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              SiPadu<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">.info</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
            <i className="fa-solid fa-arrow-left mr-2" />Beranda
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 max-w-5xl py-20 md:py-28">
        <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full text-sm font-medium text-emerald-700 border border-emerald-200 shadow-sm mb-10">
            <i className="fa-solid fa-code text-emerald-500" />
            REST API Publik
          </div>

          {/* Icon */}
          <div className="h-24 w-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-10 mx-auto">
            <i className="fa-solid fa-plug text-4xl text-emerald-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
            API sedang dalam<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500">tahap pengembangan.</span>
          </h1>

          <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light max-w-lg mx-auto">
            Kami sedang membangun REST API publik agar developer dan mahasiswa dapat mengakses data jadwal, pengumuman, dan materi dari seluruh universitas secara terprogram.
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">REST API</span>
            <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">JSON Response</span>
            <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">Rate Limited</span>
            <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">CORS Enabled</span>
          </div>

          {/* Progress indicators */}
          <div className="flex gap-6 justify-center mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <i className="fa-solid fa-check text-emerald-500 text-sm" />
              </div>
              <span className="text-xs text-slate-400">Desain</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center animate-pulse">
                <i className="fa-solid fa-code text-emerald-500 text-sm" />
              </div>
              <span className="text-xs text-emerald-600 font-medium">Pengembangan</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <i className="fa-solid fa-book text-slate-300 text-sm" />
              </div>
              <span className="text-xs text-slate-300">Dokumentasi</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <i className="fa-solid fa-rocket text-slate-300 text-sm" />
              </div>
              <span className="text-xs text-slate-300">Launch</span>
            </div>
          </div>
        </AnimateIn>

        {/* Code Preview */}
        <AnimateIn delay={0.2} className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 text-center">Preview Endpoint</h2>
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#1e1e2e] shadow-2xl">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-700/50 bg-[#181825]">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-4 text-xs text-slate-500 font-mono">api-example.ts</span>
            </div>
            {/* Code content */}
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-slate-300">
              <code>{API_PREVIEW}</code>
            </pre>
          </div>
        </AnimateIn>

        {/* Back link */}
        <AnimateIn delay={0.3} className="text-center mt-12">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-700 transition-colors font-medium inline-flex items-center gap-2">
            <i className="fa-solid fa-arrow-left text-xs" /> Kembali ke Beranda SiPadu
          </Link>
        </AnimateIn>
      </main>
    </div>
  );
}
