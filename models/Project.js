const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'At least one tag is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['full-stack Development','Web Development', 'Frontend', 'AI/ML', 'Mobile'], // Match your categories
  },
  github: {
    type: String,
    required: [true, 'GitHub URL is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'Project URL is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Project =  mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default Project;