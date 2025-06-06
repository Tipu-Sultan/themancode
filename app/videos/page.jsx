export const revalidate = 60;

import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllVideos } from '@/lib/server/client/videos';
import VideosList from './VideosList';

function serializeVideos(data) {
  const { videos } = data;
  return {
    videos: videos.map((video) => ({
      ...video,
      _id: video._id.toString(),
      createdAt: video.createdAt ? new Date(video.createdAt).toISOString() : null,
      updatedAt: video.updatedAt ? new Date(video.updatedAt).toISOString() : null,
    })),
  };
}

export default async function VideosPage() {
  const rawData = await fetchAllVideos();
  const { videos } = serializeVideos(rawData);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            My Videos
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Explore my video tutorials and tech insights
          </p>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          }
        >
          <VideosList videos={videos} />
        </Suspense>
      </div>
    </section>
  );
}