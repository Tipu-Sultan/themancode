import { Suspense } from 'react';
import BlogList from './BlogList';
import { getAllBlogs } from '@/lib/server/client/blogApi';
import BlogSkeleton from './BlogSkeleton';

export default async function BlogPage() {
  const blogsData = await getAllBlogs();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Blog Hub
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
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