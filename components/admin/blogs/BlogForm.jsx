// components/admin/blogs/BlogForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import TinyMCE to avoid SSR issues
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function BlogForm({ blogId = null, isEdit = false }) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    excerpt: '',
    content: '',
    image: '',
    tags: '',
    readTime: '',
  });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && blogId) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`/api/admin/blog/${blogId}`);
          const data = await res.json();
          if (res.ok) {
            setFormData({
              title: data.title,
              slug: data.slug,
              category: data.category,
              excerpt: data.excerpt,
              content: data.content,
              image: data.image,
              tags: data.tags.join(', '),
              readTime: data.readTime,
            });
          } else {
            toast({ title: 'Error', description: data.message || 'Failed to fetch blog', variant: 'destructive' });
          }
        } catch (error) {
          toast({ title: 'Error', description: 'An error occurred while fetching blog', variant: 'destructive' });
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [isEdit, blogId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const url = isEdit ? `/api/admin/blog/${blogId}` : '/api/admin/blog';
    const method = isEdit ? 'PUT' : 'POST';
    const body = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        toast({ title: 'Success', description: isEdit ? 'Blog updated successfully!' : 'Blog created successfully!' });
        router.push('/admin/blogs');
      } else {
        toast({ title: 'Error', description: data.message || `Failed to ${isEdit ? 'update' : 'create'} blog`, variant: 'destructive' });
        setError(data.message);
      }
    } catch (error) {
      toast({ title: 'Error', description: `An error occurred while ${isEdit ? 'updating' : 'creating'} the blog`, variant: 'destructive' });
      setError('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Understanding Next.js"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g., understanding-nextjs"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Next.js"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short summary (max 200 characters)"
              maxLength={200}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <Editor
              apiKey={process.env.TINYMCE_API_KEY} // Get from TinyMCE website
              value={formData.content}
              onEditorChange={(content) => setFormData({ ...formData, content })}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | code | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="e.g., /images/blog-image.jpg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., nextjs, javascript, tutorial"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Read Time</label>
            <Input
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              placeholder="e.g., 5 min read"
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
              isEdit ? 'Update Blog' : 'Create Blog'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}