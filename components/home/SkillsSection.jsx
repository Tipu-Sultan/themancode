'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function SkillsSection() {
  const skillCategories = {
    frontend: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'JavaScript', level: 85 }, // Fixed typo: "Javscript" → "JavaScript"
      { name: 'Tailwind CSS', level: 85 },
      // Removed duplicate "JavaScript" entry
    ],
    backend: [
      { name: 'Node.js', level: 85 },
      { name: 'Next.js API', level: 85 }, // Added space for readability
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
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const SkillBadge = ({ skill }) => (
    <motion.div variants={itemVariants}>
      <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2 shadow-md hover:shadow-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all duration-300">
        {skill.name}
        <span className="bg-indigo-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
          {skill.level}%
        </span>
      </span>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Technical Expertise
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive skill set across modern web development technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <Card
              key={category}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl font-semibold capitalize text-indigo-600 dark:text-indigo-300">
                    {category}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {skills.length} Skills
                  </span>
                </div>
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