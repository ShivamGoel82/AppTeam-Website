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

    // Check if email already exists
    const existingApplication = await TeamApplication.findOne({
      'personalInfo.email': applicationData.personalInfo.email
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

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
    }).select('status submittedAt reviewedAt');

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

module.exports = router;