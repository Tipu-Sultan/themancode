const mongoose = require('mongoose');
const { Video, Comment } = require('@/models/videos');

export async function fetchAllVideos() {
  const videos = await Video.find()
    .sort({ createdAt: -1 })
    .lean(); // Convert to plain objects
  const comments = await Comment.find()
    .sort({ createdAt: -1 })
    .lean(); // Convert to plain objects
  return { videos, comments };
}

export async function fetchVideoBySlug(slug) {
  const video = await Video.findOne({ slug }).lean();
  if (!video) return { video: null, comments: [] };
  const comments = await Comment.find({ videoId: video._id })
    .sort({ createdAt: -1 })
    .lean();
  return { video, comments };
}



