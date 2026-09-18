export const metadata = {
  title: "Kebijakan Privasi - Universitas Gunadarma",
  description: "Kebijakan Privasi portal Universitas Gunadarma di SiPadu",
};

export default function GunadarmaPrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <div className="bg-white dark:bg-zinc-900/50 p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <h1 className="font-serif text-4xl text-zinc-900 dark:text-zinc-50 mb-8">Kebijakan Privasi — Portal Gunadarma</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-serif">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2>1. Sumber Data Gunadarma</h2>
          <p>
            Portal Gunadarma di platform SiPadu secara otomatis melakukan agregasi dan pengambilan data (scraping) dari berbagai sumber resmi Universitas Gunadarma, termasuk namun tidak terbatas pada:
          </p>
          <ul>
            <li>Biro Administrasi Akademik dan Kemahasiswaan (BAAK)</li>
            <li>Virtual Machine Lembaga Pengembangan Komputer (VM LePKom)</li>
            <li>StudentSite Universitas Gunadarma</li>
          </ul>
          
          <h2>2. Penggunaan Data Publik</h2>
          <p>
            Semua data yang disajikan, seperti pengumuman, jadwal praktikum, dan materi kursus, merupakan informasi publik yang tersedia secara terbuka bagi mahasiswa Universitas Gunadarma. SiPadu hanya bertindak sebagai fasilitator penyajian data agar lebih mudah diakses, dicari, dan dibaca.
          </p>

          <h2>3. Keamanan Pencarian</h2>
          <p>
            Fitur pencarian seperti jadwal praktikan berdasarkan Nomor Pokok Mahasiswa (NPM) dilakukan langsung terhadap sumber data publik (misal, sistem pencarian LePKom) menggunakan akses tamu (guest access) dan tidak melanggar batasan autentikasi. SiPadu tidak menyimpan informasi profil sensitif mahasiswa selain hasil indeks pencarian umum.
          </p>

          <h2>4. Kepatuhan (Compliance)</h2>
          <p>
            Tim pengembang SiPadu menghormati integritas sistem informasi Universitas Gunadarma. Sistem kami dirancang untuk tidak membebani server universitas (implementasi caching) dan mematuhi batasan Web Application Firewall (WAF). Jika Universitas Gunadarma menghendaki perubahan atau penghentian akses terhadap portal tertentu, kami akan mematuhinya sepenuhnya.
          </p>
        </div>
      </div>
    </div>
  );
}
