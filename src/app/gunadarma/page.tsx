import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAnnouncements, type Announcement } from "@/lib/scraper";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { GunadarmaFeed } from "@/components/gunadarma/GunadarmaFeed";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Universitas Gunadarma — SiPadu",
  description: "Portal terpadu pengumuman, jadwal kursus, materi LePKom, dan kalender akademik Universitas Gunadarma.",
  alternates: { canonical: "/gunadarma" },
};

const KALENDER_PTA_2026 = [
  { kegiatan: "Pengenalan Kehidupan Kampus bagi Mahasiswa Baru (PKKMB)", tanggal: "21 September – 26 September 2026" },
  { kegiatan: "Kursus/Pelatihan Berbasis Kompentensi untuk kelas 2 dan 4 jenjang S1, kelas 3 jenjang D3", tanggal: "21 September – 26 September 2026" },
  { kegiatan: "Perkuliahan Sebelum Ujian Tengah Semester (UTS)", tanggal: "28 September – 5 Desember 2026" },
  { kegiatan: "Pendistribusian FRS ke mahasiswa melalui situs www.baak.gunadarma.ac.id", tanggal: "28 September – 24 Oktober 2026" },
  { kegiatan: "Kegiatan Pengisian dan Cetak KRS online (termasuk Batal/Ubah/Tambah)", tanggal: "28 September – 24 Oktober 2026" },
  { kegiatan: "Batas akhir Cetak KRS Online", tanggal: "21 November 2026" },
  { kegiatan: "Ujian Tengah Semester (UTS)", tanggal: "7 Desember – 24 Desember 2026" },
  { kegiatan: "Batas akhir pengurusan cuti akademik", tanggal: "14 Desember 2026" },
  { kegiatan: "Libur Hari Natal dan Tahun Baru", tanggal: "25 Desember 2026 – 2 Januari 2027" },
  { kegiatan: "Perkuliahan setelah UTS", tanggal: "4 Januari – 30 Januari 2027" },
  { kegiatan: "Ujian Utama", tanggal: "1 Februari – 8 Februari 2027" },
  { kegiatan: "Ujian Akhir Semester (UAS)", tanggal: "9 Februari – 20 Februari 2027" },
  { kegiatan: "Kursus/Pelatihan Berbasis Kompentensi untuk kelas 1 dan kelas 3 jenjang S1", tanggal: "22 Februari – 27 Februari 2027" },
];

