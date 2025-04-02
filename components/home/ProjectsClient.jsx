'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function ProjectsClient({ projects }) {
  const router = useRouter();
  const displayedProjects = projects?.slice(0, 3); // Limit to 6 projects

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
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

        {/* Projects Grid */}
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects?.map((project, index) => (
              <motion.div
                key={project._id}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 3} // Prioritize first 3 images
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <span className="absolute top-2 right-2 bg-primary/40 text-xs px-2 py-1 rounded-full">
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
                        <p className="text-sm text-foreground">{project.description}</p>
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

        {/* No Projects Message or Explore More Button */}
        {displayedProjects?.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-8"
          >
            <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground">
              No projects found yet. Stay tuned!
            </p>
          </motion.div>
        ) : projects.length > 6 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-8"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/projects')}
              className="rounded-full px-6 py-2 text-sm md:text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Explore More Projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}