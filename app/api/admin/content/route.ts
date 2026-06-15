import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent, SiteContent } from '@/lib/siteContent';
import { adminAuthFailure, adminAuthResponse } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  const payload = (await request.json()) as SiteContent;
  await saveSiteContent(payload);

  return NextResponse.json({ ok: true });
}
