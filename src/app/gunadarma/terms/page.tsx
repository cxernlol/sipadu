export const metadata = {
  title: "Syarat dan Ketentuan - Universitas Gunadarma",
  description: "Syarat dan Ketentuan portal Universitas Gunadarma di SiPadu",
};

export default function GunadarmaTermsOfService() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <div className="bg-white dark:bg-zinc-900/50 p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <h1 className="font-serif text-4xl text-zinc-900 dark:text-zinc-50 mb-8">Syarat & Ketentuan — Portal Gunadarma</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-serif">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2>1. Batasan Tanggung Jawab (Disclaimer)</h2>
          <p>
            Portal Gunadarma di SiPadu adalah layanan independen dan <strong>TIDAK BERAFILIASI</strong> secara resmi dengan Universitas Gunadarma, BAAK, LePKom, maupun unit-unit lainnya. SiPadu merupakan inisiatif mahasiswa (open-source) untuk membantu mempermudah akses informasi akademik.
          </p>
          
          <h2>2. Validitas Informasi</h2>
          <p>
            Pengguna diwajibkan untuk selalu merujuk pada sumber aslinya (misalnya, baak.gunadarma.ac.id atau vm.lepkom.gunadarma.ac.id) sebagai sumber kebenaran (source of truth). SiPadu tidak bertanggung jawab atas kerugian finansial, akademik (misalnya, keterlambatan pembayaran atau ketidakhadiran praktikum), atau masalah lain yang timbul dari keterlambatan pembaruan data atau kesalahan parsing (parsing error) di platform kami.
          </p>

          <h2>3. Tautan Eksternal</h2>
          <p>
            Beberapa tautan, seperti unduhan file PDF Kalender Akademik atau tautan lampiran pengumuman, mungkin mengarahkan pengguna ke server asli Universitas Gunadarma. SiPadu tidak mengontrol dan tidak bertanggung jawab atas isi atau ketersediaan sumber daya di server eksternal tersebut.
          </p>

          <h2>4. Perubahan Layanan</h2>
          <p>
            Karena SiPadu sangat bergantung pada struktur HTML dari portal resmi Universitas, jika Universitas melakukan pembaruan (redesign) pada portal mereka, fitur pencarian atau umpan (feed) SiPadu mungkin akan terganggu atau tidak berfungsi sementara waktu sampai perbaikan dikerahkan oleh tim pengembang.
          </p>
        </div>
      </div>
    </div>
  );
}
