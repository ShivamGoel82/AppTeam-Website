const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Get all visible members
router.get('/', async (req, res) => {
  try {
    const { memberType } = req.query;
    
    const filter = { isVisible: true };
    if (memberType) {
      filter['membershipInfo.memberType'] = memberType;
    }

    const members = await Member.find(filter)
      .sort({ 'membershipInfo.joinDate': -1 })
      .select('-__v');

    res.json({
      success: true,
      data: members
    });

  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch members'
    });
  }
});

// Add new member
router.post('/', async (req, res) => {
  try {
    const memberData = req.body;

    // Validation
    if (!memberData.personalInfo || !memberData.professionalInfo) {
      return res.status(400).json({
        success: false,
        message: 'Personal and professional information are required'
      });
    }

    // Check if email already exists
    const existingMember = await Member.findOne({
      'personalInfo.email': memberData.personalInfo.email
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'A member with this email already exists'
      });
    }

    // Create new member
    const member = new Member(memberData);
    await member.save();

    res.status(201).json({
      success: true,
      message: 'Member profile created successfully!',
      data: {
        id: member._id,
        email: member.personalInfo.email
      }
    });

  } catch (error) {
    console.error('Add member error:', error);
    
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
      message: 'Failed to create member profile'
    });
  }
});

// Get member by email (for editing)
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const member = await Member.findOne({
      'personalInfo.email': email.toLowerCase()
    }).select('-__v');

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });

  } catch (error) {
    console.error('Get member profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member profile'
    });
  }
});

// Update member profile
router.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const member = await Member.findOneAndUpdate(
      { 'personalInfo.email': email.toLowerCase() },
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      data: member
    });

  } catch (error) {
    console.error('Update member profile error:', error);
    
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
      message: 'Failed to update profile'
    });
  }
});

// Delete member profile (soft delete)
router.delete('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const member = await Member.findOneAndUpdate(
      { 'personalInfo.email': email.toLowerCase() },
      { isVisible: false },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile hidden successfully'
    });

  } catch (error) {
    console.error('Delete member profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to hide profile'
    });
  }
});

// Get member statistics
router.get('/stats', async (req, res) => {
  try {
    const [
      totalMembers,
      coreMembers,
      activeMembers,
      alumniMembers
    ] = await Promise.all([
      Member.countDocuments({ isVisible: true }),
      Member.countDocuments({ isVisible: true, 'membershipInfo.memberType': 'core' }),
      Member.countDocuments({ isVisible: true, 'membershipInfo.memberType': 'active' }),
      Member.countDocuments({ isVisible: true, 'membershipInfo.memberType': 'alumni' })
    ]);

    res.json({
      success: true,
      data: {
        total: totalMembers,
        core: coreMembers,
        active: activeMembers,
        alumni: alumniMembers
      }
    });

  } catch (error) {
    console.error('Get member stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member statistics'
    });
  }
});

module.exports = router;