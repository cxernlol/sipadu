import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { UpdateNotifier } from "@/components/UpdateNotifier";
import { getAnnouncements } from "@/lib/scraper";

export default async function UniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let latestAnnouncement = null;
  try {
    const announcements = await getAnnouncements();
    latestAnnouncement = announcements[0];
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar uni="gunadarma" />
      <main className="flex-1">
        {children}
      </main>
      <Footer uni="gunadarma" />
      <Toaster />
      <UpdateNotifier latestId={latestAnnouncement?.id} latestTitle={latestAnnouncement?.title} />
    </div>
  );
}
