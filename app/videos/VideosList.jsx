'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function VideosList({ videos }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video._id}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          onClick={() => router.push(`/videos/${video.slug}`)}
          className="cursor-pointer"
        >
          <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <CldImage
                src={video.thumbnailPublicId}
                width={640}
                height={360}
                alt={video.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="aspect-video w-full object-cover rounded-t-xl"
                format="auto"
                quality="auto"
              />
              <div className="p-4">
                <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {video.likeCount || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {video.commentCount || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}