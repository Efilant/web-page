import { NextRequest, NextResponse } from 'next/server';
import { addVisit } from '@/lib/visitStore';

interface TrackRequestBody {
  path?: string;
}

function firstForwardedIp(rawForwardedIp: string | null): string {
  if (!rawForwardedIp) {
    return 'unknown';
  }

  return rawForwardedIp.split(',')[0]?.trim() || 'unknown';
}

export async function POST(request: NextRequest) {
  let body: TrackRequestBody = {};

  try {
    body = (await request.json()) as TrackRequestBody;
  } catch {
    body = {};
  }

  const path = body.path || '/';

  await addVisit({
    path,
    ip: firstForwardedIp(request.headers.get('x-forwarded-for')),
    country: request.headers.get('x-vercel-ip-country') || 'Bilinmiyor',
    city: request.headers.get('x-vercel-ip-city') || 'Bilinmiyor',
    region: request.headers.get('x-vercel-ip-country-region') || 'Bilinmiyor',
    userAgent: request.headers.get('user-agent') || 'unknown',
  });

  return NextResponse.json({ ok: true });
}
