'use client';

import ProjectForm from '@/components/admin/projects/ProjectForm';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
  const { slug } = useParams();
  return <ProjectForm projectId={slug} isEdit={true} />;
}