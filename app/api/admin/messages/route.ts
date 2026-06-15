import { NextRequest, NextResponse } from 'next/server';
import {
  deleteContactMessage,
  getContactMessages,
  markContactMessageRead,
} from '@/lib/contactMessageStore';
import { adminAuthFailure, adminAuthResponse } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  const messages = await getContactMessages();
  return NextResponse.json({ messages });
}

export async function PATCH(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  let body: { id?: string; action?: string } = {};
  try {
    body = (await request.json()) as { id?: string; action?: string };
  } catch {
    return NextResponse.json({ message: 'Gecersiz istek' }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ message: 'Mesaj id gerekli' }, { status: 400 });
  }

  if (body.action === 'read') {
    const updated = await markContactMessageRead(body.id);
    if (!updated) {
      return NextResponse.json({ message: 'Mesaj bulunamadi' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ message: 'Gecersiz islem' }, { status: 400 });
}

export async function DELETE(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ message: 'Mesaj id gerekli' }, { status: 400 });
  }

  const deleted = await deleteContactMessage(id);
  if (!deleted) {
    return NextResponse.json({ message: 'Mesaj bulunamadi' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
