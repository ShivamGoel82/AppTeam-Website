import React from 'react';
import { Calendar, ExternalLink, Sparkles } from 'lucide-react';
import GlassCard from './GlassCard';

const NewsSection: React.FC = () => {
  return (
    <section className="py-8 relative">
      <div className="container mx-auto px-6">
        <GlassCard className="p-6 border-l-4 border-accent-blue bg-gradient-to-r from-accent-blue/5 to-transparent">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent-blue" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm font-inter font-medium">
                  Latest News
                </span>
                <div className="flex items-center text-neutral-medium text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Coming Soon 2025</span>
                </div>
              </div>
              <h3 className="text-xl font-space font-semibold text-white mb-2">
                HackOnHills 7.0 - Registration Opens Soon!
              </h3>
              <p className="text-neutral-medium font-inter leading-relaxed mb-4">
                Get ready for the biggest hackathon of the year! HackOnHills 7.0 is coming with exciting challenges, 
                amazing prizes, and opportunities to showcase your innovation. Stay tuned for registration details.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-accent-blue hover:text-accent-blue/80 transition-colors duration-300 font-inter font-medium"
              >
                Learn More
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default NewsSection;