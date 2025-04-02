'use client';

import SnippetForm from '@/components/admin/snippets/SnippetForm';
import { useParams } from 'next/navigation';

export default function EditSnippetPage() {
  const { slug } = useParams(); // Note: Using _id as slug here
  return <SnippetForm snippetId={slug} isEdit={true} />;
}