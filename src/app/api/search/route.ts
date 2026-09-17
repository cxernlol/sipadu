import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('q');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  try {
    const formData = new URLSearchParams();
    formData.append('keyword', keyword);
    formData.append('submit', '');

    const response = await fetch('https://vm.lepkom.gunadarma.ac.id/jadwalPraktikan/search', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from LePKom: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];

    // Parse the table rows
    $('#tableNoFilter tbody tr').each((i, el) => {
      const cols = $(el).find('td');
      
      // If the row contains "Data Jadwal Belum Tersedia!." or similar, skip
      if (cols.length < 10) return;

      const no = $(cols[0]).text().trim();
      const npm = $(cols[1]).text().trim();
      const nama = $(cols[2]).text().trim();
      const kelas = $(cols[3]).text().trim();
      
      // Jadwal Kursus & Kode can have <br> separating them
      const jadwalRaw = $(cols[4]).html() || "";
      const jadwalParts = jadwalRaw.split('<br>').map(s => s.replace(/<[^>]*>?/gm, '').trim());
      const jadwal = jadwalParts[0] || "";
      const kodeJadwal = jadwalParts[1] || "";
      
      const kategori = $(cols[5]).text().trim();
      const lokasi = $(cols[6]).text().trim();
      const hari = $(cols[7]).text().trim();
      const ruang = $(cols[8]).text().trim();
      const sesi = $(cols[9]).text().trim();

      results.push({
        no,
        npm,
        nama,
        kelas,
        jadwal,
        kodeJadwal,
        kategori,
        lokasi,
        hari,
        ruang,
        sesi
      });
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Failed to search jadwal' }, { status: 500 });
  }
}
