// models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200, // Short summary for previews
  },
  content: {
    type: String, // HTML content from TinyMCE
    required: true,
  },
  image: {
    type: String, // URL or path to image
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  readTime: {
    type: String, // e.g., "5 min read"
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

blogSchema.index({ category: 1, slug: 1 }); // Compound index for efficient querying

const Blog =  mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;