import React, { useEffect, useState } from 'react';
import { Calendar, ExternalLink, Sparkles, Clock, Users, Trophy, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';
import axios from 'axios';

interface Announcement {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
  isActive?: boolean;
  createdAt?: string;
}

const hardcodedAnnouncements: Announcement[] = [
  {
    id: 'static-1',
    type: 'Event',
    title: 'HackOnHills 7.0 Registration Opens',
    description: 'Get ready for the biggest hackathon of the year! Registration for HackOnHills 7.0 is now open. Join us for 48 hours of innovation, coding, and networking.',
    date: '2025-03-15',
    time: '10:00 AM',
    location: 'NIT Hamirpur',
    link: '#',
    priority: 'high'
  },
  {
    id: 'static-2',
    type: 'Workshop',
    title: 'Full-Stack Development Bootcamp',
    description: 'Join our comprehensive 8-week bootcamp covering React, Node.js, MongoDB, and deployment strategies. Limited seats available.',
    date: '2025-03-01',
    time: '2:00 PM',
    location: 'Online + Offline',
    link: '#',
    priority: 'medium'
  },
  {
    id: 'static-3',
    type: 'Achievement',
    title: 'AppTeam Wins Best Innovation Award',
    description: 'We are proud to announce that AppTeam has been recognized for outstanding innovation in mobile app development at the institute level.',
    date: '2025-02-20',
    priority: 'medium'
  }
];

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('app-team-website-1onrender.com/api/announcements');
        const activeBackendAnnouncements: Announcement[] = response.data.filter(
          (a: Announcement) => a.isActive
        );
        setNewsItems([...hardcodedAnnouncements, ...activeBackendAnnouncements]);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setNewsItems(hardcodedAnnouncements); // Fallback to static
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (newsItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [newsItems]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Event':
        return <Trophy className="w-6 h-6" />;
      case 'Workshop':
        return <Users className="w-6 h-6" />;
      case 'Achievement':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'Event':
        return 'accent-blue';
      case 'Workshop':
        return 'accent-purple';
      case 'Achievement':
        return 'accent-teal';
      case 'Urgent':
        return 'accent-error';
      default:
        return 'accent-success';
    }
  };

  if (!newsItems.length) return null;

  const current = newsItems[currentIndex];
  const color = getColor(current.type || 'General');

  return (
    <section className="py-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        <GlassCard className={`p-6 md:p-8 border-l-4 border-${color} bg-gradient-to-r from-${color}/10 to-${color}/5 overflow-hidden relative group`}>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              <div className="flex-1">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 bg-${color}/20 rounded-full flex items-center justify-center`}>
                      <div className={`text-${color}`}>
                        {getIcon(current.type)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`bg-${color}/20 text-${color} px-3 py-1 rounded-full text-sm font-inter font-medium border border-${color}/30`}>
                        {current.type}
                      </span>
                      <div className="flex items-center text-primary-text text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="font-inter">{new Date(current.date).toDateString()}</span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-3">
                      {current.title}
                    </h3>
                    <p className="text-primary-text/80 font-inter leading-relaxed mb-4">
                      {current.description}
                    </p>
                  </div>
                </div>

                {/* Extra Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {current.location && (
                    <div className="text-center p-3 bg-glass-white/50 rounded-lg border border-glass-border">
                      <div className="text-primary-text/60 text-xs font-inter uppercase tracking-wide mb-1">Location</div>
                      <div className="text-primary-text font-space font-medium text-sm">{current.location}</div>
                    </div>
                  )}
                  {current.time && (
                    <div className="text-center p-3 bg-glass-white/50 rounded-lg border border-glass-border">
                      <div className="text-primary-text/60 text-xs font-inter uppercase tracking-wide mb-1">Time</div>
                      <div className="text-primary-text font-space font-medium text-sm">{current.time}</div>
                    </div>
                  )}
                  {current.priority && (
                    <div className="text-center p-3 bg-glass-white/50 rounded-lg border border-glass-border">
                      <div className="text-primary-text/60 text-xs font-inter uppercase tracking-wide mb-1">Priority</div>
                      <div className="text-primary-text font-space font-medium text-sm capitalize">{current.priority}</div>
                    </div>
                  )}
                </div>

                {/* Learn More */}
                {current.link && (
                  <a
                    href={current.link}
                    className={`inline-flex items-center text-${color} hover:text-${color}/80 transition-colors duration-300 font-inter font-medium group`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                )}
              </div>

              {/* Dots Navigation */}
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  {newsItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? `bg-${color} scale-125`
                          : 'bg-primary-text/30 hover:bg-primary-text/50'
                      }`}
                      aria-label={`View news item ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 w-full bg-glass-border rounded-full h-1 overflow-hidden">
              <div 
                className={`h-full bg-${color} transition-all duration-300 animate-shimmer`}
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)`,
                  backgroundSize: '200% 100%',
                  width: `${((currentIndex + 1) / newsItems.length) * 100}%`
                }}
              />
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default NewsSection;
