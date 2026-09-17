export const metadata = {
  title: "Syarat dan Ketentuan",
  description: "Syarat dan Ketentuan Layanan SiPadu",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="font-serif text-4xl text-slate-900 mb-8">Syarat dan Ketentuan Layanan</h1>
        
        <div className="prose prose-slate max-w-none prose-headings:font-serif">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h2>1. Penerimaan Syarat</h2>
          <p>
            Dengan mengakses dan menggunakan SiPadu (Sistem Informasi Terpadu), Anda menyetujui untuk terikat dengan Syarat dan Ketentuan Layanan ini serta Kebijakan Privasi kami.
          </p>
          
          <h2>2. Penggunaan Layanan</h2>
          <p>
            Informasi yang disediakan di platform ini bersifat informatif yang bersumber dari portal resmi Universitas. Anda setuju untuk menggunakan layanan ini sesuai dengan hukum dan peraturan yang berlaku.
          </p>

          <h2>3. Akurasi Data</h2>
          <p>
            Meskipun kami berusaha keras menyajikan data secara real-time dan akurat, keterlambatan pembaruan data (sync) dengan portal BAAK atau LePKom mungkin terjadi. SiPadu tidak bertanggung jawab atas kerugian akibat kesalahan atau keterlambatan informasi.
          </p>

          <h2>4. Ketersediaan Sistem</h2>
          <p>
            SiPadu mungkin mengalami maintenance (pemeliharaan) dari waktu ke waktu. Kami tidak menjamin sistem akan selalu 100% online tanpa gangguan.
          </p>
        </div>
      </div>
    </div>
  );
}
