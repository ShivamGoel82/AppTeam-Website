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
      <div className="container mx-auto px-6 z-20 relative">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-jetbrains font-bold text-white mb-6 animate-fade-in relative z-30">
            AppTeam
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-neon-magenta to-vibrant-green">
              Nit Hamirpur
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl font-inter text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in relative z-30 px-4" style={{ animationDelay: '0.2s' }}>
            CodeCraft Collective - Where innovation meets execution. Building the future 
            one app at a time through cutting-edge development and competitive excellence.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12 animate-fade-in relative z-30" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-jetbrains font-bold text-neon-magenta">3</div>
              <div className="text-gray-400 font-inter text-sm sm:text-base">Major Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-jetbrains font-bold text-vibrant-green">40+</div>
              <div className="text-gray-400 font-inter text-sm sm:text-base">Active Members</div>
            </div>
          </div>

          {/* Event Badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 animate-fade-in relative z-30 px-4" style={{ animationDelay: '0.5s' }}>
            <div className="px-3 sm:px-4 py-2 bg-electric-blue/20 border border-electric-blue/30 rounded-full backdrop-blur-sm">
              <span className="text-electric-blue font-jetbrains text-xs sm:text-sm">HackOnHills</span>
            </div>
            <div className="px-3 sm:px-4 py-2 bg-neon-magenta/20 border border-neon-magenta/30 rounded-full backdrop-blur-sm">
              <span className="text-neon-magenta font-jetbrains text-xs sm:text-sm">Nimbus</span>
            </div>
            <div className="px-3 sm:px-4 py-2 bg-vibrant-green/20 border border-vibrant-green/30 rounded-full backdrop-blur-sm">
              <span className="text-vibrant-green font-jetbrains text-xs sm:text-sm">Hillfair</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in relative z-30 px-4" style={{ animationDelay: '0.6s' }}>
            <GlowButton 
              className="group text-sm sm:text-base"
              onClick={() => scrollToSection('projects')}
            >
              View Our Projects
              <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </GlowButton>
            <GlowButton 
              variant="secondary" 
              className="group text-sm sm:text-base"
              onClick={() => scrollToSection('achievements')}
            >
              <Trophy className="inline-block mr-2 w-4 h-4" />
              Our Achievements
            </GlowButton>
          </div>

          {/* Floating Elements - Hidden on mobile to prevent overflow */}
          <div className="hidden md:block absolute top-20 left-10 animate-float">
            <div className="w-16 h-16 border border-electric-blue/30 rounded-lg rotate-45 backdrop-blur-sm"></div>
          </div>
          <div className="hidden md:block absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <Users className="w-8 h-8 text-neon-magenta/50" />
          </div>
          <div className="hidden md:block absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-electric-blue/20 to-vibrant-green/20 rounded-full backdrop-blur-sm"></div>
          </div>
          <div className="hidden md:block absolute top-60 right-10 animate-pulse-glow">
            <Zap className="w-6 h-6 text-vibrant-green/60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;