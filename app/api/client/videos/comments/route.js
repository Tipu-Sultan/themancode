import mongoose from 'mongoose';
import { Video, Comment } from '@/models/videos';

export async function POST(req) {
  try {
    const { videoId, userId, username, text } = await req.json();

    // Validate required fields
    if (!videoId || !userId || !username || !text) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(videoId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(JSON.stringify({ error: 'Invalid videoId or userId' }), {
        status: 400,
      });
    }

    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return new Response(JSON.stringify({ error: 'Video not found' }), {
        status: 404,
      });
    }

    // Create and save comment
    const comment = new Comment({
      videoId: new mongoose.Types.ObjectId(videoId),
      userId: new mongoose.Types.ObjectId(userId),
      username,
      text,
    });
    await comment.save();

    // Serialize comment
    const serializedComment = {
      ...comment.toObject(),
      _id: comment._id.toString(),
      videoId: comment.videoId.toString(),
      userId: comment.userId.toString(),
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    };

    return new Response(JSON.stringify(serializedComment), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}