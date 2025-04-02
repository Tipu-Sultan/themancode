// components/AcademicSections.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

const academicsData = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    university: 'Integral University, Lucknow',
    duration: '2018 - 2021',
    cgpa: '7.4',
  },
  {
    degree: 'Master of Computer Applications (MCA)',
    university: 'Integral University, Lucknow',
    duration: '2021 - 2023',
    cgpa: '8.3',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.3 },
  },
};

export default function AcademicSections() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-16 md:py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
            Academic Journey
          </h1>
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto my-4" />
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Milestones that shaped my expertise in computer applications
          </p>
        </motion.div>

        {/* Academic Cards */}
        <div className="relative space-y-12 md:space-y-16">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 z-0" />

          {academicsData.map((academic, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              } w-full`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 z-10">
                <span
                  className={`block w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 ${
                    hoveredIndex === index ? 'scale-150 shadow-lg' : ''
                  }`}
                />
              </div>

              {/* Academic Card */}
              <Card
                className={`relative w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 z-10 ${
                  index % 2 === 0 ? 'sm:ml-8 md:ml-12' : 'sm:mr-8 md:mr-12'
                } ${hoveredIndex === index ? 'border-indigo-400' : ''}`}
              >
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                    {academic.degree}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                    <span>{academic.university}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                    <span>{academic.duration}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-sm font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700"
                  >
                    CGPA: {academic.cgpa}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}