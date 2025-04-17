import mongoose from 'mongoose';
import { Video } from '@/models/videos';
import { NextResponse } from 'next/server';
import { uploadCloudinary, deleteCloudinary } from '@/lib/cloudinary';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid video ID' }, { status: 400 });
    }

    const video = await Video.findById(id).lean();
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const serializedVideo = {
      ...video,
      _id: video._id.toString(),
      createdAt: video.createdAt ? new Date(video.createdAt).toISOString() : null,
      updatedAt: video.updatedAt ? new Date(video.updatedAt).toISOString() : null,
    };

    return NextResponse.json(serializedVideo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();
    const title = formData.get('title');
    const slug = formData.get('slug');
    const description = formData.get('description');
    const category = formData.get('category');
    const tags = JSON.parse(formData.get('tags') || '[]');
    const videoFile = formData.get('video');
    const thumbnailFile = formData.get('thumbnail');

    // Validate required fields
    if (!title || !slug || !description || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid video ID' }, { status: 400 });
    }

    // Check for duplicate slug (excluding current video)
    const existingVideo = await Video.findOne({ slug, _id: { $ne: id } });
    if (existingVideo) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    // Find existing video
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Handle video file update
    let videoUrl = video.videoUrl;
    let videoPublicId = video.videoPublicId;
    let duration = video.duration;
    if (videoFile) {
      // Delete old video from Cloudinary
      if (videoPublicId) {
        await deleteCloudinary(videoPublicId, 'video');
      }
      // Upload new video
      const videoUpload = await uploadCloudinary(videoFile, 'video');
      videoUrl = videoUpload.url;
      videoPublicId = videoUpload.publicId;
      duration = Math.round(videoUpload.duration);
    }

    // Handle thumbnail file update
    let thumbnailUrl = video.thumbnailUrl;
    let thumbnailPublicId = video.thumbnailPublicId;
    if (thumbnailFile) {
      // Delete old thumbnail from Cloudinary
      if (thumbnailPublicId) {
        await deleteCloudinary(thumbnailPublicId, 'image');
      }
      // Upload new thumbnail
      const thumbnailUpload = await uploadCloudinary(thumbnailFile, 'image');
      thumbnailUrl = thumbnailUpload.url;
      thumbnailPublicId = thumbnailUpload.publicId;
    }

    // Update video
    video.title = title;
    video.slug = slug;
    video.description = description;
    video.category = category;
    video.tags = tags || [];
    video.videoUrl = videoUrl;
    video.videoPublicId = videoPublicId;
    video.thumbnailUrl = thumbnailUrl;
    video.thumbnailPublicId = thumbnailPublicId;
    video.duration = duration;

    await video.save();

    // Serialize response
    const serializedVideo = {
      ...video.toObject(),
      _id: video._id.toString(),
      createdAt: video.createdAt.toISOString(),
      updatedAt: video.updatedAt.toISOString(),
    };

    return NextResponse.json(serializedVideo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid video ID' }, { status: 400 });
    }

    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Delete video and thumbnail from Cloudinary
    if (video.videoPublicId) {
      await deleteCloudinary(video.videoPublicId, 'video');
    }
    if (video.thumbnailPublicId) {
      await deleteCloudinary(video.thumbnailPublicId, 'image');
    }

    // Delete video from database
    await Video.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}