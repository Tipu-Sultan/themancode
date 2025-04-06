'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function ProjectForm({ projectId=null, isEdit = false }) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    category: 'Web Development',
    github: '',
    url: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && projectId) {
      const fetchProject = async () => {
        try {
          const res = await fetch(`/api/admin/project/${projectId}`);
          const data = await res.json();
          if (res.ok) {
            setFormData({
              title: data.title,
              description: data.description,
              image: data.image,
              tags: data.tags.join(', '), // Convert array to comma-separated string
              category: data.category,
              github: data.github,
              url: data.url
            });
          } else {
            toast({ title: 'Error', description: data.message || 'Failed to fetch project', variant: 'destructive' });
          }
        } catch (error) {
          toast({ title: 'Error', description: 'An error occurred while fetching project', variant: 'destructive' });
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [isEdit, projectId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const tagsArray = formData.tags.split(',').map(tag => tag.trim());
    const url = isEdit ? `/api/admin/project/${projectId}` : '/api/admin/project';
    const method = isEdit ? 'PUT' : 'POST';
    const body = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tags: tagsArray,
      category: formData.category,
      github: formData.github,
      url: formData.url
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        toast({ title: 'Success', description: isEdit ? 'Project updated successfully!' : 'Project created successfully!' });
        router.push('/admin/projects');
      } else {
        toast({ title: 'Error', description: data.message || `Failed to ${isEdit ? 'update' : 'create'} project`, variant: 'destructive' });
        setError(data.message);
      }
    } catch (error) {
      toast({ title: 'Error', description: `An error occurred while ${isEdit ? 'updating' : 'creating'} the project`, variant: 'destructive' });
      setError('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">{isEdit ? 'Edit Project' : 'Create New Project'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., E-Commerce Platform"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Full-stack e-commerce solution"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="e.g., https://images.unsplash.com/..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., Next.js, Laravel, MySQL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded-md bg-background"
            >
              <option value="Web Development">Web Development</option>
              <option value="full-stack Development">Full-stack Development</option>
              <option value="Frontend">Frontend</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <Input
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="e.g., https://github.com/username/project"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Project URL</label>
            <Input
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="e.g., /projects/e-commerce"
              required
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEdit ? 'Update Project' : 'Create Project'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}