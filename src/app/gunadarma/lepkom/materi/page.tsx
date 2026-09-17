import { getMateri } from "@/lib/scraper";
import { MateriTabs } from "@/components/lepkom/MateriTabs";

export default async function MateriPage() {
  const materi = await getMateri();

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <div className="mb-4">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">VM LEPKOM</span>
        <h1 className="font-serif text-4xl text-slate-900 mb-2">Materi Kursus</h1>
        <p className="text-slate-500">Daftar lengkap materi per tingkat dari program kursus LePKom.</p>
      </div>

      <MateriTabs materi={materi} />
    </div>
  );
}
