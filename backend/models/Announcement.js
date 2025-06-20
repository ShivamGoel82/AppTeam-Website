const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Event', 'Workshop', 'Achievement', 'General', 'Urgent'],
    required: true,
    default: 'General'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
announcementSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for efficient queries
announcementSchema.index({ type: 1 });
announcementSchema.index({ priority: 1 });
announcementSchema.index({ isActive: 1 });
announcementSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);