// app/snippets/[category]/page.jsx
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSnippetsByCategory } from '@/lib/server/client/api';
import CategorySections from './CategorySections'; // New client component
import SnippetSkeleton from '../SnippetSkeleton';

export default async function CategoryPage({ params }) {
  const { category } = params;
  const decodedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const categoryData = await getSnippetsByCategory(category);

  if (!categoryData) {
    return (
      <section className="min-h-screen py-16 bg-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Category Not Found</h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-muted-foreground mt-4">This category doesn’t exist.</p>
          <Button variant="ghost" className="mt-6" asChild>
            <Link href="/snippets">Back to Snippets</Link>
          </Button>
        </div>
      </section>
    );
  }

  const sections = Object.keys(categoryData);

  return (
    <section className="min-h-screen py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Button variant="ghost" className="mb-6 hover:bg-muted" asChild>
            <Link href="/snippets">← Back to Snippets</Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {decodedCategory}
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full my-4" />
          <p className="text-muted-foreground">
            Browse sections in {decodedCategory}
          </p>
        </div>

        <Suspense fallback={<SnippetSkeleton />}>
          <CategorySections sections={sections} categoryData={categoryData} category={category} />
        </Suspense>
      </div>
    </section>
  );
}