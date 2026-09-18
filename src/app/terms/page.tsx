import Link from "next/link";

export const metadata = {
  title: "Syarat dan Ketentuan",
  description: "Syarat dan Ketentuan Layanan SiPadu — Sistem Informasi Terpadu",
};

export default function TermsOfService() {
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
          <h1 className="font-serif text-4xl text-slate-900 mb-8">Syarat dan Ketentuan Layanan</h1>
          
          <div className="prose prose-slate max-w-none prose-headings:font-serif">
            <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
            
            <h2>1. Penerimaan Syarat</h2>
            <p>
              Dengan mengakses dan menggunakan SiPadu (Sistem Informasi Terpadu), Anda menyetujui untuk terikat dengan Syarat dan Ketentuan Layanan ini serta Kebijakan Privasi kami.
            </p>
            
            <h2>2. Penggunaan Layanan</h2>
            <p>
              Informasi yang disediakan di platform ini bersifat informatif dan diagregasi dari portal resmi berbagai Universitas. SiPadu merupakan proyek sumber terbuka (open-source) dan <strong>tidak memiliki afiliasi resmi</strong> dengan universitas-universitas yang datanya ditampilkan. Anda setuju untuk menggunakan layanan ini sesuai dengan hukum dan peraturan yang berlaku.
            </p>

            <h2>3. Akurasi Data</h2>
            <p>
              Meskipun kami berusaha keras menyajikan data secara real-time dan akurat, keterlambatan pembaruan data (sync) dengan portal sumber mungkin terjadi. SiPadu dan tim pengembangnya tidak bertanggung jawab atas kerugian materiil maupun non-materiil akibat kesalahan, kelalaian, atau keterlambatan informasi.
            </p>

            <h2>4. Ketersediaan Sistem</h2>
            <p>
              SiPadu disediakan secara "apa adanya" (as is). Kami mungkin melakukan maintenance (pemeliharaan) dari waktu ke waktu dan tidak menjamin sistem akan selalu 100% online tanpa gangguan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
