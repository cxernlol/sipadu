export const metadata = {
  title: "Syarat & Ketentuan - Universitas Indonesia",
  description: "Syarat dan Ketentuan portal Universitas Indonesia di SiPadu",
};

export default function UITermsOfService() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <div className="bg-white dark:bg-zinc-900/50 p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <h1 className="font-serif text-4xl text-zinc-900 dark:text-zinc-50 mb-8">Syarat & Ketentuan — Portal Universitas Indonesia</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-serif">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2>1. Batasan Tanggung Jawab (Disclaimer)</h2>
          <p>
            SiPadu bukan produk resmi dari Universitas Indonesia (UI). Aplikasi ini dikembangkan secara independen oleh mahasiswa untuk mempermudah akses informasi. Kami tidak berafiliasi, disponsori, atau disetujui secara resmi oleh Universitas Indonesia.
          </p>
          
          <h2>2. Akurasi Data</h2>
          <p>
            Meskipun kami berusaha keras menyajikan data yang seakurat dan seaktual mungkin (sinkronisasi sistem berkala), kami tidak dapat menjamin keakuratan 100% akibat jeda waktu (delay) propagasi atau perubahan struktur pada situs resmi UI. Selalu jadikan sistem informasi resmi sebagai rujukan utama Anda.
          </p>

          <h2>3. Ketersediaan Layanan</h2>
          <p>
            Layanan portal UI dapat terhenti sementara waktu akibat pemeliharaan server, pembaruan aplikasi, atau kebijakan akses dari jaringan utama Universitas Indonesia. Kami tidak bertanggung jawab atas kerugian yang timbul akibat tidak beroperasinya layanan portal ini.
          </p>
        </div>
      </div>
    </div>
  );
}
