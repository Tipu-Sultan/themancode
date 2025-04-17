import mongoose from 'mongoose';
import { Video } from '@/models/videos';
import { NextResponse } from 'next/server';
import { uploadCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).lean();
    const serializedVideos = videos.map((video) => ({
      ...video,
      _id: video._id.toString(),
      createdAt: video.createdAt ? new Date(video.createdAt).toISOString() : null,
      updatedAt: video.updatedAt ? new Date(video.updatedAt).toISOString() : null,
      likes: Array.isArray(video?.likes)
        ? video.likes.map((like) => ({
            ...like,
            userId: like?.userId?.toString(),
            createdAt: like?.createdAt ? new Date(like.createdAt).toISOString() : null,
          }))
        : [],
    }));
    return NextResponse.json({ videos: serializedVideos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get('title');
    const slug = formData.get('slug');
    const description = formData.get('description');
    const category = formData.get('category');
    const tags = JSON.parse(formData.get('tags') || '[]');
    const videoFile = formData.get('video');
    const thumbnailFile = formData.get('thumbnail');

    // Validate required fields
    if (!title || !slug || !description || !category || !videoFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check for duplicate slug
    const existingVideo = await Video.findOne({ slug });
    if (existingVideo) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    // Upload video to Cloudinary
    const videoUpload = await uploadCloudinary(videoFile, 'video');
    const videoUrl = videoUpload.url;
    const videoPublicId = videoUpload.publicId;
    const duration = Math.round(videoUpload.duration);

    // Upload thumbnail to Cloudinary (if provided)
    let thumbnailUrl = '';
    let thumbnailPublicId = '';
    if (thumbnailFile) {
      const thumbnailUpload = await uploadCloudinary(thumbnailFile, 'image');
      thumbnailUrl = thumbnailUpload.url;
      thumbnailPublicId = thumbnailUpload.publicId;
    }

    // Create video
    const video = new Video({
      title,
      slug,
      description,
      category,
      tags: tags || [],
      videoUrl,
      videoPublicId,
      thumbnailUrl,
      thumbnailPublicId,
      duration,
      likes: [],
      likeCount: 0,
    });

    await video.save();

    // Serialize response
    const serializedVideo = {
      ...video.toObject(),
      _id: video._id.toString(),
      createdAt: video.createdAt.toISOString(),
      updatedAt: video.updatedAt.toISOString(),
    };

    return NextResponse.json(serializedVideo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}