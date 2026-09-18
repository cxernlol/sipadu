import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { RealTimeStats } from "@/components/UpdatesChart";
import { getStats } from "@/lib/scraper";

const UNIVERSITIES = [
  { id: "gunadarma", name: "Universitas Gunadarma", shortName: "Gunadarma", domain: "/gunadarma", status: "Live", accent: "from-purple-500 to-indigo-600", iconBg: "bg-purple-50", iconText: "text-purple-500", ringColor: "ring-purple-200", description: "Jadwal kursus, pengumuman BAAK, materi LePKom, dan kalender akademik.", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Logo_Universitas_Gunadarma.svg" },
  { id: "ui", name: "Universitas Indonesia", shortName: "UI", domain: "/ui", status: "Segera Hadir", accent: "from-amber-400 to-yellow-500", iconBg: "bg-amber-50", iconText: "text-amber-500", ringColor: "ring-amber-200", description: "Sistem informasi terpadu untuk civitas akademika UI.", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Universitas_Indonesia_logo.svg" },
  { id: "ugm", name: "Universitas Gadjah Mada", shortName: "UGM", domain: "/ugm", status: "Segera Hadir", accent: "from-blue-500 to-cyan-500", iconBg: "bg-blue-50", iconText: "text-blue-500", ringColor: "ring-blue-200", description: "Portal akademik terpadu untuk mahasiswa UGM.", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Lambang_UGM.svg" },
  { id: "itb", name: "Institut Teknologi Bandung", shortName: "ITB", domain: "/itb", status: "Segera Hadir", accent: "from-teal-500 to-emerald-500", iconBg: "bg-teal-50", iconText: "text-teal-500", ringColor: "ring-teal-200", description: "Integrasi sistem informasi kampus ITB.", logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Institut_Teknologi_Bandung_logo.svg" },
  { id: "ub", name: "Universitas Brawijaya", shortName: "UB", domain: "/ub", status: "Segera Hadir", accent: "from-orange-500 to-red-500", iconBg: "bg-orange-50", iconText: "text-orange-500", ringColor: "ring-orange-200", description: "Agregasi data akademik Universitas Brawijaya.", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Universitas_Brawijaya.svg" },
];

const FEATURES = [
  { icon: "fa-solid fa-bolt", title: "Sinkronisasi Real-Time", description: "Data diambil langsung dari server kampus dan diproses secara instan.", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: "fa-solid fa-shield-halved", title: "Fallback Otomatis", description: "Jika server kampus down, sistem otomatis beralih ke cache lokal tanpa error.", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: "fa-solid fa-code", title: "API Publik", description: "Akses data kampus via REST API gratis untuk developer dan mahasiswa.", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: "fa-solid fa-chart-line", title: "Analitik", description: "Pemantauan real-time aktivitas seluruh jaringan kampus yang terhubung.", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: "fa-solid fa-lock", title: "Keamanan Tinggi", description: "HTTPS, HSTS, security headers, dan perlindungan DDoS via Vercel Edge.", color: "text-red-600", bg: "bg-red-50" },
  { icon: "fa-solid fa-globe", title: "Multi-Kampus", description: "Arsitektur multi-tenant yang mendukung ratusan universitas secara bersamaan.", color: "text-cyan-600", bg: "bg-cyan-50" },
];

const API_EXAMPLE = `// Contoh penggunaan API SiPadu
const res = await fetch(
  'https://sipadu.info/api/v1/gunadarma/jadwal?q=10123456'
);
const { results, source } = await res.json();

// Response:
{
  "results": [
    {
      "npm": "10123456",
      "nama": "Andi Saputra",
      "kelas": "3KA01",
      "jadwal": "WEB APP DEV WITH GO",
      "hari": "Senin",
      "ruang": "D412"
    }
  ],
  "source": "live" // atau "cache"
}`;

export default async function LandingPage() {
  const stats = await getStats();
  const totalData = stats.totalAnnouncements + stats.totalJadwal + stats.totalMateri + stats.totalKalender;
  return (
    <div className="min-h-screen bg-[#f8f8fa] text-slate-900 relative overflow-hidden">
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-200/15 rounded-full blur-[128px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#f8f8fa]/80 backdrop-blur-2xl">
        <div className="container mx-auto px-6 h-18 flex items-center justify-between max-w-6xl">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              SiPadu<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">.info</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#universitas" className="hover:text-slate-900 transition-colors duration-200">Universitas</a>
            <a href="#fitur" className="hover:text-slate-900 transition-colors duration-200">Fitur</a>
            <Link href="/api-docs" className="hover:text-slate-900 transition-colors duration-200">API</Link>
            <a href="#statistik" className="hover:text-slate-900 transition-colors duration-200">Statistik</a>
          </nav>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimateIn className="text-center max-w-4xl mx-auto">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-500 mb-10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              1 universitas aktif &middot; 4 dalam pengembangan
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8">
              <span className="text-slate-900">Satu portal</span>
              <br />
              <span className="text-slate-900">untuk </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                seluruh kampus.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
              Agregasi informasi akademik, jadwal kursus, pengumuman, dan materi dari berbagai universitas Indonesia — dalam satu platform <span className="text-slate-600 font-medium">terpadu</span> dan <span className="text-slate-600 font-medium">open-source</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#universitas" className={buttonVariants({ className: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 py-6 text-base font-medium shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer" })}>
                <i className="fa-solid fa-rocket mr-2" /> Pilih Kampus
              </a>
              <a href="https://github.com/cxernlol/sipadu" target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full px-8 py-6 text-base font-medium shadow-sm transition-all duration-300 cursor-pointer" })}>
                <i className="fa-brands fa-github mr-2" /> Star on GitHub
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="border-y border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-6xl py-10">
          <AnimateIn delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: String(stats.sources), label: "Sumber Data", suffix: "+" },
                { value: String(totalData), label: "Data Terintegrasi", suffix: "" },
                { value: "99.9", label: "Waktu Aktif", suffix: "%" },
                { value: "< 200", label: "Respons (ms)", suffix: "" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    {stat.value}<span className="text-blue-600">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ===== UNIVERSITY CARDS ===== */}
      <section id="universitas" className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimateIn className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-4 block">Jaringan Kampus</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Universitas yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">terhubung</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
              Platform multi-tenant yang menghubungkan sistem informasi kampus di seluruh Indonesia.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIVERSITIES.map((uni) => (
              <StaggerItem key={uni.id}>
                <a href={uni.domain} className={`block h-full ${uni.status !== "Live" ? "" : ""}`}>
                  <Card className={`relative overflow-hidden h-full border-slate-200/80 bg-white/70 backdrop-blur-sm transition-all duration-500 ${
                    uni.status === "Live"
                      ? "hover:bg-white hover:border-slate-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 group"
                      : "opacity-50"
                  }`}>
                    {/* Gradient accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${uni.accent} ${uni.status === "Live" ? "opacity-100" : "opacity-30"}`} />
                    
                    <CardContent className="p-7">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`h-14 w-14 rounded-2xl ${uni.iconBg} flex items-center justify-center ring-1 ${uni.ringColor} p-2.5 transition-transform duration-300 ${uni.status === "Live" ? "group-hover:scale-110" : ""}`}>
                          <img src={uni.logo} alt={uni.name} className={`w-full h-full object-contain ${uni.status !== "Live" ? "grayscale" : ""}`} />
                        </div>
                        {uni.status === "Live" ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold tracking-wide">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" /> AKTIF
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-50 text-slate-400 border border-slate-200 text-[10px] font-semibold tracking-wide">
                            SEGERA
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 mb-2 tracking-tight">{uni.name}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-5">{uni.description}</p>

                      <div className={`text-xs font-mono px-3 py-2 rounded-lg inline-flex items-center gap-2 transition-all duration-300 ${
                        uni.status === "Live"
                          ? "bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50"
                          : "bg-slate-50/50 text-slate-300"
                      }`}>
                        <i className="fa-solid fa-globe text-[10px]" />
                        {uni.id}.sipadu.info
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </StaggerItem>
            ))}

            {/* "More coming" card */}
            <StaggerItem>
              <Card className="relative overflow-hidden h-full border-dashed border-slate-200 bg-transparent hover:bg-white/50 transition-all duration-500 flex items-center justify-center min-h-[240px]">
                <CardContent className="p-7 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center ring-1 ring-slate-200 mx-auto mb-4">
                    <i className="fa-solid fa-plus text-slate-300 text-xl" />
                  </div>
                  <h3 className="font-semibold text-slate-400 mb-1">Segera hadir</h3>
                  <p className="text-xs text-slate-300">Universitas lainnya sedang disiapkan</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section id="fitur" className="py-24 md:py-32 border-t border-slate-200/60">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimateIn className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase mb-4 block">Mengapa SiPadu</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Dibangun untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">skala besar</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
              Infrastruktur modern yang siap menangani ratusan kampus secara bersamaan.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="group p-7 rounded-2xl border border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-500">
                  <div className={`h-12 w-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${feature.icon} ${feature.color} text-lg`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== API PREVIEW ===== */}
      <section id="api" className="py-24 md:py-32 border-t border-slate-200/60">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-4 block">API Publik</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                Data kampus,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">satu endpoint.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                Akses jadwal, pengumuman, dan materi dari seluruh universitas yang terhubung melalui REST API yang gratis dan terbuka. Dokumentasi lengkap, response time &lt;200ms.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">REST API</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">JSON Response</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">Rate Limited</span>
                <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">CORS Enabled</span>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
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
                  <code>{API_EXAMPLE}</code>
                </pre>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ===== ANALYTICS CHART ===== */}
      <section id="statistik" className="py-24 md:py-32 border-t border-slate-200/60">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimateIn className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-purple-600 uppercase mb-4 block">Statistik</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Aktivitas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">jaringan kampus</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
              Pemantauan real-time sinkronisasi data dari seluruh portal universitas.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm p-2 shadow-sm">
              <RealTimeStats />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 md:py-32 border-t border-slate-200/60">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <AnimateIn>
            <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-12 md:p-20 overflow-hidden shadow-sm">
              {/* Glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-100/40 rounded-full blur-[80px] -translate-y-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  Siap untuk memulai?
                </h2>
                <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10 font-light">
                  Jelajahi portal universitas yang sudah aktif, atau tunggu kampus Anda bergabung dalam jaringan SiPadu.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#universitas" className={buttonVariants({ className: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 py-6 text-base font-medium shadow-xl shadow-blue-500/25 transition-all duration-300 cursor-pointer" })}>
                    <i className="fa-solid fa-arrow-right mr-2" /> Pilih Kampus
                  </a>
                  <a href="https://github.com/cxernlol/sipadu" target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-8 py-6 text-base font-medium shadow-sm transition-all duration-300 cursor-pointer" })}>
                    <i className="fa-brands fa-github mr-2" /> Beri Bintang di GitHub
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200/60 bg-white">
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/25">
                  <i className="fa-solid fa-graduation-cap" />
                </div>
                <span className="text-base font-semibold tracking-tight text-slate-900">
                  SiPadu<span className="text-blue-600">.info</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Sistem Informasi Terpadu — Platform agregasi data akademik multi-universitas pertama di Indonesia. Sumber terbuka dan gratis untuk semua.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/gunadarma" className="text-slate-400 hover:text-slate-700 transition-colors">Gunadarma</Link></li>
                <li><Link href="/ui" className="text-slate-300 hover:text-slate-500 transition-colors">UI (Segera Hadir)</Link></li>
                <li><Link href="/ugm" className="text-slate-300 hover:text-slate-500 transition-colors">UGM (Segera Hadir)</Link></li>
                <li><Link href="/itb" className="text-slate-300 hover:text-slate-500 transition-colors">ITB (Segera Hadir)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/privacy" className="text-slate-400 hover:text-slate-700 transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-slate-700 transition-colors">Syarat & Ketentuan</Link></li>
                <li><a href="https://github.com/cxernlol/sipadu" className="text-slate-400 hover:text-slate-700 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-300">&copy; 2026 SiPadu.info &mdash; Agregator universitas sumber terbuka.</p>
            <p className="text-xs text-slate-300">Dihosting di <i className="fa-solid fa-triangle text-slate-400 mx-1" /> Vercel</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
