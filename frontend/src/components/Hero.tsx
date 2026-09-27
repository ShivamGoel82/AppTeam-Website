import React, { useCallback } from 'react';
import { ArrowRight, Trophy, Users, Zap } from 'lucide-react';
import GlowButton from './GlowButton';

const Hero: React.FC = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 z-20 relative">
        
        <div className="text-center">
          {/* Main Heading */}
      <div style={{height:'40px'}}></div>
          
          <h1 className="break-words leading-tight pt-6 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space font-bold text-white mb-3 sm:mb-4 md:mb-6 relative z-30">
            AppTeam{' '}
            <span className="text-accent-primary">
              NIT Hamirpur
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-inter text-secondary-text mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto relative z-30 px-2 leading-relaxed">
            The premier technology innovation team of NIT Hamirpur. Building the future 
            through cutting-edge development, competitive excellence, and innovative solutions.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-6 sm:mb-8 md:mb-12 relative z-30 px-2">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-space font-bold text-accent-primary">6+</div>
              <div className="text-muted-text font-inter text-xs sm:text-sm">Years Active</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-space font-bold text-accent-primary">3</div>
              <div className="text-muted-text font-inter text-xs sm:text-sm">Major Events</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-space font-bold text-accent-primary">40+</div>
              <div className="text-muted-text font-inter text-xs sm:text-sm">Active Members</div>
            </div>
          </div>

          {/* Event Badges */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 sm:mb-8 md:mb-12 relative z-30 px-2">
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-primary font-inter font-medium">HackOnHills</span>
            </div>
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-primary font-inter font-medium">Nimbus</span>
            </div>
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-primary font-inter font-medium">Hillfair</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 md:gap-4 justify-center items-center relative z-30 px-2">
            <GlowButton 
              className="group text-xs sm:text-sm md:text-base w-full xs:w-auto px-4 py-3 md:px-6 md:py-3.5 min-h-[48px] flex items-center justify-center"
              onClick={() => scrollToSection('projects')}
            >
              View Our Projects
              <ArrowRight className="inline-block ml-2 w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
            </GlowButton>
            <GlowButton 
              variant="secondary" 
              className="group text-xs sm:text-sm md:text-base w-full xs:w-auto px-4 py-3 md:px-6 md:py-3.5 min-h-[48px] flex items-center justify-center"
              onClick={() => scrollToSection('achievements')}
            >
              <Trophy className="inline-block mr-2 w-3 h-3 md:w-4 md:h-4" />
              Our Achievements
            </GlowButton>
          </div>

          {/* Floating Background Accent Elements - Clean, subtle, non-glaring with pointer-events-none */}
          <div className="absolute top-12 left-4 sm:top-20 sm:left-10 animate-float pointer-events-none z-10 opacity-40">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-white/15 rounded-xl rotate-45 backdrop-blur-xs"></div>
          </div>
          <div className="absolute top-28 right-6 sm:top-40 sm:right-16 md:right-20 animate-float pointer-events-none z-10 opacity-30" style={{ animationDelay: '2s' }}>
            <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/40" />
          </div>
          <div className="absolute bottom-20 left-6 sm:bottom-36 sm:left-14 md:left-20 animate-float pointer-events-none z-10 opacity-30" style={{ animationDelay: '4s' }}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border border-white/15 rounded-full backdrop-blur-xs"></div>
          </div>
          <div className="absolute top-48 right-3 sm:top-60 sm:right-8 md:right-12 animate-pulse-glow pointer-events-none z-10 opacity-40">
            <div className="p-1.5 sm:p-2 rounded-xl bg-white/[0.03] border border-white/15 backdrop-blur-xs">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);