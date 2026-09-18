import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function UBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar uni="ub" />
      <main className="flex-1">
        {children}
      </main>
      <Footer uni="ub" />
    </div>
  );
}
