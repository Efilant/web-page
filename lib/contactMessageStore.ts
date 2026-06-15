import { promises as fs } from 'fs';
import path from 'path';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface ContactMessageDb {
  messages: ContactMessage[];
}

const messagesFilePath = path.join(process.cwd(), 'data', 'contact-messages.json');
const maxMessageRecords = 500;

const emptyDb: ContactMessageDb = {
  messages: [],
};

async function readDb(): Promise<ContactMessageDb> {
  try {
    const raw = await fs.readFile(messagesFilePath, 'utf8');
    return JSON.parse(raw) as ContactMessageDb;
  } catch {
    return emptyDb;
  }
}

async function writeDb(db: ContactMessageDb): Promise<void> {
  await fs.mkdir(path.dirname(messagesFilePath), { recursive: true });
  await fs.writeFile(messagesFilePath, JSON.stringify(db, null, 2), 'utf8');
}

export async function addContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const db = await readDb();
  const entry: ContactMessage = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    read: false,
    ...input,
  };

  const messages = [entry, ...db.messages].slice(0, maxMessageRecords);
  await writeDb({ messages });
  return entry;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const db = await readDb();
  return db.messages;
}

export async function markContactMessageRead(id: string): Promise<boolean> {
  const db = await readDb();
  const index = db.messages.findIndex((message) => message.id === id);
  if (index === -1) {
    return false;
  }

  db.messages[index] = { ...db.messages[index], read: true };
  await writeDb(db);
  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const db = await readDb();
  const nextMessages = db.messages.filter((message) => message.id !== id);
  if (nextMessages.length === db.messages.length) {
    return false;
  }

  await writeDb({ messages: nextMessages });
  return true;
}
