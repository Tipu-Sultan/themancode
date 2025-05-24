'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Share2, Send, Trash2, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import { CldVideoPlayer } from 'next-cloudinary';
import 'cloudinary-video-player/cld-video-player.min.css';

import { ErrorBoundary } from 'react-error-boundary';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const VideoErrorFallback = ({ error }) => (
  <div className="w-full aspect-video bg-muted rounded-2xl flex items-center justify-center text-center p-6">
    <div>
      <p className="text-lg text-red-500 font-semibold">Failed to load video</p>
      <p className="text-sm text-muted-foreground mt-2">
        {error.message || 'Please try again later or check the video source.'}
      </p>
    </div>
  </div>
);

export default function VideoPlayer({ video, comments: initialComments }) {
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [localComments, setLocalComments] = useState(initialComments);
  const [likeState, setLikeState] = useState({
    likeCount: video.likeCount || 0,
    liked: session?.user?.id && video?.likes
      ? video.likes.some((like) => like.userId === session.user.id)
      : false,
  });

  const handleCommentSubmit = async () => {
    if (!session) {
      return toast({
        title: 'Please sign in to comment',
        variant: 'destructive',
      });
    }
    if (!commentText.trim()) {
      return toast({
        title: 'Comment cannot be empty',
        variant: 'destructive',
      });
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/client/videos/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId: video._id,
          userId: session.user.id,
          username: session.user.name,
          text: commentText,
        }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setLocalComments((prev) => [...prev, newComment]);
        setCommentText('');
        toast({ title: 'Comment added!', variant: 'default' });
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      toast({ title: 'Error adding comment', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!session) {
      return toast({
        title: 'Please sign in to delete comments',
        variant: 'destructive',
      });
    }
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      setIsDeleting(commentId);
      const response = await fetch(`/api/client/videos/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });
      if (response.ok) {
        setLocalComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
        toast({ title: 'Comment deleted!', variant: 'default' });
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete comment');
      }
    } catch (error) {
      toast({
        title: 'Error deleting comment',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleLike = async () => {
    if (!session) {
      return toast({ title: 'Please sign in to like', variant: 'destructive' });
    }

    try {
      const response = await fetch('/api/client/videos/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId: video._id, userId: session.user.id }),
      });
      if (response.ok) {
        const { liked, likeCount } = await response.json();
        setLikeState({ likeCount, liked });
        toast({ title: liked ? 'Liked!' : 'Unliked!', variant: 'default' });
      } else {
        throw new Error('Failed to toggle like');
      }
    } catch (error) {
      toast({ title: 'Error toggling like', variant: 'destructive' });
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({ title: 'Video URL copied to clipboard!', variant: 'default' });
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Video Player */}
      <ErrorBoundary FallbackComponent={VideoErrorFallback}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-black">
          <CldVideoPlayer
            id={video.slug}
            src={video.videoPublicId} // e.g., themancode/videos/ikns0qr1djub24y1qpl5
            width={1280}
            height={720}
            controls
            className="w-full aspect-video"
            poster={video.thumbnailPublicId} // e.g., themancode/thumbnails/oyydlvv7mewij0kkqwdu
            autoPlay={false}
            transformation={{
              fetch_format: 'auto',
              quality: 'auto',
              flags: 'splice',
              video_codec: 'h265',
              aspect_ratio: '16:9',
              crop: 'fill',
            }}
            aria-label={`Video player for ${video.title}`}
            aria-describedby={video.description ? `video-desc-${video.slug}` : undefined}
          />
        </div>
      </ErrorBoundary>

      {/* Video Info */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{video.title}</h1>
        <div className="flex flex-wrap gap-2">
          {video.category && (
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              {video.category}
            </span>
          )}
          {video.tags?.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-muted/50 text-muted-foreground px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {video.description && (
          <p id={`video-desc-${video.slug}`} className="text-base text-muted-foreground leading-relaxed">
            {video.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleLike}
          className="group flex items-center gap-2 border-2 hover:bg-primary/10 transition-all duration-300"
          aria-label={likeState.liked ? 'Unlike video' : 'Like video'}
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
              likeState.liked
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground'
            }`}
          />
          <span className="font-medium">{likeState.likeCount || 0}</span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleShare}
          className="group flex items-center gap-2 border-2 hover:bg-primary/10 transition-all duration-300"
          aria-label="Share video"
        >
          <Share2 className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:scale-110" />
          <span className="font-medium">Share</span>
        </Button>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-6">Comments ({localComments.length})</h2>
        <div
          className="space-y-4 max-h-[500px] overflow-y-auto p-6 bg-muted/10 rounded-2xl scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        >
          {localComments.length === 0 ? (
            <p className="text-base text-muted-foreground text-center py-4">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            localComments.map((comment) => (
              <div
                key={comment._id}
                className="flex justify-between items-start p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">{comment.username}</span>
                    <span className="text-sm text-muted-foreground">
                      • {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-base text-foreground mt-2">{comment.text}</p>
                </div>
                {session?.user?.id === comment.userId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteComment(comment._id)}
                    disabled={isDeleting === comment._id}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-3 transition-colors duration-200"
                    aria-label="Delete comment"
                  >
                    {isDeleting === comment._id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </Button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="mt-8 flex gap-4">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 rounded-xl border-2 border-muted focus:border-primary py-3 text-base transition-colors duration-200"
            disabled={isSubmitting}
            aria-label="Comment input"
          />
          <Button
            size="lg"
            onClick={handleCommentSubmit}
            className="rounded-xl bg-primary hover:bg-primary/90 px-6 transition-transform duration-200 hover:scale-105"
            disabled={!commentText.trim() || isSubmitting}
            aria-label="Post comment"
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}