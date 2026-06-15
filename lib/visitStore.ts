import { promises as fs } from 'fs';
import path from 'path';

export interface VisitEntry {
  id: string;
  timestamp: string;
  path: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  userAgent: string;
}

interface VisitDb {
  visits: VisitEntry[];
}

const visitFilePath = path.join(process.cwd(), 'data', 'visits.json');
const maxVisitRecords = 5000;

const emptyDb: VisitDb = {
  visits: [],
};

async function readDb(): Promise<VisitDb> {
  try {
    const raw = await fs.readFile(visitFilePath, 'utf8');
    return JSON.parse(raw) as VisitDb;
  } catch {
    return emptyDb;
  }
}

async function writeDb(db: VisitDb): Promise<void> {
  await fs.mkdir(path.dirname(visitFilePath), { recursive: true });
  await fs.writeFile(visitFilePath, JSON.stringify(db, null, 2), 'utf8');
}

export async function addVisit(entry: Omit<VisitEntry, 'id' | 'timestamp'>): Promise<void> {
  const db = await readDb();
  const visit: VisitEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...entry,
  };

  const visits = [visit, ...db.visits].slice(0, maxVisitRecords);
  await writeDb({ visits });
}

export async function getVisitStats() {
  const db = await readDb();
  const visits = db.visits;

  const uniqueIps = new Set(visits.map((visit) => visit.ip));
  const countryMap = new Map<string, number>();

  for (const visit of visits) {
    const key = visit.country || 'Bilinmiyor';
    countryMap.set(key, (countryMap.get(key) ?? 0) + 1);
  }

  const topCountries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    totalVisits: visits.length,
    uniqueVisitors: uniqueIps.size,
    topCountries,
    latestVisits: visits.slice(0, 20),
  };
}
