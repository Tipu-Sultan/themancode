import mongoose from 'mongoose';
import { Video } from '@/models/videos';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { videoId, userId } = await req.json();

    // Validate required fields
    if (!videoId || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(videoId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid videoId or userId' }, { status: 400 });
    }

    // Find video
    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    // Check if user has liked, ensuring like.userId exists
    const userLiked = video.likes.some(
      (like) => like.userId && like.userId.equals(userObjectId)
    );

    // Toggle like
    if (userLiked) {
      video.likes = video.likes.filter(
        (like) => !like.userId || !like.userId.equals(userObjectId)
      );
      video.likeCount = Math.max(0, video.likeCount - 1);
    } else {
      video.likes.push({ userId: userObjectId, createdAt: new Date() });
      video.likeCount += 1;
    }

    await video.save();

    return NextResponse.json({ liked: !userLiked, likeCount: video.likeCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}