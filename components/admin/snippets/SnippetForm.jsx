// components/admin/snippets/SnippetForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function SnippetForm({ snippetId = null, isEdit = false }) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: '',
    section: '',
    snippets: [{ title: '', description: '', language: 'javascript', code: '' }],
  });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && snippetId) {
      const fetchSnippet = async () => {
        try {
          const res = await fetch(`/api/admin/snippet/${snippetId}`);
          const data = await res.json();
          if (res.ok) {
            setFormData({
              category: data.category,
              section: data.section,
              snippets: data.snippets.map((s) => ({
                title: s.title,
                description: s.description,
                language: s.language,
                code: s.code,
              })),
            });
          } else {
            toast({ title: 'Error', description: data.message || 'Failed to fetch snippet', variant: 'destructive' });
          }
        } catch (error) {
          toast({ title: 'Error', description: 'An error occurred while fetching snippet', variant: 'destructive' });
        } finally {
          setLoading(false);
        }
      };
      fetchSnippet();
    }
  }, [isEdit, snippetId, toast]);

  const addSnippet = () => {
    setFormData({
      ...formData,
      snippets: [...formData.snippets, { title: '', description: '', language: 'javascript', code: '' }],
    });
  };

  const removeSnippet = (index) => {
    setFormData({
      ...formData,
      snippets: formData.snippets.filter((_, i) => i !== index),
    });
  };

  const updateSnippet = (index, field, value) => {
    const updatedSnippets = formData.snippets.map((snippet, i) =>
      i === index ? { ...snippet, [field]: value } : snippet
    );
    setFormData({ ...formData, snippets: updatedSnippets });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const url = isEdit ? `/api/admin/snippet/${snippetId}` : '/api/admin/snippet';
    const method = isEdit ? 'PUT' : 'POST';
    const body = {
      category: formData.category,
      section: formData.section,
      snippets: formData.snippets,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        toast({ title: 'Success', description: isEdit ? 'Snippets updated successfully!' : 'Snippets created successfully!' });
        router.push('/admin/snippets');
      } else {
        toast({ title: 'Error', description: data.message || `Failed to ${isEdit ? 'update' : 'create'} snippets`, variant: 'destructive' });
        setError(data.message);
      }
    } catch (error) {
      toast({ title: 'Error', description: `An error occurred while ${isEdit ? 'updating' : 'creating'} the snippets`, variant: 'destructive' });
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
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">{isEdit ? 'Edit Snippets' : 'Create New Snippets'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
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
            <label className="block text-sm font-medium mb-1">Section</label>
            <Input
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              placeholder="e.g., API Routes"
              required
            />
          </div>

          {formData.snippets.map((snippet, index) => (
            <div key={index} className="space-y-4 border p-4 rounded-md relative">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Snippet #{index + 1}</h3>
                {formData.snippets.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSnippet(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={snippet.title}
                  onChange={(e) => updateSnippet(index, 'title', e.target.value)}
                  placeholder="e.g., Basic API Handler"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  value={snippet.description}
                  onChange={(e) => updateSnippet(index, 'description', e.target.value)}
                  placeholder="e.g., Simple GET request handler"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <select
                  value={snippet.language}
                  onChange={(e) => updateSnippet(index, 'language', e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="typescript">TypeScript</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <Textarea
                  value={snippet.code}
                  onChange={(e) => updateSnippet(index, 'code', e.target.value)}
                  placeholder="Enter your code here"
                  rows={10}
                  required
                />
              </div>
            </div>
          ))}

          <Button type="button" onClick={addSnippet} className="w-full flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> Add Another Snippet
          </Button>

          <Button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEdit ? 'Update Snippets' : 'Create Snippets'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}