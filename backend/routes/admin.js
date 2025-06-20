const express = require('express');
const router = express.Router();
const TeamApplication = require('../models/TeamApplication');
const Contact = require('../models/Contact');
const Member = require('../models/Member');
const Announcement = require('../models/Announcement');

// Get all team applications
router.get('/applications', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const applications = await TeamApplication.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

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

// Update application status
router.patch('/applications/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, reviewedBy } = req.body;

    const validStatuses = ['pending', 'approved', 'rejected', 'interview_scheduled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const application = await TeamApplication.findByIdAndUpdate(
      id,
      {
        status,
        adminNotes,
        reviewedBy,
        reviewedAt: new Date()
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });

  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status'
    });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      totalContacts,
      newContacts,
      totalMembers,
      totalAnnouncements,
      activeAnnouncements
    ] = await Promise.all([
      TeamApplication.countDocuments(),
      TeamApplication.countDocuments({ status: 'pending' }),
      TeamApplication.countDocuments({ status: 'approved' }),
      TeamApplication.countDocuments({ status: 'rejected' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Member.countDocuments({ isVisible: true }),
      Announcement.countDocuments(),
      Announcement.countDocuments({ isActive: true })
    ]);

    res.json({
      success: true,
      data: {
        applications: {
          total: totalApplications,
          pending: pendingApplications,
          approved: approvedApplications,
          rejected: rejectedApplications
        },
        contacts: {
          total: totalContacts,
          new: newContacts
        },
        members: {
          total: totalMembers
        },
        announcements: {
          total: totalAnnouncements,
          active: activeAnnouncements
        }
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: contacts.length,
          totalContacts: total
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// Update contact status
router.patch('/contacts/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'read', 'replied'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

module.exports = router;