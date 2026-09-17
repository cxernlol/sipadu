import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ITBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar uni="itb" />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
