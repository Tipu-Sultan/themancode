// app/snippets/[category]/CategorySections.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function CategorySections({ sections, categoryData, category }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {sections.map((section, index) => (
        <motion.div
          key={section}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/snippets/${category}/${section.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="p-6 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <h2 className="text-xl font-semibold text-foreground">
                {section}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {categoryData[section].length} snippet{categoryData[section].length !== 1 ? 's' : ''}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}