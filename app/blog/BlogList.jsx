// app/blog/BlogList.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function BlogList({ blogsData }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', count: blogsData.length },
    ...Array.from(new Set(blogsData.map(b => b.category))).map(cat => ({
      name: cat,
      count: blogsData.filter(b => b.category === cat).length
    }))
  ];

  const filteredBlogs = selectedCategory === 'All'
    ? blogsData
    : blogsData.filter(blog => blog.category === selectedCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? 'default' : 'ghost'}
            className="rounded-full transition-all duration-200"
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name} <span className="ml-1 opacity-75">({category.count})</span>
          </Button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog, index) => (
          <motion.div key={blog._id} variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <Card className="group h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
                  </span>
                </div>
                <Link href={`/blog/${blog.category.toLowerCase().replace(/\s+/g, '-')}/${blog.slug}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground text-sm flex-1">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {!filteredBlogs.length && (
        <motion.p variants={fadeInUp} initial="initial" animate="animate" className="text-center text-muted-foreground mt-12">
          No posts found. Check back later!
        </motion.p>
      )}
    </>
  );
}