import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
        <i className="fa-solid fa-triangle-exclamation text-4xl text-red-500"></i>
      </div>
      
      <h1 className="font-serif text-6xl text-slate-900 mb-4 font-bold tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Halaman Tidak Ditemukan</h2>
      
      <p className="text-slate-500 max-w-md mb-10 text-lg">
        Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak tersedia sementara.
      </p>
      
      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 h-auto text-lg flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg">
            <i className="fa-solid fa-house"></i> Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}
