'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/admin/videos');
        const data = await res.json();
        if (res.ok) {
          setVideos(data.videos);
        } else {
          toast({ title: 'Error', description: data.message || 'Failed to fetch videos', variant: 'destructive' });
        }
      } catch (error) {
        toast({ title: 'Error', description: 'An error occurred while fetching videos', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [toast]);

  const handleDelete = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const res = await fetch(`/api/admin/videos/${videoId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setVideos(videos.filter((video) => video._id !== videoId));
        toast({ title: 'Success', description: 'Video deleted successfully!' });
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to delete video', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred while deleting the video', variant: 'destructive' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {videos.map((video) => (
        <div key={video._id} className="p-4 bg-muted/20 rounded-lg shadow-sm flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <p className="text-sm text-muted-foreground">{video.category}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/videos/${video._id}`}>
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(video._id)}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      ))}
      {videos.length === 0 && <p className="text-center text-muted-foreground">No videos found.</p>}
    </div>
  );
}