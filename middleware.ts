import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAdminEnabled } from '@/lib/adminAccess';

export function middleware(request: NextRequest) {
  if (!isAdminEnabled()) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
