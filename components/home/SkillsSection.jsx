'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function SkillsSection() {
  const skillCategories = {
    frontend: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Javscript', level: 85 },
    ],
    backend: [
      { name: 'Node.js', level: 85 },
      { name: 'Next.js Api', level: 85 },
      { name: 'PHP/Laravel', level: 82 },
      { name: 'Express.js', level: 80 },
    ],
    databases: [
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
    ],
    tools: [
      { name: 'Git', level: 90 },
      { name: 'Vercel', level: 82 },
      { name: 'Docker', level: 45 },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const SkillBadge = ({ skill }) => (
    <motion.div variants={itemVariants}>
      <span
        className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 shadow-md hover:shadow-lg hover:bg-primary/20 hover:text-primary transition-all duration-300"
      >
        {skill.name}
        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
          {skill.level}
        </span>
      </span>
    </motion.div>
  );

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Technical Expertise
          </h2>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Comprehensive skill set across modern web development technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <Card
              key={category}
              className="bg-background/95 border-none shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold capitalize mb-5 text-foreground text-center">
                  {category}
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  {skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}