import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import { Trophy, Users, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

interface Announcement {
  _id: string; // Changed from 'id' to '_id' to match backend
  type: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  icon?: JSX.Element;
  color?: string;
  bgGradient?: string;
  link?: string;
  details?: Record<string, string>;
  isActive?: boolean;
}

const defaultNewsItems: Announcement[] = [
  {
    _id: 'default-1', // Changed from 'id' to '_id'
    type: 'Major Event',
    title: 'HackOnHills 7.0 - Registration Opens Soon!',
    description:
      'Get ready for the biggest hackathon of the year! HackOnHills 7.0 is coming with exciting challenges, amazing prizes, and opportunities to showcase your innovation.',
    date: 'Coming Soon 2025',
    icon: <Trophy className="w-6 h-6" />,
    color: 'accent-primary',
    bgGradient: 'from-accent-primary/10 to-accent-secondary/5',
    link: '#',
    details: {
      duration: '48 Hours',
      location: 'NIT Hamirpur',
      participants: '500+ Expected',
      prizes: '₹2L+ Prize Pool'
    }
  },
  {
    _id: 'default-2', // Changed from 'id' to '_id'
    type: 'Workshop Series',
    title: 'Full-Stack Development Bootcamp',
    description:
      'Join our comprehensive 8-week bootcamp covering React, Node.js, MongoDB, and deployment strategies. Perfect for beginners and intermediate developers.',
    date: 'March 2025',
    icon: <Users className="w-6 h-6" />,
    color: 'accent-secondary',
    bgGradient: 'from-accent-secondary/10 to-accent-tertiary/5',
    link: '#workshops',
    details: {
      duration: '8 Weeks',
      location: 'Online + Offline',
      participants: '50 Seats',
      level: 'Beginner-Friendly'
    }
  },
  {
    _id: 'default-3', // Changed from 'id' to '_id'
    type: 'Achievement',
    title: 'AppTeam Wins Best Innovation Award',
    description:
      'Our team has been recognized for outstanding innovation in mobile app development and our contribution to the tech community at NITH.',
    date: 'February 2025',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'accent-tertiary',
    bgGradient: 'from-accent-tertiary/10 to-accent-success/5',
    link: '#achievements',
    details: {
      category: 'Innovation',
      level: 'Institute Level',
      recognition: 'Best Team',
      impact: 'Community'
    }
  }
];

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<Announcement[]>(defaultNewsItems);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const axiosInstance = (axios as any).default || axios; 
    
    axiosInstance.get('https://appteam-website-1.onrender.com/api/announcements?isActive=all')
      .then((res: { data: { data: { announcements: never[]; }; }; }) => {
        // CORRECTED: Accessing 'announcements' array from 'res.data.data'
        const apiAnnouncements: Announcement[] = res.data.data.announcements || [];
        
        console.log('API Announcements (before filter):', apiAnnouncements);

        const active = apiAnnouncements.filter((a: Announcement) => a.isActive);
        
        console.log('Active Announcements (after filter):', active);

        const formatted = active.map((item: Announcement) => ({ // Removed index as it's not needed for id
          ...item,
          _id: item._id, // Use the backend's _id
          color: 'accent-success', // API fetched items will use accent-success
          bgGradient: 'from-accent-success/10 to-accent-success/5',
          icon: <Sparkles className="w-6 h-6" />
        }));

        setNewsItems([...defaultNewsItems, ...formatted]);
      })
      .catch((err: any) => {
        console.error('Error fetching announcements in NewsSection:', err);
        setNewsItems(defaultNewsItems);
      });
  }, []);

  useEffect(() => {
    if (newsItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [newsItems]);

  const current = newsItems[currentIndex];

  return (
    <section className="py-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        <GlassCard
          className={`p-6 md:p-8 border-l-4 border-${current.color} bg-gradient-to-r ${current.bgGradient} overflow-hidden relative`}
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              <div className="flex-1">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 bg-${current.color}/20 rounded-full flex items-center justify-center text-${current.color}`}
                    >
                      {current.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`bg-${current.color}/20 text-${current.color} px-3 py-1 rounded-full text-sm font-inter font-medium border border-${current.color}/30`}
                      >
                        {current.type}
                      </span>
                      <div className="flex items-center text-primary-text text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="font-inter">
                          {current.date && current.time
                            ? `${new Date(current.date).toLocaleDateString()} at ${current.time}` // Format date
                            : current.date ? new Date(current.date).toLocaleDateString() : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-3">
                      {current.title}
                    </h3>
                    <p className="text-primary-text/80 font-inter leading-relaxed mb-4">
                      {current.description} {/* Changed from 'content' to 'description' */}
                    </p>
                  </div>
                </div>

                {/* Details Section */}
                {current.details && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(current.details).map(([label, value], i) => (
                      <div
                        key={i}
                        className="text-center p-3 bg-glass-white/50 rounded-lg border border-glass-border"
                      >
                        <div className="text-primary-text/60 text-xs font-inter uppercase tracking-wide mb-1">
                          {label}
                        </div>
                        <div className="text-primary-text font-space font-medium text-sm">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {current.link && (
                  <a
                    href={current.link}
                    className={`inline-flex items-center text-${current.color} hover:text-${current.color}/80 transition-colors duration-300 font-inter font-medium group`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                )}
              </div>

              {/* Dots */}
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  {newsItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                          ? `bg-${current.color} scale-125`
                          : 'bg-primary-text/30 hover:bg-primary-text/50'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 w-full bg-glass-border rounded-full h-1 overflow-hidden">
              <div
                className={`h-full bg-${current.color}`}
                style={{
                  width: `${((currentIndex + 1) / newsItems.length) * 100}%`,
                  transition: 'width 500ms ease'
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