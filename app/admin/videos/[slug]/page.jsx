'use client';

import VideoForm from '@/components/admin/videos/VideoForm';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
  const { slug } = useParams();
  return <VideoForm videoId={slug} isEdit={true} />;
}