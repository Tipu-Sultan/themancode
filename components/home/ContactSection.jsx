'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MessageSquare, Video } from 'lucide-react';

export default function ContactSection() {
  const phoneNumber = '9919408817';
  const email = 'themancode7@gmail.com';

  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-gradient-to-br from-background via-muted/10 to-background rounded-xl p-8 md:p-12 text-center shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Collaborate?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto" />
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              Let's turn your ideas into reality. Reach out to discuss your next project!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Me{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 py-3 hover:bg-muted/50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <a
                  href={`https://wa.me/${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 py-3 hover:bg-muted/50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call Me
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 py-3 hover:bg-muted/50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <a href={`mailto:${email}`} className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Me
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 py-3 hover:bg-muted/50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <a
                  href={`https://meet.google.com/new?email=${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Video className="w-4 h-4" /> Schedule a Meet
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}