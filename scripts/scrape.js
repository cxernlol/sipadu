const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/data/db.json');

const INDO_MONTHS = {
  'januari': 0, 'februari': 1, 'maret': 2, 'april': 3, 'mei': 4, 'juni': 5,
  'juli': 6, 'agustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
};

function parseIndoDate(dateStr) {
  try {
    const parts = dateStr.split(',');
    if (parts.length < 2) return null;
    const dateParts = parts[1].trim().split(' ');
    if (dateParts.length < 3) return null;
    
    const day = parseInt(dateParts[0], 10);
    const month = INDO_MONTHS[dateParts[1].toLowerCase()];
    const year = parseInt(dateParts[2], 10);
    
    if (isNaN(day) || month === undefined || isNaN(year)) return null;
    
    return new Date(year, month, day);
  } catch {
    return null;
  }
}

function isOlderThanThreeMonths(date) {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return date < threeMonthsAgo;
}

async function scrapeBaak(browser) {
  const page = await browser.newPage();
  console.log("Scraping BAAK...");
  const announcements = [];
  try {
    // Cloudflare might challenge us here, puppeteer can often pass it if we wait
    await page.goto('https://baak.gunadarma.ac.id/', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Evaluate in page context
    const data = await page.evaluate(() => {
      const items = [];
      const rows = document.querySelectorAll('.trow');
      rows.forEach((row, i) => {
        const titleEl = row.querySelector('.title a');
        if (!titleEl) return;
        const title = titleEl.innerText.trim();
        const link = titleEl.href;
        
        // Find date. Often in a span or format like "Kamis, 17 September 2026"
        let dateStr = "";
        const span = row.querySelector('span'); // Adjust based on BAAK HTML
        if (span) dateStr = span.innerText;
        else dateStr = "Kamis, 17 September 2026"; // Fallback placeholder if structure unknown
        
        const description = row.innerText.substring(0, 150) + "..."; // crude description
        items.push({
          rawTitle: title,
          link,
          dateStr,
          description
        });
      });
      return items;
    });

    data.forEach((item, i) => {
      // Very basic date mock if real parse fails on BAAK's format
      const parsedDate = parseIndoDate(item.dateStr) || new Date(); 
      if (!isOlderThanThreeMonths(parsedDate)) {
        announcements.push({
          id: `baak-${i}`,
          date: { 
            day: parsedDate.getDate().toString().padStart(2, '0'), 
            month: parsedDate.toLocaleString('id-ID', { month: 'short' }).toUpperCase(), 
            year: parsedDate.getFullYear().toString() 
          },
          title: `[BAAK] ${item.rawTitle}`,
          description: item.description,
          source: 'BAAK',
          tags: ["BAAK"],
          link: item.link
        });
      }
    });
  } catch (error) {
    console.error("Failed to scrape BAAK:", error.message);
  } finally {
    await page.close();
  }
  return announcements;
}

async function scrapeLepkom(browser) {
  const page = await browser.newPage();
  console.log("Scraping VM LePKom...");
  const announcements = [];
  const materi = [];
  
  try {
    await page.goto('https://vm.lepkom.gunadarma.ac.id/', { waitUntil: 'networkidle2' });

    // Scrape Announcements
    const newsData = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('.recent-news').forEach(el => {
        const titleEl = el.querySelector('h6 a');
        if (!titleEl) return;
        const rawTitle = titleEl.innerText.trim().replace(/^\d+\s*/, '');
        const link = titleEl.href;
        const description = el.querySelector('.text-justify')?.innerText.trim().substring(0, 150) + '...';
        
        const mediaPost = el.querySelectorAll('.media-post li');
        const dateStr = mediaPost.length > 0 ? mediaPost[0].innerText.trim() : "";
        const tagStr = mediaPost.length > 1 ? mediaPost[1].innerText.trim() : "";
        
        items.push({ rawTitle, link, description, dateStr, tagStr });
      });
      return items;
    });

    newsData.forEach((item, i) => {
      const parsedDate = parseIndoDate(item.dateStr);
      if (parsedDate && !isOlderThanThreeMonths(parsedDate)) {
        announcements.push({
          id: `lepkom-${i}`,
          date: { 
            day: parsedDate.getDate().toString().padStart(2, '0'), 
            month: parsedDate.toLocaleString('id-ID', { month: 'short' }).toUpperCase(), 
            year: parsedDate.getFullYear().toString() 
          },
          title: item.rawTitle,
          description: item.description,
          source: 'VM LePKom',
          tags: ["VM LePKom"], // Force tag as VM LePKom for UI filtering
          link: item.link
        });
      }
    });

    // Scrape Materi Kursus
    const materiData = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('.cours-bx').forEach((el, i) => {
        const titleEl = el.querySelector('h5 a');
        if (!titleEl) return;
        const name = titleEl.innerText.trim();
        const level = el.querySelector('.info-bx span')?.innerText.trim() || "";
        
        const topics = [];
        el.querySelectorAll('.cours-more-info ol li').forEach(li => {
          topics.push(li.innerText.trim());
        });

        items.push({
          id: String(i + 1),
          name,
          level,
          topics
        });
      });
      return items;
    });
    
    materi.push(...materiData);

    // Scrape Kalender
    const kalenderData = await page.evaluate(() => {
      const items = [];
      const rows = document.querySelectorAll('table.tablesorter tbody tr');
      rows.forEach((row, i) => {
        const cols = row.querySelectorAll('td');
        if (cols.length >= 2) {
          const kegiatan = cols[0].innerText.trim();
          const tanggal = cols[1].innerText.trim();
          if (kegiatan && tanggal) {
             items.push({
               id: String(i + 1),
               name: kegiatan,
               subtitle: "Kalender Akademik",
               date: tanggal,
               locations: "All"
             });
          }
        }
      });
      return items;
    });

  } catch (error) {
    console.error("Failed to scrape VM LePKom:", error.message);
  } finally {
    await page.close();
  }
  return { announcements, materi, kalender: typeof kalenderData !== 'undefined' ? kalenderData : [] };
}

async function main() {
  console.log("Launching headless browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const baakAnnouncements = await scrapeBaak(browser);
  const lepkomData = await scrapeLepkom(browser);

  await browser.close();

  let allAnnouncements = [...baakAnnouncements, ...lepkomData.announcements];
  
  // Sort announcements by date (newest first)
  const monthMap = {
    'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MEI': 4, 'JUN': 5,
    'JUL': 6, 'AGU': 7, 'SEP': 8, 'OKT': 9, 'NOV': 10, 'DES': 11
  };
  
  allAnnouncements.sort((a, b) => {
    const dateA = new Date(parseInt(a.date.year), monthMap[a.date.month] || 0, parseInt(a.date.day));
    const dateB = new Date(parseInt(b.date.year), monthMap[b.date.month] || 0, parseInt(b.date.day));
    return dateB.getTime() - dateA.getTime();
  });

  const db = {
    announcements: allAnnouncements,
    materi: lepkomData.materi,
    jadwal: [], // Left empty because a specific NPM search is required on the live site
    kalender: lepkomData.kalender || [],
    lastUpdated: new Date().toISOString()
  };

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log(`Scraping complete! Saved ${allAnnouncements.length} announcements and ${db.materi.length} materi courses to db.json.`);
}

main();
