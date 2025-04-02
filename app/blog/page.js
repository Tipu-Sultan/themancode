// app/blog/page.jsx
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BlogList from './BlogList'; // Client component for filtering
import { getAllBlogs } from '@/lib/server/client/blogApi';
import BlogSkeleton from './BlogSkeleton';

export default async function BlogPage() {
  const blogsData = await getAllBlogs();

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Blog Hub
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Explore insights and tutorials on modern development
          </p>
        </div>
        <Suspense fallback={<BlogSkeleton />}>
          <BlogList blogsData={blogsData} />
        </Suspense>
      </div>
    </section>
  );
}