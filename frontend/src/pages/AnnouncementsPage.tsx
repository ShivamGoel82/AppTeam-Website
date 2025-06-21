import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Trophy, Sparkles, Bell, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

// Centralize API Base URL
const API_BASE_URL = 'https://appteam-website-1.onrender.com/api/announcements';

interface Announcement {
  _id: string;
  type: 'Event' | 'Workshop' | 'Achievement' | 'General' | 'Urgent';
  title: string;
  content: string; // Changed from description to content for consistency
  date: string;
  time?: string;
  location?: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AnnouncementsPage: React.FC = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    type: 'General',
    title: '',
    content: '', // Changed from description to content
    date: '',
    time: '',
    location: '',
    link: '',
    priority: 'medium',
    isActive: true
  });

  // Function to fetch announcements from the backend
  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      // This fetches ALL announcements (active and inactive) for management
      const response = await fetch(`${API_BASE_URL}?isActive=all`);
      const data = await response.json();
      
      if (data.success) {
        setAnnouncements(data.data.announcements);
      } else {
        console.error('Failed to fetch announcements:', data.message);
        // TODO: Add user-friendly error notification (e.g., toast)
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // TODO: Add user-friendly error notification (e.g., toast)
    } finally {
      setLoading(false);
    }
  }, []); // Dependencies: none as it uses fixed URL and setters

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'Event':
        return <Calendar className="w-5 h-5" />;
      case 'Workshop':
        return <Users className="w-5 h-5" />;
      case 'Achievement':
        return <Trophy className="w-5 h-5" />;
      case 'Urgent':
        return <Bell className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  }, []);

  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'Event':
        return 'text-accent-primary bg-accent-primary/10 border-accent-primary/30';
      case 'Workshop':
        return 'text-accent-secondary bg-accent-secondary/10 border-accent-secondary/30';
      case 'Achievement':
        return 'text-accent-tertiary bg-accent-tertiary/10 border-accent-tertiary/30';
      case 'Urgent':
        return 'text-accent-error bg-accent-error/10 border-accent-error/30';
      default:
        return 'text-accent-success bg-accent-success/10 border-accent-success/30';
    }
  }, []);

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-accent-error';
      case 'medium':
        return 'border-l-accent-warning';
      default:
        return 'border-l-accent-success';
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      type: 'General',
      title: '',
      content: '', // Changed from description to content
      date: '',
      time: '',
      location: '',
      link: '',
      priority: 'medium',
      isActive: true
    });
    setShowForm(false);
    setEditingId(null);
  }, [setFormData, setShowForm, setEditingId]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingId 
        ? `${API_BASE_URL}/${editingId}`
        : API_BASE_URL; // Using centralized API_BASE_URL
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchAnnouncements(); // Refresh the list
        resetForm();
        // TODO: Add success toast notification
      } else {
        console.error('Failed to save announcement:', data.message);
        // TODO: Add error toast notification
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
      // TODO: Add error toast notification
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingId, fetchAnnouncements, resetForm]); // Added dependencies

  const handleEdit = useCallback((announcement: Announcement) => {
    setFormData({
      ...announcement,
      date: announcement.date.split('T')[0] // Format date for input
    });
    setEditingId(announcement._id);
    setShowForm(true);
  }, [setFormData, setEditingId, setShowForm]); // Added dependencies

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return; // Consider a custom modal for better UX

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { // Using centralized API_BASE_URL
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchAnnouncements(); // Refresh the list
        // TODO: Add success toast notification
      } else {
        console.error('Failed to delete announcement:', data.message);
        alert(`Failed to delete: ${data.message}`); // Fallback for error notification
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('An error occurred while deleting the announcement.'); // Fallback for error notification
    }
  }, [fetchAnnouncements]); // Added dependencies

  const toggleActive = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/toggle`, { // Using centralized API_BASE_URL
        method: 'PATCH',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchAnnouncements(); // Refresh the list
        // TODO: Add success toast notification
      } else {
        console.error('Failed to toggle announcement:', data.message);
        // TODO: Add error toast notification
      }
    } catch (error) {
      console.error('Error toggling announcement:', error);
      // TODO: Add error toast notification
    }
  }, [fetchAnnouncements]); // Added dependencies

  const formatDisplayDate = useCallback((isoDateString: string) => {
    try {
      const date = new Date(isoDateString);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return isoDateString;
    }
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 relative min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-accent-primary mx-auto"></div>
            <p className="text-secondary-text mt-4">Loading announcements...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-accent-primary hover:text-accent-primary/80 transition-colors duration-300 font-inter font-medium"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-space font-bold text-primary-text mb-3 md:mb-4">
            <span className="text-accent-primary">Announcements</span> & Updates
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-inter text-secondary-text max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news, events, and important announcements from AppTeam NITH.
          </p>
        </div>

        {/* Add Announcement Button */}
        <div className="flex justify-center mb-8 md:mb-12">
          <GlowButton
            onClick={() => {
              setEditingId(null); // Ensure no editing is active
              resetForm(); // Reset form data for a new announcement
              setShowForm(true);
            }}
            className="group text-sm md:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Announcement
          </GlowButton>
        </div>

        {/* Announcements List */}
        <div className="space-y-4 md:space-y-6">
          {announcements.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-text mx-auto mb-4" />
              <h3 className="text-xl font-space font-semibold text-primary-text mb-2">
                No Announcements Yet
              </h3>
              <p className="text-secondary-text font-inter">
                Create your first announcement to get started.
              </p>
            </GlassCard>
          ) : (
            announcements.map((announcement) => (
              <GlassCard 
                key={announcement._id} 
                className={`p-4 md:p-6 border-l-4 ${getPriorityColor(announcement.priority)} ${
                  !announcement.isActive ? 'opacity-60' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-4">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-inter border ${getTypeColor(announcement.type)}`}>
                        {getTypeIcon(announcement.type)}
                        <span>{announcement.type}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-secondary-text text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-inter">{formatDisplayDate(announcement.date)}</span>
                      </div>
                      
                      {announcement.time && (
                        <div className="flex items-center space-x-2 text-secondary-text text-sm">
                          <Clock className="w-4 h-4" />
                          <span className="font-inter">{announcement.time}</span>
                        </div>
                      )}
                      
                      <span className={`px-2 py-1 text-xs font-inter rounded-full ${
                        announcement.priority === 'high' 
                          ? 'bg-accent-error/20 text-accent-error' 
                          : announcement.priority === 'medium'
                          ? 'bg-accent-warning/20 text-accent-warning'
                          : 'bg-accent-success/20 text-accent-success'
                      }`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg md:text-xl font-space font-semibold text-primary-text mb-3">
                      {announcement.title}
                    </h3>
                    
                    <p className="text-secondary-text font-inter leading-relaxed mb-4 text-sm md:text-base">
                      {announcement.content} {/* Displaying content */}
                    </p>

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {announcement.location && (
                        <div className="flex items-center space-x-2 text-muted-text">
                          <Users className="w-4 h-4" />
                          <span className="font-inter">{announcement.location}</span>
                        </div>
                      )}
                      
                      {announcement.link && (
                        <a
                          href={announcement.link}
                          className="flex items-center space-x-2 text-accent-primary hover:text-accent-primary/80 transition-colors duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-inter">Learn More</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="p-2 text-accent-secondary hover:text-accent-secondary/80 hover:bg-accent-secondary/10 rounded-lg transition-colors duration-300"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => toggleActive(announcement._id)}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        announcement.isActive 
                          ? 'text-accent-success hover:text-accent-success/80 hover:bg-accent-success/10' 
                          : 'text-muted-text hover:text-accent-success hover:bg-accent-success/10'
                      }`}
                      title={announcement.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(announcement._id)}
                      className="p-2 text-accent-error hover:text-accent-error/80 hover:bg-accent-error/10 rounded-lg transition-colors duration-300"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-primary-dark/90 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen flex items-start justify-center p-4 pt-8 pb-8">
              <div className="w-full max-w-2xl">
                <GlassCard className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-space font-bold text-primary-text mb-6">
                    {editingId ? 'Edit Announcement' : 'Add New Announcement'}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Type *</label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        >
                          <option value="General">General</option>
                          <option value="Event">Event</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Achievement">Achievement</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Priority *</label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-secondary-text mb-2">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        placeholder="Enter announcement title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-secondary-text mb-2">Description / Content *</label>
                      <textarea
                        value={formData.content} // Changed to content
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} // Changed to content
                        rows={4}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300 resize-vertical"
                        placeholder="Enter announcement description or content"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Date *</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Time (Optional)</label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Location (Optional)</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          placeholder="Event location"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-inter text-secondary-text mb-2">Link (Optional)</label>
                        <input
                          type="url"
                          value={formData.link}
                          onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="w-4 h-4 text-accent-primary bg-glass-white border-glass-border rounded focus:ring-accent-primary focus:ring-2"
                      />
                      <label htmlFor="isActive" className="text-sm font-inter text-secondary-text">
                        Active (visible to users)
                      </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3 bg-glass-white border border-glass-border text-secondary-text rounded-lg font-inter font-medium hover:bg-hover-bg transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <GlowButton 
                        type="submit"
                        disabled={isSubmitting}
                        className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {editingId ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          <>
                            {editingId ? 'Update' : 'Create'} Announcement
                          </>
                        )}
                      </GlowButton>
                    </div>
                  </form>
                </GlassCard>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(AnnouncementsPage);