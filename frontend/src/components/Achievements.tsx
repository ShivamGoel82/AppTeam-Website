import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import GlassCard from "./GlassCard";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

const Achievements: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const pauseTimeoutRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // Memoize achievement data to prevent re-renders
  const achievementGallery = useMemo(() => [
    {
      id: 1,
      title: "HOH 6.0",
      image: "/img9.jpeg",
      description: "Successfully organized HackOnHills-6.0.",
      event: "HOH 6.0",
      year: "2025",
      type: "Competition Organized",
    },
    {
      id: 2,
      title: "Our Team",
      image: "/img12.jpeg",
      description: "Our whole team in one frame.",
      event: "Photo shoot",
      year: "2025",
      type: "Recognition",
    },
    {
      id: 3,
      title: "Innovation Award",
      image: "/img5.jpeg",
      description: "Best Techno Innovation Team.",
      event: "Tech Innovation",
      year: "2025",
      type: "Innovation",
    },
    {
      id: 4,
      title: "Leadership Award",
      image: "/img11.jpeg",
      description: "Organized standout tech initiatives.",
      event: "Leadership",
      year: "2025",
      type: "Leadership",
    },
  ], []);

  // Optimized gallery memories with lazy loading
  const galleryMemories = useMemo(() => [
    {
      id: 2,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (3).jpeg",
      title: "Workshop Moments",
      description: "Learning and sharing knowledge together",
    },
    {
      id: 3,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (4).jpeg",
      title: "Celebration Time",
      description: "Celebrating our achievements and milestones",
    },
    {
      id: 4,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (6).jpeg",
      title: "Project Showcase",
      description: "Presenting our innovative projects",
    },
    {
      id: 5,
      image: "/WhatsApp Image 2025-06-12 at 11.47.39 AM (7).jpeg",
      title: "Coding Sessions",
      description: "Collaborative coding and problem solving",
    },
    {
      id: 7,
      image: "/img12.jpeg",
      title: "Complete Team",
      description: "Our amazing team together",
    },
    {
      id: 8,
      image: "/img5.jpeg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 9,
      image: "/IMG-1.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 10,
      image: "/IMG-2.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 11,
      image: "/IMG-3.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 12,
      image: "/IMG-4.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 13,
      image: "/IMG-5.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 14,
      image: "/IMG-6.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    },
    {
      id: 15,
      image: "/IMG-7.jpg",
      title: "Award Ceremony",
      description: "Receiving innovation awards",
    }
  ], []);

  // Duplicate gallery for seamless looping
  const duplicatedGallery = useMemo(() => [...achievementGallery, ...achievementGallery], [achievementGallery]);

  // Optimized mobile detection
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Optimized auto-scroll with better performance
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isAutoScrolling) return;

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const card = scrollContainer.querySelector("div.flex-shrink-0") as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 16 : 400;
    const scrollStep = isMobile ? 0.5 : 1;
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    let lastTimestamp = 0;
    const frameDelay = isMobile ? (isLowEnd ? 20 : 16) : (isLowEnd ? 12 : 8);

    function autoScroll(timestamp: number) {
      if (!scrollContainer) return;

      if (timestamp - lastTimestamp > frameDelay) {
        scrollContainer.scrollLeft += scrollStep;

        if (scrollContainer.scrollLeft >= cardWidth * achievementGallery.length) {
          scrollContainer.scrollLeft -= cardWidth * achievementGallery.length;
        }

        lastTimestamp = timestamp;
      }

      animationRef.current = requestAnimationFrame(autoScroll);
    }

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoScrolling, isMobile, achievementGallery.length]);

  // Optimized pause/resume handlers
  const handlePause = useCallback(() => {
    setIsAutoScrolling(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  }, []);

  const handleResume = useCallback(() => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(
      () => setIsAutoScrolling(true),
      1500
    );
  }, []);

  // Attach event listeners for pause/resume
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (isMobile) {
      const onTouchStart = () => handlePause();
      const onTouchEnd = () => handleResume();
      scrollContainer.addEventListener("touchstart", onTouchStart, { passive: true });
      scrollContainer.addEventListener("touchend", onTouchEnd, { passive: true });
      return () => {
        scrollContainer.removeEventListener("touchstart", onTouchStart);
        scrollContainer.removeEventListener("touchend", onTouchEnd);
      };
    } else {
      const onMouseEnter = () => handlePause();
      const onMouseLeave = () => handleResume();
      scrollContainer.addEventListener("mouseenter", onMouseEnter);
      scrollContainer.addEventListener("mouseleave", onMouseLeave);
      return () => {
        scrollContainer.removeEventListener("mouseenter", onMouseEnter);
        scrollContainer.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [isMobile, handlePause, handleResume]);

  // Optimized navigation buttons
  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector("div.flex-shrink-0") as HTMLElement;
      const scrollAmount = card ? card.offsetWidth + 16 : 400;
      const maxScroll = card.offsetWidth * achievementGallery.length;

      if (scrollRef.current.scrollLeft <= 0) {
        scrollRef.current.scrollLeft += maxScroll;
      }

      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      handlePause();
      handleResume();
    }
  }, [achievementGallery.length, handlePause, handleResume]);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector("div.flex-shrink-0") as HTMLElement;
      const scrollAmount = card ? card.offsetWidth + 16 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        if (
          scrollRef.current &&
          scrollRef.current.scrollLeft >= card.offsetWidth * achievementGallery.length
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }, 400);
      handlePause();
      handleResume();
    }
  }, [achievementGallery.length, handlePause, handleResume]);

  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case "Competition Organized":
        return "text-white bg-accent-primary/20 border-accent-primary/30";
      case "Recognition":
        return "text-white bg-accent-secondary/20 border-accent-secondary/30";
      case "Innovation":
        return "text-white bg-accent-tertiary/20 border-accent-tertiary/30";
      case "Leadership":
        return "text-white bg-accent-success/20 border-accent-success/30";
      default:
        return "text-white bg-neutral-500/20 border-neutral-500/30";
    }
  }, []);

  const timeline = useMemo(() => [
    {
      year: "2019",
      title: "Team Formation",
      description: "AppTeam was founded with a vision to excel in competitive programming and app development.",
      color: "border-accent-primary",
    },
    {
      year: "2020",
      title: "HackOnHills Announced",
      description: "Announced our first hackathon and successfully organized it, marking our entry in finding solutions to real-world problems.",
      color: "border-accent-secondary",
    },
    {
      year: "2025",
      title: "Triple Crown",
      description: "Achieved success in HOH 6.0, Nimbus, and Hillfair, cementing our position as elite developers.",
      color: "border-accent-tertiary",
    },
  ], []);

  return (
    <section id="achievements" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-primary-text mb-4 md:mb-6">
            Our <span className="text-accent-tertiary">Achievements</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-secondary-text max-w-3xl mx-auto leading-relaxed">
            Celebrating our journey of excellence, innovation, and competitive
            success in the world of app development and technology competitions.
          </p>
        </div>

        {/* Achievement Gallery */}
        <div className="relative mb-12 md:mb-16">
          <GlassCard className="p-4 md:p-8">
            {/* Gallery Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text">
                Achievement <span className="text-accent-primary">Gallery</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 md:p-3 bg-accent-primary/10 hover:bg-accent-primary/20 active:bg-accent-primary/30 border border-accent-primary/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-accent-primary group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 md:p-3 bg-accent-primary/10 hover:bg-accent-primary/20 active:bg-accent-primary/30 border border-accent-primary/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-accent-primary group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Scrolling Gallery */}
            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                willChange: "scroll-position"
              }}
            >
              {duplicatedGallery.map((achievement, idx) => (
                <div
                  key={achievement.id + "-" + idx}
                  className="flex-shrink-0 w-80 sm:w-96 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl border border-glass-border bg-secondary-dark/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-accent-primary/10">
                    {/* Achievement Image */}
                    <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-70"></div>

                      {/* Achievement Type Badge */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <div
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-inter border backdrop-blur-sm ${getTypeColor(
                            achievement.type
                          )}`}
                        >
                          <span className="hidden sm:inline">
                            {achievement.type}
                          </span>
                          <span className="sm:hidden">
                            {achievement.type.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <div className="bg-accent-primary/80 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 border border-glass-border">
                          <span className="text-white font-inter text-xs">
                            {achievement.year}
                          </span>
                        </div>
                      </div>

                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Achievement Details */}
                    <div className="p-4 md:p-6">
                      <h4 className="text-lg md:text-xl font-space font-semibold text-primary-text mb-2 md:mb-3 group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
                        {achievement.title}
                      </h4>

                      <p className="text-secondary-text font-inter text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                        {achievement.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-inter text-accent-secondary truncate">
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
              <div className="flex items-center space-x-2 text-secondary-text text-xs md:text-sm font-inter">
                <div
                  className={`w-2 h-2 bg-accent-primary rounded-full transition-all duration-300 ${
                    isAutoScrolling ? "animate-pulse scale-110" : "opacity-50"
                  }`}
                ></div>
                <span className="hidden sm:inline">
                  {isAutoScrolling
                    ? "Auto-scrolling gallery • Hover to pause"
                    : "Auto-scroll paused • Will resume shortly"}
                </span>
                <span className="sm:hidden">
                  {isAutoScrolling ? "Auto-scrolling" : "Paused"}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Memories Gallery Section - Optimized for mobile */}
        <div className="mb-12 md:mb-16">
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-6 text-center">
              Our <span className="text-accent-primary">Memories</span>
            </h3>

            {/* Memories Grid - Responsive and optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {galleryMemories.slice(0, isMobile ? 8 : galleryMemories.length).map((memory) => (
                <div
                  key={memory.id}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-glass-border bg-secondary-dark/30 hover:border-accent-primary/30 transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-white font-space font-semibold text-xs md:text-sm mb-1">
                        {memory.title}
                      </h4>
                      <p className="text-neutral-200 font-inter text-xs hidden md:block">
                        {memory.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isMobile && galleryMemories.length > 8 && (
              <div className="text-center mt-4">
                <button className="text-accent-primary font-inter text-sm hover:text-accent-primary/80 transition-colors duration-300">
                  View More ({galleryMemories.length - 8} more)
                </button>
              </div>
            )}

            {galleryMemories.length === 0 && (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-muted-text mx-auto mb-4" />
                <p className="text-secondary-text font-inter">
                  No memories found yet.
                </p>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Timeline */}
        <GlassCard className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-6 md:mb-8 text-center">
            Our <span className="text-accent-primary">Journey</span>
          </h3>
          <div className="space-y-6 md:space-y-8">
            {timeline.map((event, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 md:space-x-4"
              >
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${event.color} bg-primary-dark mt-2 flex-shrink-0`}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-base md:text-lg font-space font-semibold text-primary-text">
                      {event.title}
                    </span>
                    <span className="text-sm font-inter text-secondary-text bg-secondary-dark/50 px-2 py-1 rounded w-fit">
                      {event.year}
                    </span>
                  </div>
                  <p className="text-secondary-text font-inter leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default React.memo(Achievements);