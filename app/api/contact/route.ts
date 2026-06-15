import { NextRequest, NextResponse } from 'next/server';
import { addContactMessage } from '@/lib/contactMessageStore';

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

function normalizeField(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  let body: ContactRequestBody = {};

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ message: 'Gecersiz istek' }, { status: 400 });
  }

  const name = normalizeField(body.name, 120);
  const email = normalizeField(body.email, 200);
  const message = normalizeField(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Tum alanlar zorunludur' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Gecerli bir e-posta girin' }, { status: 400 });
  }

  await addContactMessage({ name, email, message });

  return NextResponse.json({ ok: true });
}
