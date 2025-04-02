// components/AcademicSections.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

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

export default function AcademicSections() {
  const [activeIndex, setActiveIndex] = useState(null); // For hover/focus effects if needed

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Academic Journey
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto my-4" />
          <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
            My educational milestones in computer applications
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative space-y-12 md:space-y-0 md:flex md:gap-8 md:flex-col lg:flex-row lg:gap-12">
          {/* Vertical Timeline Line (Hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/50 via-muted to-primary/50" />

          {academicsData.map((academic, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-center justify-center w-full md:w-1/2 lg:w-full"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 md:left-[-1rem] lg:left-[-2rem] z-10">
                <span
                  className={`block w-4 h-4 rounded-full bg-primary transition-all duration-300 ${
                    activeIndex === index ? 'scale-125 shadow-lg' : ''
                  }`}
                />
              </div>

              {/* Academic Card */}
              <Card
                className={`w-full max-w-md p-6 shadow-md hover:shadow-xl transition-all duration-300 ${
                  index % 2 === 0 ? 'md:ml-auto lg:mr-0' : 'md:mr-auto lg:ml-0'
                } ${activeIndex === index ? 'border-primary' : 'border-border'}`}
              >
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    {academic.degree}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{academic.university}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{academic.duration}</span>
                  </div>
                  <Badge variant="outline" className="text-sm font-medium">
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