import { notFound } from 'next/navigation';
import { fetchVideoBySlug } from '@/lib/server/client/videos';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import VideoPlayer from './VideoPlayer';

function serializeVideo(data) {
  const { video, comments } = data;
  return {
    video: {
      ...video,
      _id: video._id.toString(),
      createdAt: video.createdAt ? new Date(video.createdAt).toISOString() : null,
      updatedAt: video.updatedAt ? new Date(video.updatedAt).toISOString() : null,
      likes: Array.isArray(video?.likes)
        ? video.likes.map((like) => ({
            ...like,
            _id: like._id ? like._id.toString() : null,
            userId: like?.userId?.toString(),
            createdAt: like?.createdAt ? new Date(like.createdAt).toISOString() : null,
          }))
        : [],
    },
    comments: comments.map((comment) => ({
      ...comment,
      _id: comment._id.toString(),
      videoId: comment.videoId.toString(),
      userId: comment.userId.toString(),
      createdAt: comment.createdAt ? new Date(comment.createdAt).toISOString() : null,
      updatedAt: comment.updatedAt ? new Date(comment.updatedAt).toISOString() : null,
    })),
  };
}

export default async function VideoDetailPage({ params }) {
  const { slug } = params;
  const rawData = await fetchVideoBySlug(slug);
  if (!rawData.video) return notFound();

  const { video, comments } =  serializeVideo(rawData);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <Suspense fallback={<Skeleton className="aspect-video w-full rounded-xl" />}>
          <VideoPlayer video={video} comments={comments} />
        </Suspense>
      </div>
    </section>
  );
}