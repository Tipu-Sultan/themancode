// app/blog/[category]/[slug]/BlogPostContent.jsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function BlogPostContent({ blog }) {
  const router = useRouter();

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate">
      <Button variant="ghost" className="mb-6 hover:bg-muted" onClick={() => router.back()}>
        ← Back to Blog
      </Button>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        {blog.title}
      </h1>
      <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-6" />
      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {blog.readTime}
        </span>
        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          {blog.category}
        </span>
      </div>
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
        <Image src={blog.image} alt={blog.title} fill className="object-cover" />
      </div>
      <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <div className="flex flex-wrap gap-2 mt-6">
        {blog.tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
            <Tag className="w-4 h-4" />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}