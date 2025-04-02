// app/blog/[category]/page.jsx
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getBlogsByCategory } from '@/lib/server/client/blogApi';
import BlogCategoryList from './BlogCategoryList';
import BlogSkeleton from '../BlogSkeleton';

export default async function BlogCategoryPage({ params }) {
  const { category } = params;
  const decodedCategory = category.replace(/-/g, ' ');
  const blogsData = await getBlogsByCategory(decodedCategory);

  return (
    <section className="min-h-screen py-16 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-12">
          <Button variant="ghost" className="mb-6 hover:bg-muted" asChild>
            <Link href="/blog">← Back to All Posts</Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight capitalize">
            {decodedCategory}
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full my-4" />
          <p className="mt-2 text-muted-foreground">
            Showing {blogsData.length} post{blogsData.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
        <Suspense fallback={<BlogSkeleton />}>
          <BlogCategoryList blogsData={blogsData} category={category} />
        </Suspense>
      </div>
    </section>
  );
}