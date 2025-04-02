'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MessageSquare, Video } from 'lucide-react';

export default function ContactSection() {
  const phoneNumber = '9919408817';
  const email = 'themancode7@gmail.com';

  // Animation variants for buttons
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 rounded-2xl p-8 md:p-12 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-200 dark:border-indigo-800"
        >
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Ready to Collaborate?
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto" />
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Let's bring your vision to life! Reach out to kickstart your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Contact Me
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-3 border-indigo-400 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <a
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-500" /> WhatsApp
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-3 border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-500" /> Call Me
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-3 border-pink-400 text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <a href={`mailto:${email}`} className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-pink-500" /> Email Me
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-3 border-teal-400 text-teal-600 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <a
                    href={`https://meet.google.com/new?email=${email}`}
                    target="_blank"
                    rel="noopener bothreferrer"
                    className="flex items-center gap-2"
                  >
                    <Video className="w-4 h-4 text-teal-500" /> Schedule a Meet
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}