const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
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
      lowercase: true,
      unique: true
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
    },
    profileImage: {
      type: String,
      trim: true
    }
  },
  professionalInfo: {
    role: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      required: true,
      maxlength: 300
    },
    skills: [{
      type: String,
      required: true
    }],
    portfolioUrl: {
      type: String,
      trim: true
    },
    githubUrl: {
      type: String,
      trim: true
    },
    linkedinUrl: {
      type: String,
      trim: true
    },
    twitterUrl: {
      type: String,
      trim: true
    }
  },
  membershipInfo: {
    joinDate: {
      type: Date,
      default: Date.now
    },
    memberType: {
      type: String,
      enum: ['core', 'active', 'alumni'],
      default: 'active'
    },
    position: {
      type: String,
      trim: true
    }
  },
  isVisible: {
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
memberSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for efficient queries
memberSchema.index({ 'personalInfo.email': 1 });
memberSchema.index({ 'membershipInfo.memberType': 1 });
memberSchema.index({ isVisible: 1 });

module.exports = mongoose.model('Member', memberSchema);