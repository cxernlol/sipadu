import fs from 'fs';
import path from 'path';

export interface Announcement {
  id: string;
  date: { day: string; month: string; year: string };
  title: string;
  description: string;
  source: string;
  tags: string[];
  link?: string;
}

export interface Schedule {
  code: string;
  name: string;
  level: string;
  day: string;
  session: string;
  status: "Aktif" | "Libur";
}

export interface Materi {
  id: string;
  name: string;
  level: string;
  topics: string[];
}

export interface KalenderEvent {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  locations: string;
}

// Month abbreviation to number for sorting
const MONTH_MAP: Record<string, number> = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
  // Indonesian month abbreviations
  MEI: 4, AGU: 7, OKT: 9, DES: 11,
};

function announcementToDate(a: Announcement): Date {
  const month = MONTH_MAP[a.date.month.toUpperCase()] ?? 0;
  const day = parseInt(a.date.day, 10) || 1;
  const year = parseInt(a.date.year, 10) || 2026;
  return new Date(year, month, day);
}

// Helper to safely read db.json
async function getDb() {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    if (!fs.existsSync(dbPath)) return null;
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return null;
  }
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const db = await getDb();
  if (db && db.announcements) {
    // Sort by date descending (newest first)
    return [...db.announcements].sort((a: Announcement, b: Announcement) => {
      return announcementToDate(b).getTime() - announcementToDate(a).getTime();
    });
  }
  return [];
}

export async function getJadwal(): Promise<Schedule[]> {
  const db = await getDb();
  if (db && db.jadwal) {
    return db.jadwal;
  }
  return [];
}

export async function getMateri(): Promise<Materi[]> {
  const db = await getDb();
  if (db && db.materi) {
    return db.materi;
  }
  return [];
}

export async function getKalender(): Promise<KalenderEvent[]> {
  const db = await getDb();
  if (db && db.kalender) {
    return db.kalender;
  }
  return [];
}

/** Get real stats from the database for the landing page */
export async function getStats(): Promise<{
  totalAnnouncements: number;
  totalJadwal: number;
  totalMateri: number;
  totalKalender: number;
  lastUpdated: string | null;
  sources: number;
}> {
  const db = await getDb();
  if (!db) {
    return { totalAnnouncements: 0, totalJadwal: 0, totalMateri: 0, totalKalender: 0, lastUpdated: null, sources: 0 };
  }

  // Count unique sources
  const sources = new Set<string>();
  if (db.announcements) {
    db.announcements.forEach((a: Announcement) => sources.add(a.source));
  }

  return {
    totalAnnouncements: db.announcements?.length ?? 0,
    totalJadwal: db.jadwal?.length ?? 0,
    totalMateri: db.materi?.length ?? 0,
    totalKalender: db.kalender?.length ?? 0,
    lastUpdated: db.lastUpdated ?? null,
    sources: sources.size,
  };
}
