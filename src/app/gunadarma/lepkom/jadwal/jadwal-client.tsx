"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Schedule } from "@/lib/scraper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";

// The shape of the search result we parsed
export interface SearchResult {
  no: string;
  npm: string;
  nama: string;
  kelas: string;
  jadwal: string;
  kodeJadwal: string;
  kategori: string;
  lokasi: string;
  hari: string;
  ruang: string;
  sesi: string;
}

export function JadwalClient() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(keyword)}`);
      if (!res.ok) throw new Error("Gagal mencari jadwal");
      
      const data = await res.json();
      setResults(data.results || []);
      setIsFallback(!!data.isFallback);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      <AnimateIn delay={0.1} className="md:col-span-1">
        <Card className="border-slate-200 sticky top-24 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm px-1">
              <i className="fa-solid fa-magnifying-glass text-blue-500"></i> Cari Jadwal
            </h3>
            
            <form onSubmit={handleSearch} className="space-y-3">
              <Input 
                placeholder="NPM / Nama / Kelas" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-slate-50 border-slate-200"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-search mr-2"></i>}
                Cari Jadwal
              </Button>
            </form>

            <div className="text-xs text-slate-500 bg-amber-50 p-3 rounded mt-4 border border-amber-100">
              <i className="fa-solid fa-circle-info text-amber-500 mr-1"></i>
              Masukkan NPM, Nama, Kelas, atau Kode Jadwal Anda untuk melihat jadwal praktikan yang spesifik.
            </div>
          </CardContent>
        </Card>
      </AnimateIn>

      <AnimateIn delay={0.2} className="md:col-span-3">
        <Card className="border-slate-200 shadow-sm overflow-hidden border-0 ring-1 ring-slate-200">
          <div className="bg-blue-700 text-white p-4">
            <h3 className="font-semibold flex items-center gap-2">
              <i className="fa-solid fa-calendar-days text-red-400"></i> Hasil Pencarian Jadwal
            </h3>
            {isFallback && (
              <span className="text-xs bg-amber-500/20 text-amber-100 border border-amber-500/50 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium mt-2 md:mt-0">
                <i className="fa-solid fa-bolt"></i> Server sibuk, menggunakan data cache
              </span>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-600 hover:bg-blue-600">
                <TableRow className="border-b-0">
                  <TableHead className="text-blue-50 font-medium text-xs">NPM</TableHead>
                  <TableHead className="text-blue-50 font-medium text-xs min-w-[150px]">NAMA</TableHead>
                  <TableHead className="text-blue-50 font-medium text-xs">KELAS</TableHead>
                  <TableHead className="text-blue-50 font-medium text-xs min-w-[200px]">KURSUS</TableHead>
                  <TableHead className="text-blue-50 font-medium text-xs">HARI</TableHead>
                  <TableHead className="text-blue-50 font-medium text-xs min-w-[100px]">SESI</TableHead>
                  <TableHead className="text-blue-50 font-medium text-xs">RUANG</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                      <i className="fa-solid fa-spinner fa-spin text-2xl mb-2 text-blue-500 block"></i>
                      Sedang mencari data ke server LePKom...
                    </TableCell>
                  </TableRow>
                )}
                
                {!loading && error && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-red-500">
                      <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                      {error}
                    </TableCell>
                  </TableRow>
                )}
                
                {!loading && !error && results && results.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                      Data Jadwal Belum Tersedia! Atau NPM tidak ditemukan.
                    </TableCell>
                  </TableRow>
                )}

                {!loading && !error && results && results.length > 0 && results.map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50/80">
                    <TableCell className="font-semibold text-slate-700 text-xs">{item.npm}</TableCell>
                    <TableCell className="text-slate-700 font-medium text-xs">{item.nama}</TableCell>
                    <TableCell className="text-slate-500 font-semibold text-xs">{item.kelas}</TableCell>
                    <TableCell className="text-slate-600 text-xs">
                      <div>{item.jadwal}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.kodeJadwal}</div>
                    </TableCell>
                    <TableCell className="text-slate-600 font-semibold text-xs">{item.hari}</TableCell>
                    <TableCell className="text-slate-600 text-xs">{item.sesi}</TableCell>
                    <TableCell className="text-slate-600 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded font-mono font-semibold">{item.ruang}</span>
                    </TableCell>
                  </TableRow>
                ))}
                
                {!loading && !error && results === null && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <i className="fa-solid fa-magnifying-glass text-4xl mb-3 text-slate-200"></i>
                        <span>Silahkan cari NPM Anda terlebih dahulu</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </AnimateIn>
    </div>
  );
}
