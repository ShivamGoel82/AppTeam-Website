const mongoose = require('mongoose');

const teamApplicationSchema = new mongoose.Schema({
  personalInfo: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    branch: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: String,
      required: true,
      enum: ['1st', '2nd', '3rd', '4th']
    }
  },
  technicalInfo: {
    primarySkills: [{
      type: String,
      required: true
    }],
    programmingLanguages: [{
      type: String,
      required: true
    }],
    frameworks: [{
      type: String
    }],
    experience: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true
    },
    portfolioUrl: {
      type: String,
      trim: true
    },
    githubUrl: {
      type: String,
      trim: true
    }
  },
  motivation: {
    whyJoin: {
      type: String,
      required: true,
      maxlength: 500
    },
    contribution: {
      type: String,
      required: true,
      maxlength: 500
    },
    previousProjects: {
      type: String,
      maxlength: 500
    }
  },
  availability: {
    hoursPerWeek: {
      type: Number,
      required: true,
      min: 1,
      max: 40
    },
    preferredRole: {
      type: String,
      required: true,
      enum: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Mobile Developer', 'UI/UX Designer', 'DevOps Engineer', 'AI/ML Engineer']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'interview_scheduled'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: String,
    trim: true
  }
});

// Index for efficient queries
teamApplicationSchema.index({ 'personalInfo.email': 1 });
teamApplicationSchema.index({ status: 1 });
teamApplicationSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('TeamApplication', teamApplicationSchema);