import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Kalender Akademik BAAK",
  description: "Jadwal kegiatan akademik Ganjil (PTA) 2026/2027 Universitas Gunadarma dari BAAK.",
  alternates: { canonical: "/gunadarma/baak/kalender" },
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

export default function BaakKalenderPage() {
  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <AnimateIn delay={0.1}>
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">BAAK GUNADARMA</span>
          <h1 className="font-serif text-4xl text-slate-900 mb-2">Kalender Akademik</h1>
          <p className="text-slate-500">
            Jadwal kegiatan akademik Ganjil (PTA) 2026/2027 Universitas Gunadarma.
          </p>
        </AnimateIn>
        
        <AnimateIn delay={0.2}>
          <a href="/baak/KAPTA2627.pdf" target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-sm rounded-lg transition-all hover:shadow hover:-translate-y-0.5">
              <i className="fa-solid fa-file-pdf"></i>
              Download PDF Resmi
            </Button>
          </a>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.3} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-2/3 font-semibold text-slate-900 py-4 px-6">Kegiatan Akademik</TableHead>
              <TableHead className="font-semibold text-slate-900 py-4 px-6">Tanggal Pelaksanaan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {KALENDER_PTA_2026.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-slate-50/80 transition-colors border-slate-100">
                <TableCell className="font-medium text-slate-700 py-4 px-6 leading-relaxed">
                  {item.kegiatan}
                </TableCell>
                <TableCell className="text-slate-600 py-4 px-6">
                  <div className="inline-flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 shadow-sm whitespace-nowrap">
                    <i className="fa-regular fa-calendar-days text-blue-500"></i>
                    {item.tanggal}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AnimateIn>
      <AnimateIn delay={0.4} className="mt-8">
        <h2 className="font-serif text-2xl text-slate-900 mb-4">Dokumen Resmi PDF</h2>
        <div className="w-full aspect-[4/3] max-h-[800px] border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50 relative">
          <iframe 
            src="/baak/KAPTA2627.pdf#view=FitH" 
            className="w-full h-full absolute inset-0"
            title="Kalender Akademik PDF"
          >
            <p className="p-6 text-center text-slate-500">
              Browser Anda tidak mendukung pratinjau PDF. 
              <a href="/baak/KAPTA2627.pdf" className="text-blue-600 hover:underline ml-1">Download file PDF ini</a>.
            </p>
          </iframe>
        </div>
      </AnimateIn>
    </div>
  );
}
