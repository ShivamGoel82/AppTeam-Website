import React, { useEffect, useRef, useState } from 'react';
import GlassCard from './GlassCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Achievements: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  // FIX: Use number for browser timers, not NodeJS.Timeout
  const autoScrollIntervalRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

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

  // Duplicate gallery for seamless looping
  const duplicatedGallery = [...achievementGallery, ...achievementGallery];

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

  // Detect mobile and setup auto-scroll
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll functionality (with seamless looping)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    const card = scrollContainer.querySelector('div.flex-shrink-0') as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 16 : 400; // 16px gap
    const scrollStep = isMobile ? cardWidth * 0.08 : 12;
    const scrollDelay = 16; // ~60fps

    if (isAutoScrolling) {
      autoScrollIntervalRef.current = window.setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollStep;
          // If we've scrolled past the first set, reset instantly to the start of the first set
          if (scrollContainer.scrollLeft >= cardWidth * achievementGallery.length) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, scrollDelay);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, isMobile, achievementGallery.length]);

  // Event handlers
  const handleInteractionStart = () => {
    setIsAutoScrolling(false);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);
  };

  // Setup event listeners
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Mouse events for desktop
    scrollContainer.addEventListener('mouseenter', handleInteractionStart);
    scrollContainer.addEventListener('mouseleave', handleInteractionEnd);

    // Touch events for mobile
    scrollContainer.addEventListener('touchstart', handleInteractionStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleInteractionEnd, { passive: true });

    // Scroll events
    scrollContainer.addEventListener('scroll', handleInteractionStart, { passive: true });

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleInteractionStart);
        scrollContainer.removeEventListener('mouseleave', handleInteractionEnd);
        scrollContainer.removeEventListener('touchstart', handleInteractionStart);
        scrollContainer.removeEventListener('touchend', handleInteractionEnd);
        scrollContainer.removeEventListener('scroll', handleInteractionStart);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('div.flex-shrink-0') as HTMLElement;
      const scrollAmount = card ? card.offsetWidth + 16 : 400;
      if (scrollRef.current.scrollLeft <= 0) {
        scrollRef.current.scrollLeft = card.offsetWidth * achievementGallery.length;
      }
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      handleInteractionStart();
      handleInteractionEnd();
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('div.flex-shrink-0') as HTMLElement;
      const scrollAmount = card ? card.offsetWidth + 16 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(() => {
        if (
          scrollRef.current &&
          scrollRef.current.scrollLeft >= card.offsetWidth * achievementGallery.length
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }, 400);
      handleInteractionStart();
      handleInteractionEnd();
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
          <p className="text-base md:text-xl font-inter text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrating our journey of excellence, innovation, and competitive success
            in the world of app development and technology competitions.
          </p>
        </div>

        {/* Achievement Gallery */}
        <div className="relative mb-12 md:mb-16">
          <GlassCard className="p-4 md:p-8">
            {/* Gallery Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <h3 className="text-xl md:text-2xl font-jetbrains font-semibold text-white">
                Achievement <span className="text-electric-blue">Gallery</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 md:p-3 bg-electric-blue/20 hover:bg-electric-blue/30 active:bg-electric-blue/40 border border-electric-blue/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-electric-blue group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 md:p-3 bg-electric-blue/20 hover:bg-electric-blue/30 active:bg-electric-blue/40 border border-electric-blue/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-electric-blue group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Scrolling Gallery */}
            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {duplicatedGallery.map((achievement, idx) => (
                <div
                  key={achievement.id + '-' + idx}
                  className="flex-shrink-0 w-80 sm:w-96 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl border border-glass-border bg-cyber-dark/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-electric-blue/20">
                    {/* Achievement Image */}
                    <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent opacity-70"></div>

                      {/* Achievement Type Badge */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-jetbrains border backdrop-blur-sm ${getTypeColor(achievement.type)}`}>
                          <span className="hidden sm:inline">{achievement.type}</span>
                          <span className="sm:hidden">{achievement.type.split(' ')[0]}</span>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Achievement Details */}
                    <div className="p-4 md:p-6">
                      <h4 className="text-lg md:text-xl font-jetbrains font-semibold text-white mb-2 md:mb-3 group-hover:text-electric-blue transition-colors duration-300 line-clamp-1">
                        {achievement.title}
                      </h4>

                      <p className="text-gray-300 font-inter text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                        {achievement.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-jetbrains text-neon-magenta truncate">
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
                <div className={`w-2 h-2 bg-electric-blue rounded-full transition-all duration-300 ${isAutoScrolling ? 'animate-pulse scale-110' : 'opacity-50'}`}></div>
                <span className="hidden sm:inline">
                  {isAutoScrolling ? 'Auto-scrolling gallery • Hover to pause' : 'Auto-scroll paused • Will resume shortly'}
                </span>
                <span className="sm:hidden">
                  {isAutoScrolling ? 'Auto-scrolling' : 'Paused'}
                </span>
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
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
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }

        .touch-manipulation {
          touch-action: manipulation;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced mobile scrolling */
        @media (max-width: 768px) {
          .scrollbar-hide {
            scroll-snap-type: x proximity;
            -webkit-overflow-scrolling: touch;
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