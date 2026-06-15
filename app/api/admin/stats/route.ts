import { NextRequest, NextResponse } from 'next/server';
import { getVisitStats } from '@/lib/visitStore';
import { adminAuthFailure, adminAuthResponse } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  const stats = await getVisitStats();
  return NextResponse.json(stats);
}
