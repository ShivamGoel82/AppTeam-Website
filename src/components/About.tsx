import React from 'react';
import { Code, Users, Trophy, Target } from 'lucide-react';
import GlassCard from './GlassCard';

const About: React.FC = () => {
  const values = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'We push boundaries with cutting-edge technologies and creative problem-solving approaches.',
      color: 'text-electric-blue'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborative Spirit',
      description: 'Our diverse team brings together unique perspectives to create exceptional solutions.',
      color: 'text-neon-magenta'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Excellence Driven',
      description: 'We strive for perfection in every project, from concept to deployment and beyond.',
      color: 'text-vibrant-green'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Impact Focused',
      description: 'Every app we build aims to solve real problems and make a meaningful difference.',
      color: 'text-electric-blue'
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-white mb-6">
            About <span className="text-electric-blue">CodeCraft</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            We are an elite college development team dedicated to creating innovative mobile and web applications. 
            Our passion for technology drives us to compete in prestigious events and build solutions that matter.
          </p>
        </div>

        {/* Mission Statement */}
        <GlassCard className="p-8 mb-16 text-center">
          <h3 className="text-2xl font-jetbrains font-semibold text-white mb-4">
            Our <span className="text-neon-magenta">Mission</span>
          </h3>
          <p className="text-lg font-inter text-gray-300 leading-relaxed max-w-4xl mx-auto">
            To bridge the gap between academic learning and industry excellence by developing 
            world-class applications, participating in competitive programming events, and fostering 
            a culture of continuous innovation within our college community.
          </p>
        </GlassCard>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <GlassCard key={index} className="p-6 text-center group">
              <div className={`${value.color} mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                {value.icon}
              </div>
              <h3 className="text-lg font-jetbrains font-semibold text-white mb-3 group-hover:text-electric-blue transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-300 font-inter text-sm leading-relaxed">
                {value.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Code Snippet Display */}
        <div className="mt-16">
          <GlassCard className="p-8">
            <h3 className="text-xl font-jetbrains font-semibold text-white mb-6 text-center">
              Our Development <span className="text-vibrant-green">Philosophy</span>
            </h3>
            <div className="bg-cyber-dark/50 rounded-lg p-6 border border-glass-border">
              <pre className="text-sm font-jetbrains text-gray-300 overflow-x-auto">
                <code>
{`class CodeCraftCollective {
  constructor() {
    this.mission = "Build exceptional apps";
    this.values = ["Innovation", "Excellence", "Collaboration"];
    this.events = ["HOH 6.0", "Nimbus", "Hillfair"];
  }

  async developApp(idea) {
    const solution = await this.innovate(idea);
    const app = await this.build(solution);
    return this.deploy(app);
  }

  compete() {
    return this.skills + this.teamwork + this.passion;
  }
}`}
                </code>
              </pre>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default About;