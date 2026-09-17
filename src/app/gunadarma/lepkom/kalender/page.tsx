import { getKalender } from "@/lib/scraper";
import { Card, CardContent } from "@/components/ui/card";

export default async function KalenderPage() {
  const events = await getKalender();

  return (
    <div className="container mx-auto px-4 max-w-6xl py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">KALENDER LEPKOM ATA 2025/2026</span>
        <h1 className="font-serif text-4xl text-slate-900 mb-2">Kalender LePKom</h1>
        <p className="text-slate-500">Tanggal penting kursus, pengulangan, dan libur semester.</p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {events.map((event) => (
          <Card key={event.id} className="border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Decorative line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
            
            <CardContent className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">{event.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{event.subtitle}</p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <h4 className="font-bold text-blue-700 text-[15px]">{event.date}</h4>
                <p className="text-xs font-medium text-slate-400 mt-1">{event.locations}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
