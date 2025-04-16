import { Suspense } from 'react';
import { getAllSnippets } from '@/lib/server/client/api';
import SnippetSkeleton from './SnippetSkeleton';
import SnippetsList from './SnippetsList';

export default async function SnippetsPage() {
  const snippetsData = await getAllSnippets();
  const categories = Object.keys(snippetsData);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Code Snippets Library
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
            Explore reusable code examples by category
          </p>
        </div>
        <Suspense fallback={<SnippetSkeleton />}>
          <SnippetsList categories={categories} snippetsData={snippetsData} />
        </Suspense>
      </div>
    </section>
  );
}