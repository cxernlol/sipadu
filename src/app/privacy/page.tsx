import Link from "next/link";

export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan Privasi SiPadu — Sistem Informasi Terpadu",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f8f8fa]">
      {/* Simple nav header */}
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

      <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="font-serif text-4xl text-slate-900 mb-8">Kebijakan Privasi</h1>
          
          <div className="prose prose-slate max-w-none prose-headings:font-serif">
            <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
            
            <h2>1. Pengumpulan Informasi</h2>
            <p>
              SiPadu (Sistem Informasi Terpadu) mengumpulkan informasi secara anonim untuk keperluan analitik dan fungsionalitas dasar seperti pencarian dan pengaturan filter.
            </p>
            
            <h2>2. Penggunaan Data</h2>
            <p>
              Data yang dikumpulkan digunakan semata-mata untuk:
            </p>
            <ul>
              <li>Menyediakan informasi akademik secara real-time yang diagregasi dari berbagai sumber.</li>
              <li>Menganalisis performa platform untuk perbaikan UX (User Experience).</li>
              <li>Memastikan keamanan dan ketersediaan layanan.</li>
            </ul>

            <h2>3. Cookie</h2>
            <p>
              Kami menggunakan cookie lokal (localStorage) untuk menyimpan preferensi Anda seperti status persetujuan cookie (Cookie Consent) agar Anda tidak ditanya berulang kali. Kami tidak melacak data pengguna lintas situs.
            </p>

            <h2>4. Hubungi Kami</h2>
            <p>
              Jika ada pertanyaan lebih lanjut terkait Kebijakan Privasi ini atau tentang proyek SiPadu, silakan hubungi tim pengembang (developer) kami melalui repositori GitHub resmi kami di <a href="https://github.com/cxernlol/sipadu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/cxernlol/sipadu</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
