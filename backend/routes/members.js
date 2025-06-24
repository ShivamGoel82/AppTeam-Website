const express = require('express');
const router = express.Router();
const Member = require('../models/Member'); // Assuming your Member model is correctly imported

// Get all visible members (and non-visible if query param is 'all')
router.get('/', async (req, res) => {
  try {
    const { memberType, isVisible } = req.query; // Added isVisible to query params

    const filter = {};
    // If isVisible is not 'all', filter by its boolean value, otherwise don't filter by visibility
    if (isVisible === 'true') {
      filter.isVisible = true;
    } else if (isVisible === 'false') {
      filter.isVisible = false;
    }
    // If isVisible is 'all', no filter for visibility is applied, showing both visible and hidden

    if (memberType) {
      filter['membershipInfo.memberType'] = memberType;
    }

    const members = await Member.find(filter)
      .sort({ 'membershipInfo.joinDate': -1 }) // Sort by joinDate descending
      .select('-__v'); // Exclude the __v field from the results

    res.json({
      success: true,
      data: members // Send back the filtered members
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
    if (!memberData.personalInfo || !memberData.professionalInfo || !memberData.personalInfo.email) {
      return res.status(400).json({
        success: false,
        message: 'Personal information, professional information, and email are required'
      });
    }

    // Check if email already exists for visible members
    const existingMember = await Member.findOne({
      'personalInfo.email': memberData.personalInfo.email.toLowerCase(),
      isVisible: true // Only check visible members for uniqueness during new creation
    });

    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: 'A member with this email already exists and is visible.'
      });
    }

    // Assign default values if not provided
    memberData.membershipInfo = memberData.membershipInfo || {};
    memberData.membershipInfo.joinDate = memberData.membershipInfo.joinDate || new Date(); // Set joinDate if not provided
    memberData.isVisible = true; // New members are visible by default

    const newMember = await Member.create(memberData);

    res.status(201).json({
      success: true,
      message: 'Member added successfully!',
      data: newMember.toObject({ getters: true, virtuals: false, versionKey: false }) // Return plain object without __v
    });

  } catch (error) {
    console.error('Add member error:', error);
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to add member'
    });
  }
});

// Update existing member profile by email
router.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const member = await Member.findOneAndUpdate(
      { 'personalInfo.email': email.toLowerCase() },
      { $set: updateData }, // $set ensures only provided fields are updated
      { new: true, runValidators: true } // Return the updated document, run schema validators
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: 'Member profile updated successfully',
      data: member.toObject({ getters: true, virtuals: false, versionKey: false })
    });

  } catch (error) {
    console.error('Update member error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update member profile'
    });
  }
});

// Get a single member by email
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const member = await Member.findOne({ 'personalInfo.email': email.toLowerCase() }).select('-__v');

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
    console.error('Get single member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member'
    });
  }
});


// Toggle member visibility by email (PATCH request)
// This replaces the old '/profile/:email/hide' route
router.patch('/profile/:email/visibility', async (req, res) => {
  try {
    const { email } = req.params;
    const { isVisible } = req.body; // Expecting 'isVisible' boolean in the request body

    // Validate that isVisible is explicitly a boolean
    if (typeof isVisible !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: isVisible must be a boolean.'
      });
    }

    const member = await Member.findOneAndUpdate(
      { 'personalInfo.email': email.toLowerCase() },
      { $set: { isVisible: isVisible } }, // Use $set to update only this field
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: `Member profile visibility updated to ${member.isVisible ? 'visible' : 'hidden'}`,
      data: {
        email: member.personalInfo.email,
        isVisible: member.isVisible // Return the updated visibility
      }
    });

  } catch (error) {
    console.error('Error toggling member visibility:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle member visibility',
      error: error.message // Include error message for better debugging
    });
  }
});


// Delete member profile by email (permanently remove)
router.delete('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const member = await Member.findOneAndDelete({ 'personalInfo.email': email.toLowerCase() });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: 'Member deleted permanently successfully'
    });

  } catch (error) {
    console.error('Delete member profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete member profile'
    });
  }
});


// Get member statistics (only visible members counted here)
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
    console.error('Get member statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member statistics'
    });
  }
});

module.exports = router;
