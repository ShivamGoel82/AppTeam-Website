import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Trophy, Sparkles, Bell, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

interface Announcement {
  _id: string;
  type: 'Event' | 'Workshop' | 'Achievement' | 'General' | 'Urgent';
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: string;
  updatedAt: string; // Ensure this is present
  customFields?: Record<string, string>; // Ensure this is present for custom fields functionality
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
    description: '',
    date: '',
    time: '',
    location: '',
    link: '',
    priority: 'medium',
    isActive: true,
    customFields: {},
  });
  const [newCustomFieldName, setNewCustomFieldName] = useState('');
  const [newCustomFieldValue, setNewCustomFieldValue] = useState('');


  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://appteam-website-1.onrender.com/api/announcements?isActive=all');
      const data = await res.json();
      if (data.success) {
        setAnnouncements(data.data.announcements);
      } else {
        console.error('Failed to fetch announcements:', data.message);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCustomField = () => {
    if (newCustomFieldName.trim() && newCustomFieldValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        customFields: {
          ...prev.customFields,
          [newCustomFieldName.trim()]: newCustomFieldValue.trim(),
        },
      }));
      setNewCustomFieldName('');
      setNewCustomFieldValue('');
    }
  };

  const handleRemoveCustomField = (fieldName: string) => {
    setFormData((prev) => {
      const updatedCustomFields = { ...prev.customFields };
      delete updatedCustomFields[fieldName];
      return { ...prev, customFields: updatedCustomFields };
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      type: 'General',
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      link: '',
      priority: 'medium',
      isActive: true,
      customFields: {},
    });
    setNewCustomFieldName('');
    setNewCustomFieldValue('');
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const announcementToSubmit = { ...formData };
    if (!announcementToSubmit.time) {
      delete announcementToSubmit.time;
    }
    if (!announcementToSubmit.location) {
      delete announcementToSubmit.location;
    }
    if (!announcementToSubmit.link) {
      delete announcementToSubmit.link;
    }
    if (Object.keys(announcementToSubmit.customFields || {}).length === 0) {
      delete announcementToSubmit.customFields;
    }


    try {
      let res;
      if (editingId) {
        res = await fetch(`https://appteam-website-1.onrender.com/api/announcements/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(announcementToSubmit),
        });
      } else {
        res = await fetch('https://appteam-website-1.onrender.com/api/announcements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(announcementToSubmit),
        });
      }

      const data = await res.json();
      if (data.success) {
        alert(`Announcement ${editingId ? 'updated' : 'created'} successfully!`);
        resetForm();
        fetchAnnouncements();
      } else {
        alert(`Failed to ${editingId ? 'update' : 'create'} announcement: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting announcement:', error);
      alert(`Error ${editingId ? 'updating' : 'creating'} announcement.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const announcementToEdit = announcements.find((ann) => ann._id === id);
    if (announcementToEdit) {
      setEditingId(id);
      setFormData({
        ...announcementToEdit,
        customFields: announcementToEdit.customFields || {},
      });
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const res = await fetch(`https://appteam-website-1.onrender.com/api/announcements/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        alert('Announcement deleted successfully!');
        fetchAnnouncements();
      } else {
        // CORRECTED: Using template literal for alert message
        alert(`Failed to delete announcement: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Error deleting announcement.');
    }
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'low':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Event':
        return <Calendar className="w-5 h-5" />;
      case 'Workshop':
        return <Users className="w-5 h-5" />;
      case 'Achievement':
        return <Trophy className="w-5 h-5" />;
      case 'Urgent':
        return <Bell className="w-5 h-5" />;
      case 'General':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-background via-background to-gray-900 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary-text hover:text-accent-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-space font-bold text-primary-text">
            Manage <span className="text-accent-primary">Announcements</span>
          </h1>
          <GlowButton onClick={() => setShowForm(true)} className="flex items-center px-4 py-2">
            <Plus className="w-5 h-5 mr-2" /> New Announcement
          </GlowButton>
        </div>

        {loading ? (
          <div className="text-center text-primary-text">Loading announcements...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.length === 0 ? (
              <p className="text-primary-text col-span-full text-center">No announcements found. Create one!</p>
            ) : (
              announcements.map((ann) => (
                <GlassCard key={ann._id} className="p-6 relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ann.priority)}`}>
                      {ann.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${ann.isActive ? 'bg-green-500/10 text-green-500 border-green-500/30' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                      {ann.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h3 className="text-xl font-space font-semibold text-primary-text mb-2 flex items-center">
                    {getTypeIcon(ann.type)}
                    <span className="ml-2">{ann.title}</span>
                  </h3>
                  <p className="text-secondary-text text-sm mb-4 line-clamp-3">
                    {ann.description}
                  </p>
                  <div className="text-sm text-muted-text mb-4">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(ann.date).toLocaleDateString()} {ann.time && `at ${ann.time}`}</span>
                    </div>
                    {ann.location && (
                      <div className="flex items-center mb-1">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{ann.location}</span>
                      </div>
                    )}
                    {ann.link && (
                      <div className="flex items-center mb-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <a href={ann.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-accent-primary">
                          View Link
                        </a>
                      </div>
                    )}
                    {ann.customFields && Object.keys(ann.customFields).length > 0 && (
                      <div className="mt-2 text-xs text-primary-text/70">
                        <strong>Custom Fields:</strong>
                        <ul className="list-disc list-inside ml-2">
                          {Object.entries(ann.customFields).map(([key, value]) => (
                            <li key={key}>{key}: {value}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 right-4">
                    <button
                      onClick={() => handleEdit(ann._id)}
                      className="p-2 bg-accent-secondary text-white rounded-full hover:bg-accent-secondary/90 transition-colors duration-300"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ann._id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
            <div className="relative w-full max-w-2xl mx-auto my-8">
              <div className="p-1 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-xl">
                <GlassCard className="p-8 relative">
                  <h2 className="text-2xl font-space font-bold text-primary-text mb-6">
                    {editingId ? 'Edit Announcement' : 'Create New Announcement'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="title" className="block text-primary-text text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title || ''}
                          onChange={handleChange}
                          placeholder="Announcement Title"
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-primary-text text-sm font-medium mb-2">Type</label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type || 'General'}
                          onChange={handleChange}
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
                    </div>

                    <div className="mb-6">
                      <label htmlFor="description" className="block text-primary-text text-sm font-medium mb-2">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        placeholder="Detailed description of the announcement"
                        rows={4}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        required
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="date" className="block text-primary-text text-sm font-medium mb-2">Date</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date ? formData.date.split('T')[0] : ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-primary-text text-sm font-medium mb-2">Time (Optional)</label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="location" className="block text-primary-text text-sm font-medium mb-2">Location (Optional)</label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location || ''}
                          onChange={handleChange}
                          placeholder="e.g., Auditorium, Online"
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="link" className="block text-primary-text text-sm font-medium mb-2">External Link (Optional)</label>
                        <input
                          type="url"
                          id="link"
                          name="link"
                          value={formData.link || ''}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="priority" className="block text-primary-text text-sm font-medium mb-2">Priority</label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority || 'medium'}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="mb-6 border border-glass-border rounded-lg p-4">
                      <h3 className="text-lg font-space font-semibold text-primary-text mb-4">Add Custom Fields</h3>
                      <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Field Name (e.g., Department)"
                          value={newCustomFieldName}
                          onChange={(e) => setNewCustomFieldName(e.target.value)}
                          className="flex-1 px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        />
                        <input
                          type="text"
                          placeholder="Field Value (e.g., CSE)"
                          value={newCustomFieldValue}
                          onChange={(e) => setNewCustomFieldValue(e.target.value)}
                          className="flex-1 px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                        />
                        <GlowButton
                          type="button"
                          onClick={handleAddCustomField}
                          disabled={!newCustomFieldName.trim() || !newCustomFieldValue.trim()}
                          className="px-6 py-3 flex-shrink-0"
                        >
                          Add Field
                        </GlowButton>
                      </div>

                      {formData.customFields && Object.keys(formData.customFields).length > 0 && (
                        <div>
                          <p className="text-primary-text text-sm font-medium mb-2">Current Custom Fields:</p>
                          <ul className="space-y-2">
                            {Object.entries(formData.customFields).map(([key, value]) => (
                              <li key={key} className="flex items-center justify-between bg-glass-white border border-glass-border rounded-lg px-4 py-2 text-primary-text text-sm">
                                <span><strong>{key}:</strong> {value}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCustomField(key)}
                                  className="text-red-500 hover:text-red-600 transition-colors duration-300"
                                  title="Remove field"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive || false}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-accent-primary rounded border-gray-300 focus:ring-accent-primary"
                      />
                      <label htmlFor="isActive" className="text-primary-text text-sm font-medium">
                        Is Active (Display in News Section)
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