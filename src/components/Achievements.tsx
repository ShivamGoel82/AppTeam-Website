import React, { useEffect, useRef } from 'react';
import { Trophy, Award, Star, Target, Calendar, Users, ChevronLeft, ChevronRight, Medal, Crown, Zap } from 'lucide-react';
import GlassCard from './GlassCard';

const Achievements: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Achievement Gallery Images
  const achievementGallery = [
    {
      id: 1,
      title: 'HOH 6.0',
      image: '/img9.jpeg',
      description: 'Successfully organized HackOnHills-6.0.',
      event: 'HOH 6.0',
      year: '2025',
      type: 'Competition Organized'
    },
    {
      id: 2,
      title: 'Our Team',
      image: '/img12.jpeg',
      description: 'Our whole team in one frame.',
      event: 'Photo shoot',
      year: '2025',
      type: 'Recognition'
    },
    {
      id: 3,
      title: 'Innovation Award',
      image: '/img5.jpeg',
      description: 'Best Techno Innovation Team.',
      event: 'Tech Innovation',
      year: '2025',
      type: 'Innovation'
    },
    {
      id: 4,
      title: 'Leadership Award',
      image: '/img11.jpeg',
      description: 'Organized standout tech initiatives.',
      event: 'Leadership',
      year: '2025',
      type: 'Leadership'
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Team Formation',
      description: 'CodeCraft Collective was founded with a vision to excel in competitive programming and app development.',
      color: 'border-electric-blue'
    },
    {
      year: '2020',
      title: 'HackOnHills Announced',
      description: 'Announced our first hackathon and successfully organized it, marking our entry in finding solutions to real-world problems.',
      color: 'border-neon-magenta'
    },
    {
      year: '2025',
      title: 'Triple Crown',
      description: 'Achieved success in HOH 6.0, Nimbus, and Hillfair, cementing our position as elite developers.',
      color: 'border-electric-blue'
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = window.innerWidth < 768 ? 0.4 : 0.8; // Slower on mobile
    const scrollDelay = window.innerWidth < 768 ? 60 : 40; // Slower on mobile
    let isScrolling = true;

    const autoScroll = () => {
      if (scrollContainer && isScrolling) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset scroll when reaching the end
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
      }
    };

    const interval = setInterval(autoScroll, scrollDelay);

    // Pause auto-scroll on hover/touch
    const handleMouseEnter = () => { isScrolling = false; };
    const handleMouseLeave = () => { isScrolling = true; };
    const handleTouchStart = () => { isScrolling = false; };
    const handleTouchEnd = () => { 
      setTimeout(() => { isScrolling = true; }, 2000); // Resume after 2 seconds
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      clearInterval(interval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 350;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Competition Organized':
      case 'Recognition':
      case 'Innovation':
      case 'Leadership':
        return 'text-neon-magenta bg-neon-magenta/20 border-neon-magenta/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <section id="achievements" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-jetbrains font-bold text-white mb-4 md:mb-6">
            Our <span className="text-vibrant-green">Achievements</span>
          </h2>
          <p className="text-lg md:text-xl font-inter text-gray-300 max-w-3xl mx-auto px-4">
            Celebrating our journey of excellence, innovation, and competitive success
            in the world of app development and technology competitions.
          </p>
        </div>

        {/* Achievement Gallery */}
        <div className="relative mb-12 md:mb-16">
          <GlassCard className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
              <h3 className="text-xl md:text-2xl font-jetbrains font-semibold text-white">
                Achievement <span className="text-electric-blue">Gallery</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 md:p-3 bg-electric-blue/20 hover:bg-electric-blue/30 border border-electric-blue/30 rounded-lg transition-all duration-300 group active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-electric-blue group-hover:scale-110 transition-transform duration-300" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 md:p-3 bg-electric-blue/20 hover:bg-electric-blue/30 border border-electric-blue/30 rounded-lg transition-all duration-300 group active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-electric-blue group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Scrolling Gallery */}
            <div
              ref={scrollRef}
              className="flex space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth'
              }}
            >
              {achievementGallery.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex-shrink-0 w-72 md:w-96 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl border border-glass-border bg-cyber-dark/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-electric-blue/20">
                    {/* Achievement Image */}
                    <div className="relative h-48 md:h-72 overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent opacity-70"></div>

                      {/* Achievement Type Badge */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-jetbrains border backdrop-blur-sm ${getTypeColor(achievement.type)}`}>
                          {achievement.type}
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <div className="bg-cyber-dark/70 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 border border-glass-border">
                          <span className="text-electric-blue font-jetbrains text-xs">
                            {achievement.year}
                          </span>
                        </div>
                      </div>

                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Achievement Details */}
                    <div className="p-4 md:p-6">
                      <h4 className="text-lg md:text-xl font-jetbrains font-semibold text-white mb-2 md:mb-3 group-hover:text-electric-blue transition-colors duration-300">
                        {achievement.title}
                      </h4>

                      <p className="text-gray-300 font-inter text-sm leading-relaxed mb-3 md:mb-4">
                        {achievement.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-jetbrains text-neon-magenta">
                          {achievement.event}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Auto-scroll indicator */}
            <div className="flex justify-center mt-4 md:mt-6">
              <div className="flex items-center space-x-2 text-gray-400 text-xs md:text-sm font-inter">
                <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse"></div>
                <span className="hidden md:inline">Auto-scrolling gallery • Hover to pause</span>
                <span className="md:hidden">Auto-scrolling • Touch to pause</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Timeline */}
        <GlassCard className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-jetbrains font-semibold text-white mb-6 md:mb-8 text-center">
            Our <span className="text-electric-blue">Journey</span>
          </h3>
          <div className="space-y-6 md:space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 md:space-x-4">
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${event.color} bg-cyber-dark mt-2 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-3 mb-2">
                    <span className="text-base md:text-lg font-jetbrains font-semibold text-white">
                      {event.title}
                    </span>
                    <span className="text-sm font-jetbrains text-gray-400 bg-cyber-gray/50 px-2 py-1 rounded w-fit">
                      {event.year}
                    </span>
                  </div>
                  <p className="text-gray-300 font-inter leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }

        /* Smooth scrolling for touch devices */
        @media (max-width: 768px) {
          .scrollbar-hide {
            scroll-snap-type: x mandatory;
          }
          
          .scrollbar-hide > div {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
};

export default Achievements;