'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const categories = [
  'All',
  'Full-Stack Development',
  'Web Development',
  'Frontend',
  'AI/ML',
  'Mobile',
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProjectsPage({ projects: initialProjects }) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch projects client-side
  const { data: projects, error } = useSWR('/api/projects', fetcher, {
    fallbackData: initialProjects,
    refreshInterval: 60000, // Poll every 60 seconds
  });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  const filteredProjects =
    selectedCategory === 'All'
      ? projects || initialProjects
      : (projects || initialProjects).filter(
          (project) =>
            project.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
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

        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            My Projects
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
            Discover my vibrant and innovative creations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`rounded-full px-3 py-1 text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'shadow-lg'
                  : 'hover:bg-muted/50 hover:shadow-md'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project._id}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-40 sm:h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <span className="absolute top-2 right-2 bg-primary/10 text-xs px-2 py-1 rounded-full text-white">
                      {project.category}
                    </span>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground mb-3 line-clamp-2 cursor-help">
                          {project.description}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-2 bg-background border shadow-lg rounded-md">
                        <p className="text-sm text-foreground">
                          {project.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-muted/50 text-xs rounded-full text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <Button
                          variant="outline"
                          asChild
                          className="w-full rounded-full text-sm py-1 hover:bg-muted/50 transition-all duration-300"
                        >
                          <Link
                            href={project.github}
                            className="flex items-center justify-center gap-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <Github className="w-4 h-4" /> GitHub
                          </Link>
                        </Button>
                      )}
                      {project.url && (
                        <Button
                          variant="outline"
                          asChild
                          className="w-full rounded-full text-sm py-1 hover:bg-muted/50 transition-all duration-300"
                        >
                          <Link
                            href={project.url}
                            className="flex items-center justify-center gap-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Explore ${project.title} project`}
                          >
                            <ExternalLink className="w-4 h-4" /> Explore
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>

        {/* No Projects Message */}
        {filteredProjects?.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-8"
          >
            <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground">
              No projects found in this category yet. Stay tuned!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}