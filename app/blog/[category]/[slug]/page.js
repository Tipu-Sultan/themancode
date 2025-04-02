// app/blog/[category]/[slug]/page.jsx
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getBlogBySlug } from '@/lib/server/client/blogApi';
import BlogPostContent from './BlogPostContent';
import BlogSkeleton from '../../BlogSkeleton';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <section className="min-h-screen py-16 px-4 bg-background">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Post Not Found</h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-muted-foreground mt-4">This blog post doesn't exist.</p>
          <Button variant="outline" className="mt-6" asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 px-4 bg-background">
      <div className="container max-w-4xl mx-auto">
        <Suspense fallback={<BlogSkeleton />}>
          <BlogPostContent blog={blog} />
        </Suspense>
      </div>
    </section>
  );
}