export default async function Home() {
  const currentUni = { name: "Universitas Gunadarma", color: "bg-blue-600", badge: "bg-green-500", iconColor: "text-blue-600" };

  let announcements: Announcement[] = [];
  try {
    announcements = await getAnnouncements();
  } catch (e) {
    console.error(e);
  }
  
  const topUpdates = announcements.slice(0, 3); // Take top 3 for the feed

  return (
    <>
      {/* Top Banner */}
      <div className={`${currentUni.color} text-white py-2.5 text-sm overflow-hidden relative flex items-center border-b border-blue-700/50 shadow-inner`}>
        <div className="container mx-auto px-4 max-w-6xl flex items-center">
          {announcements.length > 0 ? (
            <>
              {/* Static LIVE Badge */}
              <div className="z-10 flex-shrink-0 mr-6 bg-white text-blue-600 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold flex items-center gap-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                LIVE
              </div>
              
              {/* Scrolling Text Container */}
              <div className="flex-1 overflow-hidden whitespace-nowrap mask-edges">
                <div className="inline-flex gap-8 animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
                  {topUpdates.map((update, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {idx > 0 && <span className="text-white/40">&bull;</span>}
                      <span className="font-medium tracking-wide">{update.title}</span>
                    </div>
                  ))}
                  {/* Duplicate for seamless infinite scroll if needed, or just let the animation handle it */}
                  <span className="text-white/40">&bull;</span>
                  {topUpdates.map((update, idx) => (
                    <div key={`dup-${idx}`} className="flex items-center gap-3">
                      {idx > 0 && <span className="text-white/40">&bull;</span>}
                      <span className="font-medium tracking-wide">{update.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 w-full justify-center">
              <span>Sistem informasi terpadu {currentUni.name} sedang dalam tahap pengembangan.</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-16 md:py-24 flex flex-col items-center overflow-hidden">
        
        {/* Hero Section */}
        <AnimateIn delay={0.1} className="text-center max-w-3xl flex flex-col items-center">
          <div className={`inline-flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-1.5 rounded-full text-sm font-medium ${currentUni.iconColor} dark:text-blue-400 border dark:border-zinc-800 shadow-sm mb-12`}>
            <span className={`h-2 w-2 rounded-full ${currentUni.badge}`} />
            {currentUni.name}
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6 tracking-tight text-slate-900 dark:text-zinc-50">
            Semua informasi<br />
            kampus, <span className={`${currentUni.iconColor} dark:text-blue-400`}>satu<br />tempat.</span>
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-zinc-400 mb-10 max-w-xl">
            Pengumuman, jadwal kursus, materi, dan agenda dari BAAK & VM LePKom &mdash; terpadu, real-time, tanpa login.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link 
              href="/gunadarma/baak/pengumuman" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              Pengumuman BAAK
            </Link>
            <Link 
              href="/gunadarma/lepkom/jadwal" 
              className="bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Jadwal VM LePKom
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-24 border-t dark:border-zinc-800 pt-10 w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 mb-1">2</h2>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Sumber Data</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 mb-1">5+</h2>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Wilayah</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 mb-1">0</h2>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Login Dibutuhkan</p>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-black border-t dark:border-zinc-800 py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimateIn delay={0.2} className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-4 block">Fitur</span>
            <h2 className="font-serif text-4xl text-slate-900 dark:text-zinc-50">Apa saja yang tersedia?</h2>
          </AnimateIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerItem>
              <Link href="/gunadarma/baak/pengumuman" className="block outline-none group">
                <FeatureCard 
                  icon={<i className="fa-solid fa-bullhorn text-2xl text-blue-500 group-hover:scale-110 transition-transform"></i>}
                iconBg="bg-blue-50 dark:bg-blue-900/30"
                title="Pengumuman BAAK"
                description="Info akademik dan jadwal perkuliahan resmi dari BAAK."
              />
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/gunadarma/lepkom/pengumuman" className="block outline-none group">
                <FeatureCard 
                  icon={<i className="fa-solid fa-laptop-code text-2xl text-red-500 group-hover:scale-110 transition-transform"></i>}
                iconBg="bg-red-50 dark:bg-red-900/30"
                title="Pengumuman LePKom"
                description="Info terbaru seputar pendaftaran dan kegiatan VM LePKom."
              />
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/gunadarma/lepkom/jadwal" className="block outline-none group">
                <FeatureCard 
                  icon={<i className="fa-solid fa-calendar text-2xl text-purple-500 group-hover:scale-110 transition-transform"></i>}
                iconBg="bg-purple-50 dark:bg-purple-900/30"
                title="Jadwal Kursus"
                description="Kursus reguler, pengulangan, dan kloter per wilayah kampus."
                />
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/gunadarma/lepkom/materi" className="block outline-none group">
                <FeatureCard 
                  icon={<i className="fa-solid fa-book-open text-2xl text-teal-500 group-hover:scale-110 transition-transform"></i>}
                iconBg="bg-teal-50 dark:bg-teal-900/30"
                title="Materi Kursus"
                description="Daftar materi Tingkat 1 - 4 dari seluruh program kursus LePKom."
                />
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/gunadarma/lepkom/kalender" className="block outline-none group">
                <FeatureCard 
                  icon={<i className="fa-solid fa-calendar-days text-2xl text-orange-500 group-hover:scale-110 transition-transform"></i>}
                iconBg="bg-orange-50 dark:bg-orange-900/30"
                title="Kalender LePKom"
                description="Tanggal penting semester, libur, dan periode pengulangan kursus."
                />
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/gunadarma/baak/kalender" className="block outline-none group">
                <FeatureCard 
                  icon={<i className="fa-solid fa-calendar-check text-2xl text-green-500 group-hover:scale-110 transition-transform"></i>}
                iconBg="bg-green-50 dark:bg-green-900/30"
                title="Kalender BAAK"
                description="Jadwal kegiatan akademik, KRS, UTS, dan UAS resmi Universitas Gunadarma."
                />
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      {/* Kalender Akademik Section */}
      <div className="bg-white dark:bg-black border-t dark:border-zinc-800 py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <AnimateIn delay={0.2}>
              <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2 block">BAAK GUNADARMA</span>
              <h2 className="font-serif text-4xl text-slate-900 dark:text-zinc-50">Kalender Akademik</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-2 max-w-2xl">
                Jadwal kegiatan akademik Ganjil (PTA) 2026/2027 Universitas Gunadarma.
              </p>
            </AnimateIn>
            
            <AnimateIn delay={0.3}>
              <a href="/baak/KAPTA2627.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-sm rounded-lg transition-all hover:shadow hover:-translate-y-0.5">
                  <i className="fa-solid fa-file-pdf"></i>
                  Download PDF Resmi
                </Button>
              </a>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.4} className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden mb-8">
            <Table>
              <TableHeader className="bg-slate-50/80 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
                <TableRow className="hover:bg-transparent border-slate-200 dark:border-zinc-800">
                  <TableHead className="w-2/3 font-semibold text-slate-900 dark:text-zinc-50 py-4 px-6">Kegiatan Akademik</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-zinc-50 py-4 px-6">Tanggal Pelaksanaan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {KALENDER_PTA_2026.map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/50 transition-colors border-slate-100 dark:border-zinc-800">
                    <TableCell className="font-medium text-slate-700 dark:text-zinc-300 py-4 px-6 leading-relaxed">
                      {item.kegiatan}
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-zinc-400 py-4 px-6">
                      <div className="inline-flex items-center gap-2 bg-slate-100/80 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 dark:border-zinc-700 shadow-sm whitespace-nowrap">
                        <i className="fa-regular fa-calendar-days text-blue-500 dark:text-blue-400"></i>
                        {item.tanggal}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AnimateIn>
          
          <AnimateIn delay={0.5} className="text-center">
             <Link href="/gunadarma/baak/kalender" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center gap-2 hover:underline">
               Lihat detail Kalender Akademik <i className="fa-solid fa-arrow-right text-xs"></i>
             </Link>
          </AnimateIn>
        </div>
      </div>

      {/* Live Feed Section */}
      <div className="bg-slate-50 dark:bg-zinc-950 border-t dark:border-zinc-800 py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimateIn delay={0.2} className="mb-10">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2 block">Informasi Terbaru</span>
            <h2 className="font-serif text-4xl text-slate-900 dark:text-zinc-50">Pusat Pengumuman</h2>
            <p className="text-slate-500 dark:text-zinc-400 mt-2 max-w-2xl">
              Daftar pengumuman dan berita terbaru dari seluruh portal sistem informasi Universitas Gunadarma, termasuk BAAK, VM LePKom, dan StudentSite.
            </p>
          </AnimateIn>
          
          <GunadarmaFeed announcements={announcements} />
        </div>
      </div>
    </>
  );
}

function FeatureCard({ icon, iconBg, title, description }: { icon: React.ReactNode, iconBg: string, title: string, description: string }) {
  return (
    <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300 border-slate-200">
      <CardContent className="p-8">
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 ${iconBg}`}>
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
