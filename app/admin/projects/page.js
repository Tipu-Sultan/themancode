'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProjectList from '@/components/admin/projects/ProjectList';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function AdminProjectsPage() {
  return (
    <section className="min-h-screen px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="mb-12">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-tight">Manage Projects</h1>
            <Button asChild>
              <Link href="/admin/projects/create">Create New Project</Link>
            </Button>
          </div>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full my-4" />
        </motion.div>
        <ProjectList />
      </div>
    </section>
  );
}