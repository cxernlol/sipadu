import { getAnnouncements } from "@/lib/scraper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function PengumumanPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 8;
  const rawAnnouncements = await getAnnouncements();
  
  // Filter for VM LePKom only
  const allAnnouncements = rawAnnouncements.filter(a => a.source.toUpperCase().includes("LEPKOM"));
  
  const totalPages = Math.ceil(allAnnouncements.length / itemsPerPage);
  const announcements = allAnnouncements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <AnimateIn className="mb-8">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">VM LePKom Gunadarma</span>
        <h1 className="font-serif text-4xl text-slate-900 mb-2">Pengumuman Kursus</h1>
        <p className="text-slate-500">Informasi kursus resmi dari Virtual Machine Lembaga Pengembangan Komputer.</p>
      </AnimateIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <StaggerContainer className="lg:col-span-2 flex flex-col gap-4">
          {announcements.map((item) => (
            <StaggerItem key={item.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow border-slate-200 group">
              <CardContent className="p-0 flex flex-col sm:flex-row">
                <div className="bg-blue-50 text-blue-600 flex flex-col items-center justify-center p-6 sm:w-28 sm:border-r border-slate-100 flex-shrink-0">
                  <span className="text-3xl font-bold leading-none">{item.date.day}</span>
                  <span className="text-xs font-semibold uppercase mt-1 tracking-wider">{item.date.month}</span>
                  <span className="text-[10px] font-medium mt-0.5 opacity-75">{item.date.year}</span>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {item.tags.includes("BARU") && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] font-bold px-1.5 py-0 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 inline-block" />
                        BARU
                      </Badge>
                    )}
                    <h3 className="font-semibold text-slate-900 text-[15px]">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.description}</p>
                  
                  <div className="flex items-center gap-3">
                    {item.tags.filter(t => t !== "BARU").map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 text-[10px] font-medium rounded-full">
                        {tag}
                      </Badge>
                    ))}
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider ml-auto">
                      <span className="text-red-500/70">📌</span> {item.source}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            </StaggerItem>
          ))}
          {announcements.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              Tidak ada pengumuman VM LePKom saat ini.
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 mb-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                      <PaginationPrevious 
                      href={currentPage > 1 ? `/lepkom/pengumuman?page=${currentPage - 1}` : "#"} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink href={`/lepkom/pengumuman?page=${pageNumber}`} isActive={currentPage === pageNumber}>
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {totalPages > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href={currentPage < totalPages ? `/lepkom/pengumuman?page=${currentPage + 1}` : "#"}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </StaggerContainer>

        <StaggerContainer className="flex flex-col gap-6">
          <StaggerItem>
            <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4 text-sm"><i className="fa-solid fa-clock text-red-500"></i> Waktu Pelayanan LePKom</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Senin - Kamis</span>
                  <span className="font-medium">10.00 - 15.30</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Istirahat</span>
                  <span className="font-medium text-slate-400">12.00 - 13.30</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Jumat</span>
                  <span className="font-medium">10.00 - 15.30</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Istirahat</span>
                  <span className="font-medium text-slate-400">11.30 - 13.30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Sabtu</span>
                  <span className="font-medium">10.00 - 12.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
          </StaggerItem>

          <StaggerItem>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4 text-sm"><i className="fa-solid fa-location-dot text-red-500"></i> Status Wilayah</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-slate-600"><span className="h-2 w-2 rounded-full bg-green-500" /> Depok (F4-F8)</span>
                  <span className="text-green-600 font-semibold text-xs">Aktif</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-slate-600"><span className="h-2 w-2 rounded-full bg-green-500" /> Karawaci (K)</span>
                  <span className="text-green-600 font-semibold text-xs">Aktif</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-slate-600"><span className="h-2 w-2 rounded-full bg-green-500" /> Cengkareng (L)</span>
                  <span className="text-green-600 font-semibold text-xs">Aktif</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-slate-600"><span className="h-2 w-2 rounded-full bg-orange-400" /> Kalimalang (J5)</span>
                  <span className="text-orange-500 font-semibold text-xs">Libur</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-slate-600"><span className="h-2 w-2 rounded-full bg-orange-400" /> Salemba (C)</span>
                  <span className="text-orange-500 font-semibold text-xs">Libur</span>
                </div>
              </div>
            </CardContent>
          </Card>
          </StaggerItem>

          <StaggerItem>
          <Card className="border-slate-200 shadow-sm bg-slate-50/50">
            <CardContent className="p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4 text-sm text-slate-700"><i className="fa-solid fa-link text-slate-400"></i> Link Cepat</h3>
              <div className="flex flex-col gap-1">
                <Link href="#" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <i className="fa-solid fa-square-check text-green-500"></i> Cek Kelulusan
                </Link>
                <Link href="/jadwal" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <i className="fa-solid fa-calendar text-purple-500"></i> Jadwal Kursus
                </Link>
                <Link href="#" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <i className="fa-solid fa-book-open text-red-500"></i> E-Course LePKom
                </Link>
                <Link href="https://baak.gunadarma.ac.id" target="_blank" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <i className="fa-solid fa-building text-blue-500"></i> BAAK Gunadarma
                </Link>
              </div>
            </CardContent>
          </Card>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
}
