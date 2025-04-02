'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function SnippetsList({ categories, snippetsData }) {
  return (
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
            <div className="p-6 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
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
  );
}