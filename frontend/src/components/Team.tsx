import React from 'react';
import { Github, Linkedin, Twitter, Code, Palette, Brain } from 'lucide-react';
import GlassCard from './GlassCard';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Pratyush Pragyey',
      role: 'Team Lead & Full-Stack MERN Developer',
      image: 'pratyush pragyey.jpg',
      bio: 'Expertise in MERN stack and currently learning DevOps. Led our team to successfully organize HOH-6.0',
      skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
      icon: <Code className="w-5 h-5" />,
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Ishaan Yadav',
      role: 'UI/UX Designer & Frontend Developer',
      image: 'ishaan yadav.jpg',
      bio: 'Design enthusiast and frontend specialist. Creates stunning user experiences with modern design principles.',
      skills: ['Figma', 'React', 'Tailwind', 'Framer'],
      icon: <Palette className="w-5 h-5" />,
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Aryan Raghav',
      role: 'DSA Expert & AI/ML Enthusiast',
      image: 'image.png',
      bio: 'Solving complex problems with code. Exploring artificial intelligence and machine learning technologies.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
      icon: <Brain className="w-5 h-5" />,
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
  ];

  return (
    <section id="team" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-white mb-4 md:mb-6">
            Meet Our <span className="text-accent-blue">Team</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-neutral-medium max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind AppTeam. A diverse group of passionate 
            developers, designers, and innovators united by our love for creating exceptional software.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <GlassCard key={index} className="p-6 text-center group overflow-hidden">
              {/* Profile Image */}
              <div className="relative mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-accent-blue/30 group-hover:border-accent-blue transition-colors duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Member Info */}
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="text-accent-blue">
                  {member.icon}
                </div>
                <h3 className="text-xl font-space font-semibold text-white group-hover:text-accent-blue transition-colors duration-300">
                  {member.name}
                </h3>
              </div>
              
              <p className="text-accent-purple font-inter font-medium mb-4 text-sm">
                {member.role}
              </p>
              
              <p className="text-neutral-medium font-inter text-sm mb-6 leading-relaxed">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {member.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-accent-teal/10 text-accent-teal text-xs font-inter rounded-full border border-accent-teal/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a
                  href={member.social.github}
                  className="text-neutral-medium hover:text-accent-blue transition-colors duration-300 transform hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={member.social.linkedin}
                  className="text-neutral-medium hover:text-accent-blue transition-colors duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.social.twitter}
                  className="text-neutral-medium hover:text-accent-blue transition-colors duration-300 transform hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;