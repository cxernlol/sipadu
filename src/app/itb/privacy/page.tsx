export const metadata = {
  title: "Kebijakan Privasi - Institut Teknologi Bandung",
  description: "Kebijakan Privasi portal Institut Teknologi Bandung di SiPadu",
};

export default function ITBPrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <div className="bg-white dark:bg-zinc-900/50 p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <h1 className="font-serif text-4xl text-zinc-900 dark:text-zinc-50 mb-8">Kebijakan Privasi — Portal Institut Teknologi Bandung</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-serif">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2>1. Sumber Data Institut Teknologi Bandung</h2>
          <p>
            Portal Institut Teknologi Bandung (ITB) di platform SiPadu direncanakan untuk melakukan agregasi dan pengambilan data dari berbagai sumber informasi resmi ITB.
          </p>
          
          <h2>2. Penggunaan Data Publik</h2>
          <p>
            Semua data yang akan disajikan merupakan informasi publik yang tersedia secara terbuka bagi mahasiswa Institut Teknologi Bandung. SiPadu hanya bertindak sebagai fasilitator penyajian data agar lebih mudah diakses, dicari, dan dibaca.
          </p>

          <h2>3. Keamanan Pencarian</h2>
          <p>
            Pencarian dilakukan langsung terhadap sumber data publik menggunakan akses tamu (guest access) dan tidak melanggar batasan autentikasi. SiPadu tidak menyimpan informasi profil sensitif mahasiswa.
          </p>

          <h2>4. Kepatuhan (Compliance)</h2>
          <p>
            Tim pengembang SiPadu menghormati integritas sistem informasi Institut Teknologi Bandung. Sistem kami dirancang untuk mematuhi batasan akses. Jika Institut Teknologi Bandung menghendaki perubahan atau penghentian akses terhadap portal tertentu, kami akan mematuhinya sepenuhnya.
          </p>
        </div>
      </div>
    </div>
  );
}
