// app/snippets/page.jsx
import { Suspense } from 'react';
import Link from 'next/link';
import { getAllSnippets } from '@/lib/server/client/api';
import SnippetSkeleton from './SnippetSkeleton';
import SnippetsList from './SnippetsList'; // New client component

export default async function SnippetsPage() {
  const snippetsData = await getAllSnippets();
  const categories = Object.keys(snippetsData);

  return (
    <section className="min-h-screen py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Code Snippets Library
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
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