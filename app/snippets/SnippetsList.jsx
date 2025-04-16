'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function SnippetsList({ categories, snippetsData }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Back Button */}
      {pathname !== '/' && (
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
        </motion.div>
      )}

      {/* Snippets Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/snippets/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="p-6 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-xl font-semibold text-foreground">
                  {category}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {Object.keys(snippetsData[category]).length} section{Object.keys(snippetsData[category]).length !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* No Snippets Message */}
      {categories.length === 0 && (
        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center text-sm sm:text-base text-muted-foreground dark:text-muted-foreground mt-12"
        >
          No snippets found. Check back later!
        </motion.p>
      )}
    </>
  );
}