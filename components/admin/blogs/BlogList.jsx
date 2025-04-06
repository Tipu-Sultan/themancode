'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Loader2 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function BlogList() {
  const [blogs, setBlogs] = useState([]); // Changed to `blogs`
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // Renamed for clarity
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => { // Changed to `fetchBlogs`
      try {
        const res = await fetch('/api/admin/blog'); // Corrected endpoint to `/blogs`
        const data = await res.json();
        if (res.ok) {
          setBlogs(data);
        } else {
          toast({ title: 'Error', description: data.message || 'Failed to fetch blogs', variant: 'destructive' });
        }
      } catch (error) {
        toast({ title: 'Error', description: 'An error occurred while fetching blogs', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [toast]);

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setDeletingId(blogId);
    try {
      const res = await fetch(`/api/admin/blog/${blogId}`, { // Corrected endpoint to `/blogs`
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setBlogs(blogs.filter(blog => blog._id !== blogId)); // Corrected to `blogs`
        toast({ title: 'Success', description: 'Blog deleted successfully!' });
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to delete blog', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred while deleting the blog', variant: 'destructive' });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.length === 0 ? (
        <motion.p variants={fadeInUp} initial="initial" animate="animate" className="text-muted-foreground">
          No blogs found. Start by creating one!
        </motion.p>
      ) : (
        blogs.map((blog, index) => ( // Changed to `blogs`
          <motion.div
            key={blog._id}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                    <p className="text-muted-foreground">{blog.excerpt.slice(0, 47) + "..."}</p> {/* Changed `description` to `excerpt` */}
                    <p className="text-sm text-muted-foreground">Category: {blog.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/blogs/${blog._id}`}> {/* Corrected edit path */}
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(blog._id)}
                      disabled={deletingId === blog._id}
                    >
                      {deletingId === blog._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}