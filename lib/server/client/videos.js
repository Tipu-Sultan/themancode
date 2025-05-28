const { Video, Comment } = require('@/models/videos');
import { cache } from 'react';
import dbConnect from '@/lib/dbconnect';

export const fetchAllVideos = cache(async () => {
  await dbConnect();
  const videos = await Video.aggregate([
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'videoId',
        as: 'comments',
      },
    },
    {
      $project: {
        title: 1,
        slug: 1,
        thumbnailPublicId: 1,
        description: 1,
        likeCount: 1,
        commentCount: { $size: '$comments' },
      },
    },
  ]).exec();
  return { videos };
});

export const fetchVideoBySlug = cache(async (slug) => {
  await dbConnect();
  const video = await Video.findOne({ slug })
    .select('title slug videoPublicId thumbnailPublicId description likeCount likes category tags createdAt updatedAt')
    .lean();
  if (!video) return { video: null, comments: [], totalComments: 0 };

  const comments = await Comment.find({ videoId: video._id })
    .select('videoId userId username text createdAt updatedAt')
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  const totalComments = await Comment.countDocuments({ videoId: video._id });

  return { video, comments, totalComments };
});