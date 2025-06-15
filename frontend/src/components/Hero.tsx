import React from 'react';
import { ArrowRight, Trophy, Users, Zap } from 'lucide-react';
import GlowButton from './GlowButton';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 z-20 relative">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="break-words leading-tight pt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-space font-bold text-white mb-4 sm:mb-6 animate-fade-in relative z-30">
            AppTeam
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-teal">
              NIT Hamirpur
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl font-inter text-neutral-medium mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in relative z-30 px-2 leading-relaxed">
            The premier technology innovation team of NIT Hamirpur. Building the future 
            through cutting-edge development, competitive excellence, and innovative solutions.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 animate-fade-in relative z-30 px-2">
          
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-accent-purple">3</div>
              <div className="text-neutral-medium font-inter text-xs sm:text-sm">Major Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-accent-teal">40+</div>
              <div className="text-neutral-medium font-inter text-xs sm:text-sm">Active Members</div>
            </div>
          </div>

          {/* Event Badges */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 sm:mb-12 animate-fade-in relative z-30 px-2">
            <div className="px-4 py-2 bg-accent-blue/10 border border-accent-blue/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-blue font-inter font-medium">HackOnHills</span>
            </div>
            <div className="px-4 py-2 bg-accent-purple/10 border border-accent-purple/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-purple font-inter font-medium">Nimbus</span>
            </div>
            <div className="px-4 py-2 bg-accent-teal/10 border border-accent-teal/30 rounded-full backdrop-blur-sm">
              <span className="text-xs sm:text-sm text-accent-teal font-inter font-medium">Hillfair</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-4 justify-center items-center animate-fade-in relative z-30 px-2">
            <GlowButton 
              className="group text-sm sm:text-base w-20vw xs:w-auto"
              onClick={() => scrollToSection('projects')}
            >
              View Our Projects
              <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </GlowButton>
            <GlowButton 
              variant="secondary" 
              className="group text-sm sm:text-base w-20vw xs:w-auto"
              onClick={() => scrollToSection('achievements')}
            >
              <Trophy className="inline-block mr-2 w-4 h-4" />
              Our Achievements
            </GlowButton>
          </div>

          {/* Floating Elements - Hidden on mobile */}
          <div className="hidden lg:block absolute top-20 left-10 animate-float">
            <div className="w-16 h-16 border border-accent-blue/20 rounded-lg rotate-45 backdrop-blur-sm"></div>
          </div>
          <div className="hidden lg:block absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <Users className="w-8 h-8 text-accent-purple/40" />
          </div>
          <div className="hidden lg:block absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-accent-blue/10 to-accent-teal/10 rounded-full backdrop-blur-sm"></div>
          </div>
          <div className="hidden lg:block absolute top-60 right-10 animate-pulse-glow">
            <Zap className="w-6 h-6 text-accent-teal/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;