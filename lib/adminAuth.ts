import { NextRequest, NextResponse } from 'next/server';
import { isAdminEnabled } from '@/lib/adminAccess';

export function adminAuthFailure(request: NextRequest): 'disabled' | 'unauthorized' | null {
  if (!isAdminEnabled()) {
    return 'disabled';
  }

  const requestPassword = request.headers.get('x-admin-password');
  const adminPassword = process.env.ADMIN_PANEL_PASSWORD || 'admin123';

  if (requestPassword !== adminPassword) {
    return 'unauthorized';
  }

  return null;
}

export function adminAuthResponse(failure: 'disabled' | 'unauthorized') {
  if (failure === 'disabled') {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 401 });
}
