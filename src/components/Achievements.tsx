import React from 'react';
import { Trophy, Award, Star, Target, Calendar, Users } from 'lucide-react';
import GlassCard from './GlassCard';

const Achievements: React.FC = () => {
  const majorAchievements = [
    {
      title: 'HOH 6.0 Excellence',
      description: 'Outstanding performance in Hack of Hacks 6.0 with innovative solutions and technical excellence.',
      icon: <Trophy className="w-8 h-8" />,
      color: 'text-electric-blue',
      year: '2024',
      category: 'Competition'
    },
    {
      title: 'Nimbus Champions',
      description: 'First place winners at Nimbus tech fest with our AI-powered StudySync application.',
      icon: <Award className="w-8 h-8" />,
      color: 'text-neon-magenta',
      year: '2024',
      category: 'Victory'
    },
    {
      title: 'Hillfair Winners',
      description: 'Grand prize winners at Hillfair for our environmental impact tracking solution.',
      icon: <Star className="w-8 h-8" />,
      color: 'text-vibrant-green',
      year: '2024',
      category: 'Innovation'
    }
  ];

  const stats = [
    {
      number: '25+',
      label: 'Apps Developed',
      icon: <Target className="w-6 h-6" />,
      color: 'text-electric-blue'
    },
    {
      number: '3',
      label: 'Major Wins',
      icon: <Trophy className="w-6 h-6" />,
      color: 'text-neon-magenta'
    },
    {
      number: '50K+',
      label: 'Users Reached',
      icon: <Users className="w-6 h-6" />,
      color: 'text-vibrant-green'
    },
    {
      number: '2',
      label: 'Years Active',
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-electric-blue'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Team Formation',
      description: 'CodeCraft Collective was founded with a vision to excel in competitive programming and app development.',
      color: 'border-electric-blue'
    },
    {
      year: '2023',
      title: 'First Competition',
      description: 'Participated in our first hackathon and secured a top 10 position, marking our entry into competitive coding.',
      color: 'border-neon-magenta'
    },
    {
      year: '2024',
      title: 'Major Breakthrough',
      description: 'Won our first major competition at Nimbus, establishing our reputation as a formidable development team.',
      color: 'border-vibrant-green'
    },
    {
      year: '2024',
      title: 'Triple Crown',
      description: 'Achieved success in HOH 6.0, Nimbus, and Hillfair, cementing our position as elite developers.',
      color: 'border-electric-blue'
    }
  ];

  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-white mb-6">
            Our <span className="text-vibrant-green">Achievements</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            Celebrating our journey of excellence, innovation, and competitive success 
            in the world of app development and technology competitions.
          </p>
        </div>

        {/* Major Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {majorAchievements.map((achievement, index) => (
            <GlassCard key={index} className="p-8 text-center group">
              <div className={`${achievement.color} mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                {achievement.icon}
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-jetbrains px-2 py-1 rounded-full bg-gray-400/20 text-gray-400`}>
                  {achievement.category}
                </span>
                <span className="text-xs font-jetbrains text-gray-400">
                  {achievement.year}
                </span>
              </div>
              <h3 className="text-xl font-jetbrains font-semibold text-white mb-3 group-hover:text-electric-blue transition-colors duration-300">
                {achievement.title}
              </h3>
              <p className="text-gray-300 font-inter text-sm leading-relaxed">
                {achievement.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-6 text-center group">
              <div className={`${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-jetbrains font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 font-inter text-sm">
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Timeline */}
        <GlassCard className="p-8">
          <h3 className="text-2xl font-jetbrains font-semibold text-white mb-8 text-center">
            Our <span className="text-electric-blue">Journey</span>
          </h3>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-4 h-4 rounded-full border-2 ${event.color} bg-cyber-dark mt-2 flex-shrink-0`}></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg font-jetbrains font-semibold text-white">
                      {event.title}
                    </span>
                    <span className="text-sm font-jetbrains text-gray-400 bg-cyber-gray/50 px-2 py-1 rounded">
                      {event.year}
                    </span>
                  </div>
                  <p className="text-gray-300 font-inter leading-relaxed">
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