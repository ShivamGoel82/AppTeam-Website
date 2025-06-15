import React, { useEffect, useRef, useState } from "react";
import GlassCard from "./GlassCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Achievements: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const pauseTimeoutRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // Achievement Gallery Images
  const achievementGallery = [
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
  ];

  // Duplicate gallery for seamless looping
  const duplicatedGallery = [...achievementGallery, ...achievementGallery];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Smooth auto-scroll with loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isAutoScrolling) return;

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const card = scrollContainer.querySelector(
      "div.flex-shrink-0"
    ) as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 16 : 400;

    const scrollStep = isMobile ? 1 : 2;

    let lastTimestamp = 0;
    const frameDelay = isMobile ? 12 : 8;

    function autoScroll(timestamp: number) {
      if (!scrollContainer) return;

      if (timestamp - lastTimestamp > frameDelay) {
        scrollContainer.scrollLeft += scrollStep;

        if (
          scrollContainer.scrollLeft >=
          cardWidth * achievementGallery.length
        ) {
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

  // Pause/resume handlers
  const handlePause = () => {
    setIsAutoScrolling(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleResume = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(
      () => setIsAutoScrolling(true),
      1500
    );
  };

  // Attach event listeners for pause/resume
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (isMobile) {
      const onTouchStart = () => handlePause();
      const onTouchEnd = () => handleResume();
      scrollContainer.addEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      scrollContainer.addEventListener("touchend", onTouchEnd, {
        passive: true,
      });
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
  }, [isMobile]);

  // Navigation buttons
  const scrollLeft = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(
        "div.flex-shrink-0"
      ) as HTMLElement;
      const scrollAmount = card ? card.offsetWidth + 16 : 400;
      const maxScroll = card.offsetWidth * achievementGallery.length;

      if (scrollRef.current.scrollLeft <= 0) {
        scrollRef.current.scrollLeft += maxScroll;
      }

      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      handlePause();
      handleResume();
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(
        "div.flex-shrink-0"
      ) as HTMLElement;
      const scrollAmount = card ? card.offsetWidth + 16 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        if (
          scrollRef.current &&
          scrollRef.current.scrollLeft >=
            card.offsetWidth * achievementGallery.length
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }, 400);
      handlePause();
      handleResume();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Competition Organized":
        return "text-black bg-accent-blue/10 border-black";
      case "Recognition":
        return "text-black bg-accent-blue/10 border-black";
      case "Innovation":
        return "text-black bg-accent-blue/10 border-black";
      case "Leadership":
        return "text-accent-blue bg-black/70 border-accent-blue";
      default:
        return "text-black bg-accent-blue/10 border-black";
    }
  };

  const timeline = [
    {
      year: "2019",
      title: "Team Formation",
      description:
        "AppTeam was founded with a vision to excel in competitive programming and app development.",
      color: "border-accent-blue",
    },
    {
      year: "2020",
      title: "HackOnHills Announced",
      description:
        "Announced our first hackathon and successfully organized it, marking our entry in finding solutions to real-world problems.",
      color: "border-accent-purple",
    },
    {
      year: "2025",
      title: "Triple Crown",
      description:
        "Achieved success in HOH 6.0, Nimbus, and Hillfair, cementing our position as elite developers.",
      color: "border-accent-teal",
    },
  ];

  return (
    <section id="achievements" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-white mb-4 md:mb-6">
            Our <span className="text-accent-teal">Achievements</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-neutral-medium max-w-3xl mx-auto leading-relaxed">
            Celebrating our journey of excellence, innovation, and competitive
            success in the world of app development and technology competitions.
          </p>
        </div>

        {/* Achievement Gallery */}
        <div className="relative mb-12 md:mb-16">
          <GlassCard className="p-4 md:p-8">
            {/* Gallery Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <h3 className="text-xl md:text-2xl font-space font-semibold text-white">
                Achievement <span className="text-accent-blue">Gallery</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 md:p-3 bg-accent-blue/10 hover:bg-accent-blue/20 active:bg-accent-blue/30 border border-accent-blue/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-accent-blue group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 md:p-3 bg-accent-blue/10 hover:bg-accent-blue/20 active:bg-accent-blue/30 border border-accent-blue/30 rounded-lg transition-all duration-200 group touch-manipulation"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-accent-blue group-hover:scale-110 transition-transform duration-200" />
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
              }}
            >
              {duplicatedGallery.map((achievement, idx) => (
                <div
                  key={achievement.id + "-" + idx}
                  className="flex-shrink-0 w-80 sm:w-96 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl border border-glass-border bg-secondary-dark/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-accent-blue/10">
                    {/* Achievement Image */}
                    <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
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
                        <div className="bg-accent-blue/80 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 border border-glass-border">
                          <span className="text-black font-inter text-xs">
                            {achievement.year}
                          </span>
                        </div>
                      </div>

                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Achievement Details */}
                    <div className="p-4 md:p-6">
                      <h4 className="text-lg md:text-xl font-space font-semibold text-white mb-2 md:mb-3 group-hover:text-accent-blue transition-colors duration-300 line-clamp-1">
                        {achievement.title}
                      </h4>

                      <p className="text-neutral-medium font-inter text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                        {achievement.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-inter text-accent-purple truncate">
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
              <div className="flex items-center space-x-2 text-neutral-medium text-xs md:text-sm font-inter">
                <div
                  className={`w-2 h-2 bg-accent-blue rounded-full transition-all duration-300 ${
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

        {/* Timeline */}
        <GlassCard className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-space font-semibold text-white mb-6 md:mb-8 text-center">
            Our <span className="text-accent-blue">Journey</span>
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
                    <span className="text-base md:text-lg font-space font-semibold text-white">
                      {event.title}
                    </span>
                    <span className="text-sm font-inter text-neutral-medium bg-secondary-dark/50 px-2 py-1 rounded w-fit">
                      {event.year}
                    </span>
                  </div>
                  <p className="text-neutral-medium font-inter leading-relaxed text-sm md:text-base">
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

export default Achievements;