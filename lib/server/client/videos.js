// lib/server/client/videos.js
const { Video, Comment } = require('@/models/videos');
import { cache } from 'react';
import dbConnect from '@/lib/dbconnect';

export const fetchAllVideos = cache(async () => {
  await dbConnect();
  const videos = await Video.find()
    .select('title slug videoPublicId thumbnailPublicId description likeCount likes')
    .lean();
  const comments = await Comment.find()
    .select('videoId userId username text createdAt updatedAt')
    .lean();
  return { videos, comments };
});

export const fetchVideoBySlug = cache(async (slug) => {
  await dbConnect();
  const video = await Video.findOne({ slug }).lean();
  if (!video) return { video: null, comments: [] };

  const comments = await Comment.find({ videoId: video._id }).lean();
  return { video, comments };
});