// app/snippets/[category]/[slug]/page.jsx
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSnippetsBySection } from '@/lib/server/client/api';
import { SnippetDetailSkeleton } from '../../SnippetSkeleton';
import SnippetList from './SnippetList';
import SectionHeader from './SectionHeader'; // New client component

export default async function SectionPage({ params }) {
  const { category, slug } = params;
  const decodedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const decodedSection = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const snippets = await getSnippetsBySection(category, decodedSection);

  if (!snippets.length) {
    return (
      <section className="min-h-screen py-16 bg-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Section Not Found</h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-muted-foreground mt-4">{decodedSection} section doesn’t exist.</p>
          <Button variant="ghost" className="mt-6" asChild>
            <Link href={`/snippets/${category}`}>Back to {decodedCategory}</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          category={category}
          decodedCategory={decodedCategory}
          decodedSection={decodedSection}
          snippetsLength={snippets.length}
        />

        <Suspense fallback={<SnippetDetailSkeleton />}>
          <SnippetList snippets={snippets} />
        </Suspense>
      </div>
    </section>
  );
}