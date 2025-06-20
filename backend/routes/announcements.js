const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all announcements (public)
router.get('/', async (req, res) => {
  try {
    const { type, priority, isActive = 'true', page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (type) filter.type = type;
    if (priority) filter.priority = priority;
    if (isActive !== 'all') filter.isActive = isActive === 'true';

    const skip = (page - 1) * limit;

    const announcements = await Announcement.find(filter)
      .sort({ priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Announcement.countDocuments(filter);

    res.json({
      success: true,
      data: {
        announcements,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: announcements.length,
          totalAnnouncements: total
        }
      }
    });

  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements'
    });
  }
});

// Get single announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await Announcement.findById(id).select('-__v');

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      data: announcement
    });

  } catch (error) {
    console.error('Get announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcement'
    });
  }
});

// Create new announcement
router.post('/', async (req, res) => {
  try {
    const announcementData = req.body;

    // Validation
    const requiredFields = ['type', 'title', 'description', 'date'];
    for (const field of requiredFields) {
      if (!announcementData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Create new announcement
    const announcement = new Announcement(announcementData);
    await announcement.save();

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully!',
      data: {
        id: announcement._id,
        title: announcement.title
      }
    });

  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create announcement'
    });
  }
});

// Update announcement
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      message: 'Announcement updated successfully!',
      data: announcement
    });

  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement'
    });
  }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });

  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete announcement'
    });
  }
});

// Toggle announcement active status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    announcement.isActive = !announcement.isActive;
    announcement.updatedAt = new Date();
    await announcement.save();

    res.json({
      success: true,
      message: `Announcement ${announcement.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        id: announcement._id,
        isActive: announcement.isActive
      }
    });

  } catch (error) {
    console.error('Toggle announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle announcement status'
    });
  }
});

module.exports = router;