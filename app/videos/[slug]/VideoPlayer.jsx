"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Share2, Send, Trash2, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function VideoPlayer({ video, comments: initialComments }) {
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // Track comment being deleted
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
        title: "Please sign in to comment",
        variant: "destructive",
      });
    }
    if (!commentText.trim()) {
      return toast({
        title: "Comment cannot be empty",
        variant: "destructive",
      });
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/client/videos/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setCommentText("");
        toast({ title: "Comment added!", variant: "default" });
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      toast({ title: "Error adding comment", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!session) {
      return toast({
        title: "Please sign in to delete comments",
        variant: "destructive",
      });
    }
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      setIsDeleting(commentId);
      const response = await fetch(`/api/client/videos/comments/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });
      if (response.ok) {
        setLocalComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
        toast({ title: "Comment deleted!", variant: "default" });
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete comment");
      }
    } catch (error) {
      toast({
        title: "Error deleting comment",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleLike = async () => {
    if (!session) {
      return toast({ title: "Please sign in to like", variant: "destructive" });
    }

    try {
      const response = await fetch("/api/client/videos/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video._id, userId: session.user.id }),
      });
      if (response.ok) {
        const { liked, likeCount } = await response.json();
        setLikeState({ likeCount, liked });
        toast({ title: liked ? "Liked!" : "Unliked!", variant: "default" });
      } else {
        throw new Error("Failed to toggle like");
      }
    } catch (error) {
      toast({ title: "Error toggling like", variant: "destructive" });
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({ title: "Video URL copied to clipboard!", variant: "default" });
  };

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate">
      <div className="mb-6">
        <video
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          controls
          className="w-full aspect-video rounded-xl shadow-lg"
        />
      </div>
      <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">{video.description}</p>
      <div className="flex gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLike}
          className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              likeState.liked
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }`}
          />
          <span>{likeState.likeCount || 0}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
        >
          <Share2 className="w-5 h-5 text-muted-foreground" />
          <span>Share</span>
        </Button>
      </div>
      {/* Comments Section */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        <div className="space-y-4 max-h-80 overflow-y-auto mb-6 p-4 bg-muted/20 rounded-lg">
          {localComments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          ) : (
            localComments.map((comment) => (
              <div
                key={comment._id}
                className="flex justify-between items-start bg-background p-3 rounded-md shadow-sm"
              >
                <div>
                  <p className="text-sm">
                    <span className="font-medium text-primary">
                      {comment.username}:{" "}
                    </span>
                    {comment.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                {session?.user?.id === comment.userId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteComment(comment._id)}
                    disabled={isDeleting === comment._id}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100"
                  >
                    {isDeleting === comment._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 rounded-md border-muted focus:border-primary"
            disabled={isSubmitting}
          />
          <Button
            size="sm"
            onClick={handleCommentSubmit}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            disabled={!commentText.trim() || isSubmitting}
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
