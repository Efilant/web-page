import { NextRequest, NextResponse } from 'next/server';
import { getProjects, ProjectItem, saveProjects } from '@/lib/projectStore';
import { adminAuthFailure, adminAuthResponse } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function PUT(request: NextRequest) {
  const failure = adminAuthFailure(request);
  if (failure) {
    return adminAuthResponse(failure);
  }

  const payload = (await request.json()) as { projects: ProjectItem[] };
  await saveProjects(payload.projects ?? []);

  return NextResponse.json({ ok: true });
}
