import { getJadwal } from "@/lib/scraper";
import type { Metadata } from "next";
import { JadwalClient } from "./jadwal-client";

export const metadata: Metadata = {
  title: "Jadwal Kursus LePKom",
  description: "Cari jadwal kursus dan pengulangan praktikum VM LePKom Universitas Gunadarma berdasarkan NPM, nama, atau kelas.",
  alternates: { canonical: "/gunadarma/lepkom/jadwal" },
};
export default async function JadwalPage() {
  const schedule = await getJadwal();

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">VM LEPKOM</span>
        <h1 className="font-serif text-4xl text-slate-900 mb-2">Jadwal Kursus</h1>
        <p className="text-slate-500">Pilih wilayah untuk melihat jadwal kursus dan pengulangan.</p>
      </div>

      <JadwalClient />
    </div>
  );
}
