import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projectStore';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}
