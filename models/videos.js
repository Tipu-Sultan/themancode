const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Video Schema
const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Slug must be at least 3 characters'],
      maxlength: [100, 'Slug cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Tutorials', 'Tech Reviews', 'Coding Tips', 'Career Advice', 'Other'],
        message: 'Invalid category',
      },
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (tags) => tags.every((tag) => tag.length <= 50),
        message: 'Each tag cannot exceed 50 characters',
      },
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
      match: [/^https:\/\/res\.cloudinary\.com\/.*\/video\/upload\/.*/, 'Invalid Cloudinary video URL'],
    },
    videoPublicId: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    thumbnailUrl: {
      type: String,
      trim: true,
      match: [/^https:\/\/res\.cloudinary\.com\/.*\/image\/upload\/.*/, 'Invalid Cloudinary thumbnail URL'],
    },
    thumbnailPublicId: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [0, 'Duration cannot be negative'],
    },
    likes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
      min: [0, 'Like count cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.index({ createdAt: -1 });
videoSchema.index({ category: 1 });

// Comment Schema
const commentSchema = new Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, 'Video ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [2, 'Username must be at least 2 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters'],
    },
    text: {
      type: String,
      required: [true, 'Comment text is required'],
      trim: true,
      minlength: [1, 'Comment cannot be empty'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ videoId: 1, createdAt: -1 });

// Models
const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

module.exports = { Video, Comment };