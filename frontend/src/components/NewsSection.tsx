import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Sparkles, Clock, MapPin, Users, Trophy, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

const NewsSection: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const newsItems = [
    {
      id: 1,
      type: 'Major Event',
      title: 'HackOnHills 7.0 - Registration Opens Soon!',
      description: 'Get ready for the biggest hackathon of the year! HackOnHills 7.0 is coming with exciting challenges, amazing prizes, and opportunities to showcase your innovation.',
      date: 'Coming Soon 2025',
      icon: <Trophy className="w-6 h-6" />,
      color: 'accent-blue',
      bgGradient: 'from-accent-blue/10 to-accent-purple/5',
      link: '#',
      details: {
        duration: '48 Hours',
        location: 'NIT Hamirpur',
        participants: '500+ Expected',
        prizes: '₹2L+ Prize Pool'
      }
    },
    {
      id: 2,
      type: 'Workshop Series',
      title: 'Full-Stack Development Bootcamp',
      description: 'Join our comprehensive 8-week bootcamp covering React, Node.js, MongoDB, and deployment strategies. Perfect for beginners and intermediate developers.',
      date: 'March 2025',
      icon: <Users className="w-6 h-6" />,
      color: 'accent-purple',
      bgGradient: 'from-accent-purple/10 to-accent-teal/5',
      link: '#workshops',
      details: {
        duration: '8 Weeks',
        location: 'Online + Offline',
        participants: '50 Seats',
        level: 'Beginner-Friendly'
      }
    },
    {
      id: 3,
      type: 'Achievement',
      title: 'AppTeam Wins Best Innovation Award',
      description: 'Our team has been recognized for outstanding innovation in mobile app development and our contribution to the tech community at NITH.',
      date: 'February 2025',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'accent-teal',
      bgGradient: 'from-accent-teal/10 to-success-green/5',
      link: '#achievements',
      details: {
        category: 'Innovation',
        level: 'Institute Level',
        recognition: 'Best Team',
        impact: 'Community'
      }
    }
  ];

  // Auto-rotate news items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  const currentNews = newsItems[currentNewsIndex];

  return (
    <section className="py-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        <GlassCard className={`p-6 md:p-8 border-l-4 border-${currentNews.color} bg-gradient-to-r ${currentNews.bgGradient} overflow-hidden relative group`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-blue to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-purple to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 bg-${currentNews.color}/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`text-${currentNews.color}`}>
                        {currentNews.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`bg-${currentNews.color}/20 text-${currentNews.color} px-3 py-1 rounded-full text-sm font-inter font-medium border border-${currentNews.color}/30`}>
                        {currentNews.type}
                      </span>
                      <div className="flex items-center text-primary-text text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="font-inter">{currentNews.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-3 group-hover:text-accent-blue transition-colors duration-300">
                      {currentNews.title}
                    </h3>
                    <p className="text-primary-text/80 font-inter leading-relaxed mb-4">
                      {currentNews.description}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {Object.entries(currentNews.details).map(([key, value], index) => (
                    <div key={index} className="text-center p-3 bg-glass-white/50 rounded-lg border border-glass-border">
                      <div className="text-primary-text/60 text-xs font-inter uppercase tracking-wide mb-1">
                        {key}
                      </div>
                      <div className="text-primary-text font-space font-medium text-sm">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={currentNews.link}
                    className={`inline-flex items-center text-${currentNews.color} hover:text-${currentNews.color}/80 transition-colors duration-300 font-inter font-medium group/link`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                  
                  {currentNews.id === 1 && (
                    <button className={`px-4 py-2 bg-${currentNews.color}/10 hover:bg-${currentNews.color}/20 text-${currentNews.color} border border-${currentNews.color}/30 rounded-lg font-inter font-medium transition-colors duration-300 text-sm`}>
                      Notify Me
                    </button>
                  )}
                </div>
              </div>

              {/* News Navigation */}
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  {newsItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentNewsIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentNewsIndex
                          ? `bg-${currentNews.color} scale-125`
                          : 'bg-primary-text/30 hover:bg-primary-text/50'
                      }`}
                      aria-label={`View news item ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 w-full bg-glass-border rounded-full h-1 overflow-hidden">
              <div 
                className={`h-full bg-${currentNews.color} transition-all duration-300 animate-shimmer`}
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)`,
                  backgroundSize: '200% 100%',
                  width: `${((currentNewsIndex + 1) / newsItems.length) * 100}%`
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