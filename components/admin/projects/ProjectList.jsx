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

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/admin/project');
        const data = await res.json();
        if (res.ok) {
          setProjects(data);
        } else {
          toast({ title: 'Error', description: data.message || 'Failed to fetch projects', variant: 'destructive' });
        }
      } catch (error) {
        toast({ title: 'Error', description: 'An error occurred while fetching projects', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [toast]);

  const handleDelete = async (projectId) => {
    setDeletingId(projectId);
    try {
      const res = await fetch(`/api/admin/project/${projectId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setProjects((prev) => prev.filter((project) => project._id !== projectId));
        toast({ title: 'Success', description: 'Project deleted successfully!' });
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to delete project', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred while deleting the project', variant: 'destructive' });
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
      {projects.length === 0 ? (
        <motion.p variants={fadeInUp} initial="initial" animate="animate" className="text-muted-foreground">
          No projects found. Start by creating one!
        </motion.p>
      ) : (
        projects.map((project, index) => (
          <motion.div
            key={project._id}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <p className="text-muted-foreground">{project.description.slice(0, 47) + "..."}</p>
                    <p className="text-sm text-muted-foreground">Category: {project.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/projects/${project._id}`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(project._id)}
                      disabled={deletingId === project._id}
                    >
                      {deletingId === project._id ? (
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