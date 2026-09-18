import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function UGMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar uni="ugm" />
      <main className="flex-1">
        {children}
      </main>
      <Footer uni="ugm" />
    </div>
  );
}
