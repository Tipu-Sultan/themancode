// app/snippets/[category]/[slug]/SectionHeader.jsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function SectionHeader({ category, decodedCategory, decodedSection, snippetsLength }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="mb-12"
    >
      <Button variant="ghost" className="mb-6 hover:bg-muted" asChild>
        <Link href={`/snippets/${category}`}>← Back to {decodedCategory}</Link>
      </Button>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {decodedSection}
      </h1>
      <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full my-4" />
      <p className="text-muted-foreground">
        {snippetsLength} snippet{snippetsLength !== 1 ? 's' : ''} in {decodedCategory} - {decodedSection}
      </p>
    </motion.div>
  );
}