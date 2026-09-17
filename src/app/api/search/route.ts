import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

export interface SearchResult {
  no: string;
  npm: string;
  nama: string;
  kelas: string;
  jadwal: string;
  kodeJadwal: string;
  kategori: string;
  lokasi: string;
  hari: string;
  ruang: string;
  sesi: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('q');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  let isFallback = false;
  let results: SearchResult[] = [];

  try {
    const formData = new URLSearchParams();
    formData.append('keyword', keyword);
    formData.append('submit', '');

    // Attempt live fetch from VM LePKom with a strict timeout of 5 seconds to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://vm.lepkom.gunadarma.ac.id/jadwalPraktikan/search', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch from LePKom: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

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

    // If we parse the HTML successfully and it doesn't throw, we assume success.
    // However, if results is empty, it could mean WAF blocked us and returned an unexpected HTML page.
    // To be safe, if we suspect a WAF block (e.g. title is "Just a moment..." or similar Cloudflare page), we should throw.
    const pageTitle = $('title').text().toLowerCase();
    if (pageTitle.includes('just a moment') || pageTitle.includes('captcha') || pageTitle.includes('attention required')) {
        throw new Error("WAF Block / Captcha encountered");
    }

  } catch (error) {
    console.error('Search API Error, triggering fallback:', error);
    
    // --- FALLBACK LOGIC ---
    try {
      const dbPath = path.join(process.cwd(), 'src/data/db.json');
      const fileContents = await fs.readFile(dbPath, 'utf8');
      const data = JSON.parse(fileContents);
      
      if (data && data.jadwal) {
        const query = keyword.toLowerCase();
        results = data.jadwal.filter((item: SearchResult) => 
          item.npm.toLowerCase().includes(query) ||
          item.nama.toLowerCase().includes(query) ||
          item.kelas.toLowerCase().includes(query)
        );
        isFallback = true;
      }
    } catch (fallbackError) {
      console.error('Fallback read error:', fallbackError);
      return NextResponse.json({ error: 'Failed to search jadwal and fallback also failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ results, isFallback });
}
