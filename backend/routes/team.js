const express = require('express');
const router = express.Router();
const TeamApplication = require('../models/TeamApplication');

// Submit team application
router.post('/apply', async (req, res) => {
  try {
    const applicationData = req.body;

    // Validation
    const requiredFields = [
      'personalInfo.fullName',
      'personalInfo.email',
      'personalInfo.phone',
      'personalInfo.rollNumber',
      'personalInfo.branch',
      'personalInfo.year',
      'technicalInfo.primarySkills',
      'technicalInfo.programmingLanguages',
      'technicalInfo.experience',
      'motivation.whyJoin',
      'motivation.contribution',
      'availability.hoursPerWeek',
      'availability.preferredRole'
    ];

    for (const field of requiredFields) {
      const value = field.split('.').reduce((obj, key) => obj?.[key], applicationData);
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return res.status(400).json({
          success: false,
          message: `${field.replace(/\./g, ' ')} is required`
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.personalInfo.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if email already exists
    const existingApplication = await TeamApplication.findOne({
      'personalInfo.email': applicationData.personalInfo.email.toLowerCase()
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    // Normalize email to lowercase
    applicationData.personalInfo.email = applicationData.personalInfo.email.toLowerCase();

    // Create new application
    const application = new TeamApplication(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Your application has been submitted successfully! We\'ll review it and get back to you soon.',
      data: {
        id: application._id,
        submittedAt: application.submittedAt
      }
    });

  } catch (error) {
    console.error('Team application error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Get application status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const application = await TeamApplication.findOne({
      'personalInfo.email': email.toLowerCase()
    }).select('status submittedAt reviewedAt adminNotes');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'No application found with this email'
      });
    }

    res.json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Get application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application status'
    });
  }
});

// Get all applications (admin only)
router.get('/applications', async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'submittedAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const applications = await TeamApplication.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await TeamApplication.countDocuments(filter);

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: applications.length,
          totalApplications: total
        }
      }
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Get single application by ID
router.get('/application/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await TeamApplication.findById(id).select('-__v');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

module.exports = router;