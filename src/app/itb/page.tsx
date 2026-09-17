import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

export default function ITBPage() {
  return (
    <div className="min-h-screen bg-[#f8f8fa] relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal-200/25 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
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
      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-73px)]">
        <AnimateIn className="text-center max-w-2xl px-6 flex flex-col items-center">
          {/* University badge */}
          <div className="inline-flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full text-sm font-medium text-teal-700 border border-teal-200 shadow-sm mb-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Institut_Teknologi_Bandung_logo.svg" alt="ITB" className="h-5 w-5 object-contain" />
            Institut Teknologi Bandung
          </div>

          {/* Construction icon */}
          <div className="h-24 w-24 rounded-3xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-10">
            <i className="fa-solid fa-helmet-safety text-4xl text-teal-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-slate-900">
            Portal sedang dalam<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">tahap pengembangan.</span>
          </h1>

          <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light max-w-lg">
            Tim engineering kami sedang memetakan dan mengintegrasikan sistem informasi Institut Teknologi Bandung ke dalam jaringan SiPadu.
          </p>

          {/* Progress indicators */}
          <div className="flex gap-6 mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <i className="fa-solid fa-check text-emerald-500 text-sm" />
              </div>
              <span className="text-xs text-slate-400">Riset</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center animate-pulse">
                <i className="fa-solid fa-code text-teal-500 text-sm" />
              </div>
              <span className="text-xs text-teal-600 font-medium">Integrasi</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <i className="fa-solid fa-rocket text-slate-300 text-sm" />
              </div>
              <span className="text-xs text-slate-300">Launch</span>
            </div>
          </div>

          <Link href="/" className="text-sm text-slate-400 hover:text-slate-700 transition-colors font-medium inline-flex items-center gap-2">
            <i className="fa-solid fa-arrow-left text-xs" /> Kembali ke Beranda SiPadu
          </Link>
        </AnimateIn>
      </main>
    </div>
  );
}
