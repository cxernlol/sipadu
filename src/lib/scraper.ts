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
    return db.announcements;
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
