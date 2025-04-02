// app/admin/blogs/[id]/edit/page.jsx
'use client';

import { useParams } from 'next/navigation';
import BlogForm from '@/components/admin/blogs/BlogForm';

export default function EditBlogPage() {
  const { slug } = useParams();
  return <BlogForm blogId={slug} isEdit={true} />;
}