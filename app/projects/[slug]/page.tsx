import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projectStore';
import ProjectDetailView from './ProjectDetailView';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
