// app/admin/blogs/page.jsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BlogList from '@/components/admin/blogs/BlogList'; // Adjust path as needed

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function AdminBlogsPage() {
  return (
    <section className="min-h-screen px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="mb-12">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-tight">Manage Blogs</h1>
            <Button asChild>
              <Link href="/admin/blogs/create">Create New Blog</Link>
            </Button>
          </div>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full my-4" />
        </motion.div>
        <BlogList />
      </div>
    </section>
  );
}