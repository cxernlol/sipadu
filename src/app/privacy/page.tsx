export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan Privasi SiPadu",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="font-serif text-4xl text-slate-900 mb-8">Kebijakan Privasi</h1>
        
        <div className="prose prose-slate max-w-none prose-headings:font-serif">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2>1. Pengumpulan Informasi</h2>
          <p>
            SiPadu mengumpulkan informasi secara anonim untuk keperluan analitik dan fungsionalitas dasar seperti pencarian dan pengaturan filter.
          </p>
          
          <h2>2. Penggunaan Data</h2>
          <p>
            Data yang dikumpulkan digunakan semata-mata untuk:
          </p>
          <ul>
            <li>Menyediakan informasi akademik secara real-time.</li>
            <li>Menganalisis performa website untuk perbaikan UX.</li>
            <li>Mematuhi standar keamanan Universitas.</li>
          </ul>

          <h2>3. Cookie</h2>
          <p>
            Kami menggunakan cookie lokal (localStorage) untuk menyimpan preferensi Anda seperti status persetujuan cookie (Cookie Consent) agar Anda tidak ditanya berulang kali. Kami tidak melacak data pengguna lintas situs.
          </p>

          <h2>4. Hubungi Kami</h2>
          <p>
            Jika ada pertanyaan lebih lanjut terkait Kebijakan Privasi ini, silakan hubungi tim administrasi Universitas Gunadarma melalui portal BAAK atau LePKom.
          </p>
        </div>
      </div>
    </div>
  );
}
