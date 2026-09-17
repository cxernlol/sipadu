import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

export default function UBPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4">
      <AnimateIn className="text-center max-w-2xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full text-sm font-medium text-orange-600 border border-orange-200 shadow-sm mb-8">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Universitas Brawijaya
        </div>
        
        <i className="fa-solid fa-person-digging text-6xl text-slate-300 mb-8"></i>
        
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-slate-900">
          Sistem informasi dalam <br/><span className="text-orange-600">tahap pengembangan.</span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-10">
          Kami sedang memetakan sistem informasi dan sumber data untuk mahasiswa UB. Fitur ini akan segera tersedia!
        </p>
        
        <Link 
          href="/" 
          className="text-slate-500 hover:text-slate-800 transition-colors font-medium border-b border-transparent hover:border-slate-800"
        >
          Kembali ke Beranda SiPadu
        </Link>
      </AnimateIn>
    </div>
  );
}
