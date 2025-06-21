import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Trophy, Sparkles, Bell, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';

interface Announcement {
  id: string;
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
}

const AnnouncementsPage: React.FC = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    type: 'General',
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    link: '',
    priority: 'medium',
    isActive: true
  });

  // Sample announcements data
  useEffect(() => {
    const sampleAnnouncements: Announcement[] = [
      {
        id: '1',
        type: 'Event',
        title: 'HackOnHills 7.0 Registration Opens',
        description: 'Get ready for the biggest hackathon of the year! Registration for HackOnHills 7.0 is now open. Join us for 48 hours of innovation, coding, and networking.',
        date: '2025-03-15',
        time: '10:00 AM',
        location: 'NIT Hamirpur',
        link: '#',
        priority: 'high',
        isActive: true,
        createdAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '2',
        type: 'Workshop',
        title: 'Full-Stack Development Bootcamp',
        description: 'Join our comprehensive 8-week bootcamp covering React, Node.js, MongoDB, and deployment strategies. Limited seats available.',
        date: '2025-03-01',
        time: '2:00 PM',
        location: 'Online + Offline',
        priority: 'medium',
        isActive: true,
        createdAt: '2025-01-10T14:00:00Z'
      },
      {
        id: '3',
        type: 'Achievement',
        title: 'AppTeam Wins Best Innovation Award',
        description: 'We are proud to announce that AppTeam has been recognized for outstanding innovation in mobile app development at the institute level.',
        date: '2025-02-20',
        priority: 'medium',
        isActive: true,
        createdAt: '2025-01-08T09:00:00Z'
      },
      {
        id: '4',
        type: 'Urgent',
        title: 'Team Meeting - Project Updates',
        description: 'Mandatory team meeting to discuss ongoing projects and upcoming deadlines. All core members must attend.',
        date: '2025-01-18',
        time: '6:00 PM',
        location: 'Conference Room A',
        priority: 'high',
        isActive: true,
        createdAt: '2025-01-16T18:00:00Z'
      }
    ];
    setAnnouncements(sampleAnnouncements);
  }, []);

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
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
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
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-accent-error';
      case 'medium':
        return 'border-l-accent-warning';
      default:
        return 'border-l-accent-success';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing announcement
      setAnnouncements(prev => prev.map(ann => 
        ann.id === editingId 
          ? { ...ann, ...formData, id: editingId }
          : ann
      ));
    } else {
      // Add new announcement
      const newAnnouncement: Announcement = {
        ...formData as Announcement,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    }
    
    // Reset form
    setFormData({
      type: 'General',
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      link: '',
      priority: 'medium',
      isActive: true
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData(announcement);
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
  };

  const toggleActive = (id: string) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
    ));
  };

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
            onClick={() => setShowForm(true)}
            className="group text-sm md:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Announcement
          </GlowButton>
        </div>

        {/* Announcements List */}
        <div className="space-y-4 md:space-y-6">
          {announcements.map((announcement) => (
            <GlassCard 
              key={announcement.id} 
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
                      <span className="font-inter">{new Date(announcement.date).toLocaleDateString()}</span>
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
                    {announcement.description}
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
                    onClick={() => toggleActive(announcement.id)}
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
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-accent-error hover:text-accent-error/80 hover:bg-accent-error/10 rounded-lg transition-colors duration-300"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
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
                      <label className="block text-sm font-inter text-secondary-text mb-2">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300 resize-vertical"
                        placeholder="Enter announcement description"
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
                        onClick={() => {
                          setShowForm(false);
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
                            isActive: true
                          });
                        }}
                        className="px-6 py-3 bg-glass-white border border-glass-border text-secondary-text rounded-lg font-inter font-medium hover:bg-hover-bg transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <GlowButton type="submit">
                        {editingId ? 'Update' : 'Create'} Announcement
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