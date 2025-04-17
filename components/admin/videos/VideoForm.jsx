'use client';

import { useState, useEffect, useRef } from 'react';
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
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function VideoForm({ videoId = null, isEdit = false }) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'Tutorials',
    tags: '',
    videoFile: null,
    thumbnailFile: null,
  });
  const [previews, setPreviews] = useState({ video: null, thumbnail: null });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isEdit && videoId) {
      const fetchVideo = async () => {
        try {
          const res = await fetch(`/api/admin/videos/${videoId}`);
          const data = await res.json();
          if (res.ok) {
            setFormData({
              title: data.title,
              slug: data.slug,
              description: data.description,
              category: data.category,
              tags: data.tags.join(', '),
              videoFile: null,
              thumbnailFile: null,
            });
            setPreviews({
              video: data.videoUrl,
              thumbnail: data.thumbnailUrl || null,
            });
          } else {
            toast({
              title: 'Error',
              description: data.message || 'Failed to fetch video',
              variant: 'destructive',
            });
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: 'An error occurred while fetching video',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };
      fetchVideo();
    }
  }, [isEdit, videoId, toast]);

  // Handle file selection and preview
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, [`${type}File`]: file }));

    const reader = new FileReader();
    reader.onload = () => {
      setPreviews((prev) => ({ ...prev, [type]: reader.result }));
    };
    reader.readAsDataURL(file);

    // Extract video duration
    if (type === 'video' && file.type.startsWith('video/')) {
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        setFormData((prev) => ({ ...prev, duration: Math.round(videoElement.duration) }));
        URL.revokeObjectURL(videoElement.src);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('slug', formData.slug);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('tags', JSON.stringify(tagsArray));
    if (formData.videoFile) form.append('video', formData.videoFile);
    if (formData.thumbnailFile) form.append('thumbnail', formData.thumbnailFile);

    const url = isEdit ? `/api/admin/videos/${videoId}` : '/api/admin/videos';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: form,
      });
      const data = await res.json();

      if (res.ok) {
        toast({
          title: 'Success',
          description: isEdit ? 'Video updated successfully!' : 'Video created successfully!',
        });
        router.push('/admin/videos');
      } else {
        toast({
          title: 'Error',
          description: data.message || `Failed to ${isEdit ? 'update' : 'create'} video`,
          variant: 'destructive',
        });
        setError(data.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `An error occurred while ${isEdit ? 'updating' : 'creating'} the video`,
        variant: 'destructive',
      });
      setError('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {isEdit ? 'Edit Video' : 'Create New Video'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Next.js Tutorial"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g., nextjs-tutorial"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Learn Next.js basics"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded-md bg-background"
              required
            >
              <option value="Tutorials">Tutorials</option>
              <option value="Tech Reviews">Tech Reviews</option>
              <option value="Coding Tips">Coding Tips</option>
              <option value="Career Advice">Career Advice</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., Next.js, React, JavaScript"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Video File</label>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, 'video')}
              required={!isEdit}
            />
            {previews.video && (
              <video
                ref={videoRef}
                src={previews.video}
                controls
                className="mt-2 w-full max-h-64 rounded-md"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail File (optional)</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'thumbnail')}
            />
            {previews.thumbnail && (
              <img
                src={previews.thumbnail}
                alt="Thumbnail Preview"
                className="mt-2 w-full max-h-64 object-cover rounded-md"
              />
            )}
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEdit ? 'Update Video' : 'Create Video'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}