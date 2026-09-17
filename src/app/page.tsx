import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { UpdatesChart } from "@/components/UpdatesChart";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UNIVERSITIES = [
  { id: "gunadarma", name: "Universitas Gunadarma", domain: "http://gunadarma.localhost:3000", status: "Live", color: "bg-purple-500", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Logo_Universitas_Gunadarma.svg" },
  { id: "ui", name: "Universitas Indonesia", domain: "http://ui.localhost:3000", status: "Coming Soon", color: "bg-yellow-500", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Universitas_Indonesia_logo.svg" },
  { id: "ugm", name: "Universitas Gadjah Mada", domain: "http://ugm.localhost:3000", status: "Coming Soon", color: "bg-blue-600", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Lambang_UGM.svg" },
  { id: "itb", name: "Institut Teknologi Bandung", domain: "http://itb.localhost:3000", status: "Coming Soon", color: "bg-teal-600", logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Institut_Teknologi_Bandung_logo.svg" },
  { id: "ub", name: "Universitas Brawijaya", domain: "http://ub.localhost:3000", status: "Coming Soon", color: "bg-orange-500", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Universitas_Brawijaya.svg" },
];

export default function MvpLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col overflow-hidden">
      {/* Abstract Modern Background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 opacity-70 -z-10"></div>
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl -z-10 animate-pulse delay-1000"></div>

      {/* Global Navbar */}
      <header className="bg-white/60 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
          <Link href="/" className="font-serif text-2xl font-bold flex items-center gap-2.5 group">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-md shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
            <span className="tracking-tight text-slate-900">SiPadu<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">.info</span></span>
          </Link>
          
          <div className="flex items-center gap-6">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent font-medium text-slate-600">Universities</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {UNIVERSITIES.map((uni) => (
                        <li key={uni.id}>
                          <NavigationMenuLink asChild>
                            <a
                              href={uni.domain}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900"
                            >
                              <div className="text-sm font-medium leading-none flex items-center gap-2">
                                <img src={uni.logo} alt={uni.name} className="h-4 w-4 object-contain" />
                                {uni.name}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500 mt-1">
                                {uni.status === "Live" ? "Sistem informasi terpadu aktif." : "Dalam tahap pengembangan."}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ className: "bg-blue-600 hover:bg-blue-700 rounded-full px-6 text-white cursor-pointer" })}>
                Pilih Kampus <i className="fa-solid fa-chevron-down ml-2 text-xs"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Universitas Didukung</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {UNIVERSITIES.map((uni) => (
                  <DropdownMenuItem key={uni.id} asChild>
                    <a href={uni.domain} className="cursor-pointer flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <img src={uni.logo} alt={uni.name} className="h-4 w-4 object-contain" />
                        {uni.name}
                      </span>
                      {uni.status === "Live" && <Badge variant="secondary" className="text-[9px] px-1 py-0 bg-green-100 text-green-700">LIVE</Badge>}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-24">
        <div className="container mx-auto px-4 max-w-6xl overflow-hidden relative z-10">
          <AnimateIn className="text-center max-w-4xl mx-auto mb-20 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 backdrop-blur-sm text-blue-700 text-xs font-semibold tracking-wide mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              SI PADU &mdash; MVP PLATFORM
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter text-slate-900">
              Satu portal untuk <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 relative">
                seluruh kampus.
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-indigo-400/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="transparent"/></svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
              Akses informasi akademik, jadwal kursus, dan pengumuman dari berbagai universitas dalam satu platform terpadu yang <span className="font-medium text-slate-700">cepat</span> dan <span className="font-medium text-slate-700">modern</span>.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {UNIVERSITIES.map((uni) => (
              <StaggerItem key={uni.id}>
                <Card className={`overflow-hidden transition-all duration-500 bg-white/70 backdrop-blur-xl border-white/40 ${uni.status === "Live" ? "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer group hover:bg-white" : "opacity-80 grayscale hover:grayscale-[50%] cursor-not-allowed shadow-sm"}`}>
                  <a href={uni.status === "Live" ? uni.domain : "#"} className="block outline-none h-full">
                    <CardContent className="p-8 relative h-full flex flex-col">
                      <div className="absolute top-6 right-6">
                        {uni.status === "Live" ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> LIVE</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-100/80 backdrop-blur text-slate-500 shadow-sm"><i className="fa-solid fa-person-digging mr-1.5"></i> Coming Soon</Badge>
                        )}
                      </div>
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border p-2 bg-white ${uni.status === "Live" ? `border-${uni.color.split('-')[1]}-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300` : 'border-slate-200 grayscale opacity-70'}`}>
                        <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <h3 className="font-serif font-bold text-2xl mb-3 text-slate-900 leading-tight">{uni.name}</h3>
                      <p className="text-slate-500 text-sm mb-6 flex-1 font-light leading-relaxed">
                        {uni.status === "Live" ? `Akses portal SiPadu ${uni.name.split(' ')[1]} sekarang. Terhubung langsung dengan sistem akademik resmi.` : "Portal sistem informasi sedang dalam tahap pengembangan tim engineering."}
                      </p>
                      
                      <div className="mt-auto">
                        <div className={`text-xs font-mono font-medium px-3 py-2 rounded-lg inline-flex items-center gap-2 transition-colors ${uni.status === "Live" ? "bg-blue-50 text-blue-700 group-hover:bg-blue-100" : "bg-slate-50 text-slate-400"}`}>
                          <i className="fa-solid fa-link opacity-50"></i>
                          {uni.domain.replace('http://', '')}
                        </div>
                      </div>
                    </CardContent>
                  </a>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-3xl border border-white/50 shadow-2xl p-2 md:p-4 mt-12 mb-12 max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 z-0"></div>
            <div className="relative z-10 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 md:p-10 border-b border-slate-50 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Aktivitas Jaringan Kampus</h2>
                  <p className="text-slate-500 font-light">Pemantauan real-time status sinkronisasi data seluruh portal universitas.</p>
                </div>
                <div className="hidden md:flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400"></span>
                  <span className="h-3 w-3 rounded-full bg-amber-400"></span>
                  <span className="h-3 w-3 rounded-full bg-green-400"></span>
                </div>
              </div>
              <div className="p-4 bg-slate-50/50">
                <AnimateIn delay={0.4}>
                  <UpdatesChart />
                </AnimateIn>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center max-w-6xl text-sm text-slate-500">
          <p>&copy; 2026 SiPadu.info - The Multi-Tenant University Portal MVP.</p>
        </div>
      </footer>
    </div>
  );
}
