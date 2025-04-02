const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
    index: true // For faster querying by category
  },
  section: {
    type: String,
    required: true,
    trim: true,
    index: true // For faster querying by section
  },
  snippets: [
    {
      title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      language: {
        type: String,
        required: true,
        enum: ['javascript', 'python', 'css', 'html', 'typescript', 'other'], // Add more as needed
        default: 'javascript'
      },
      code: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt at the document level
});

// Compound index for efficient querying by category and section
snippetSchema.index({ category: 1, section: 1 }, { unique: true });

const Snippet = mongoose.models.Snippet || mongoose.model('Snippet', snippetSchema);

export default Snippet;