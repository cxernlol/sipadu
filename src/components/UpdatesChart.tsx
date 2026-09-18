import { getStats } from "@/lib/scraper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function RealTimeStats() {
  const stats = await getStats();

  const lastUpdatedStr = stats.lastUpdated
    ? new Date(stats.lastUpdated).toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "Tidak tersedia";

  const items = [
    {
      label: "Pengumuman",
      value: stats.totalAnnouncements,
      icon: "fa-solid fa-bullhorn",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/30",
      description: "Dari BAAK, LePKom & StudentSite",
    },
    {
      label: "Data Jadwal",
      value: stats.totalJadwal,
      icon: "fa-solid fa-calendar-days",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/30",
      description: "Entri jadwal kursus praktikan",
    },
    {
      label: "Materi Kursus",
      value: stats.totalMateri,
      icon: "fa-solid fa-book-open",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      description: "Topik dari seluruh tingkat",
    },
    {
      label: "Kalender",
      value: stats.totalKalender,
      icon: "fa-solid fa-calendar-check",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/30",
      description: "Kegiatan semester terjadwal",
    },
  ];

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50">Data Terintegrasi — Real-Time</CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total data yang tersinkronisasi dari {stats.sources} sumber universitas
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-zinc-900 p-5 hover:shadow-md dark:hover:shadow-black/50 transition-shadow group"
            >
              <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${item.icon} ${item.color}`} />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">{item.value}</div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">{item.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</div>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-medium text-emerald-700 dark:text-emerald-400">Sistem aktif</span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            Fallback otomatis tersedia
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <i className="fa-regular fa-clock" />
            Terakhir diperbarui: {lastUpdatedStr}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
